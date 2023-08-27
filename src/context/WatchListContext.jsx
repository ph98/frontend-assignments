import { createContext, useContext, useEffect, useRef, useState } from 'react';
import useWebSocket from '../hooks/useWebsocket';

const WatchListContext = createContext();

export function useWatchList() {
  return useContext(WatchListContext);
}

export function WatchListProvider({ children }) {
  const [watchList, setWatchList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState({});
  const latestDataRef = useRef({});

  const watchListWithData = watchList.map(isin => data[isin] || {isin});
  const {socket} = useWebSocket('ws://localhost:8425/')

  useEffect(() => {
    if(socket){
      watchList.map(isin=>socket.send(JSON.stringify({"subscribe": isin})))
    }
  }, [socket])
  
  useEffect(() =>{ 
    console.log('first', watchList)

  }, [watchList])

  useEffect(()=>{
    if(socket){
      socket.addEventListener('message',e=>{
        const formattedData = (JSON.parse(e.data))
        const formattedDataWithDate = {
          ...formattedData,
          date: new Date()
        }

        latestDataRef.current = ({
            ...latestDataRef.current,
            [formattedDataWithDate.isin]: formattedDataWithDate
          })
      })
    }
  }, [socket])


  useEffect(() => {
    const updateInterval = setInterval(() => {
      setData(latestDataRef.current);
    }, 100); 
    
    return () => {
      clearInterval(updateInterval);
    };
  }, []);


  const addToWatchList = (isin) => {
    setErrorMessage(null);

    const isinRegex = /^[A-Z]{2}[A-Z0-9]{9}[0-9]$/;
    if (!isinRegex.test(isin)) {
      setErrorMessage('Invalid ISIN format.');
      throw new Error('Invalid ISIN format.');
    }

    
    if (!watchList.includes(isin)) {
      setWatchList((prevList) => [...prevList, isin]);
      socket.send(JSON.stringify({"subscribe": isin}))
    } else{
      setErrorMessage('ISIN already in watch list.');
      throw new Error('ISIN already in watch list.');
    }
  };

  const removeFromWatchList = (isin) => {
    setWatchList(watchList.filter(item=>item!== isin))
    socket.send(JSON.stringify({
      unsubscribe: isin
    }))
  }


  const contextValue = {
    watchList: watchListWithData,
    addToWatchList,
    errorMessage,
    removeFromWatchList
  };

  return (
    <WatchListContext.Provider value={contextValue}>
      {children}
    </WatchListContext.Provider>
  );
}