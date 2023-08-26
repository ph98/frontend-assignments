import { createContext, useContext, useState } from 'react';

const WatchListContext = createContext();

export function useWatchList() {
  return useContext(WatchListContext);
}
export function WatchListProvider({ children }) {
  const [watchList, setWatchList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const addToWatchList = (isin) => {
    setErrorMessage(null);

    const isinRegex = /^[A-Z]{2}[A-Z0-9]{9}[0-9]$/;
    if (!isinRegex.test(isin)) {
      setErrorMessage('Invalid ISIN format.');
      return;
    }

    
    if (!watchList.includes(isin)) {
      setWatchList((prevList) => [...prevList, isin]);
    } else{
      setErrorMessage('ISIN already in watch list.');
    }
  };

  const contextValue = {
    watchList,
    addToWatchList,
    errorMessage
  };

  return (
    <WatchListContext.Provider value={contextValue}>
      {children}
    </WatchListContext.Provider>
  );
}