import { createContext, useContext, useEffect, useRef, useState } from 'react';
import useWebSocket from '../hooks/useWebsocket';
import {  useToastContext } from './ToastContext';

const WatchListContext = createContext();

export function useWatchList() {
  return useContext(WatchListContext);
}

const initialWatchList = JSON.parse(localStorage.getItem('watchList')) || [];

export function WatchListProvider({ children }) {
  const [watchList, setWatchList] = useState(initialWatchList);
  const [data, setData] = useState({});
  const latestDataRef = useRef({});

  const watchListWithData = watchList.map(isin => data[isin] || {isin});
  const {socket} = useWebSocket('ws://localhost:8425/')

  const {addToast} = useToastContext();
  useEffect(() => {
    if(socket){
      watchList.map(isin=>socket.send(JSON.stringify({"subscribe": isin})))
    }
  }, [socket])
  
  useEffect(() =>{ 
    localStorage.setItem('watchList', JSON.stringify(watchList))
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
    const isinRegex = /^[A-Z]{2}[A-Z0-9]{9}[0-9]$/;
    if (!isinRegex.test(isin)) {
      addToast('Invalid ISIN format.');
      throw new Error('Invalid ISIN format.');
    }

    
    if (!watchList.includes(isin)) {
      setWatchList((prevList) => [...prevList, isin]);
      socket.send(JSON.stringify({"subscribe": isin}))
    } else{
      addToast('ISIN already in watch list.');
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
    removeFromWatchList
  };

  return (
    <WatchListContext.Provider value={contextValue}>
      {children}
    </WatchListContext.Provider>
  );
}