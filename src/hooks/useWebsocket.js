import { useEffect, useState } from 'react';

function useWebSocket(url) {
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const newSocket = new WebSocket(url);
    
    newSocket.addEventListener('open', () => {
      console.log('Connected to WebSocket');
      setSocket(newSocket);
    });

    newSocket.addEventListener('close', () => {
      console.log('WebSocket connection closed');
    });

    newSocket.addEventListener('error', (e) => {
        setError(e)
    })

    return () => {
      newSocket.close();
    };
  }, [url]);

  return {socket, error };
}

export default useWebSocket;
