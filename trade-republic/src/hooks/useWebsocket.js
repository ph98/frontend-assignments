import { useEffect, useState } from 'react';
import { useToastContext } from '../context/ToastContext';

function useWebSocket(url) {
  const [socket, setSocket] = useState(null);
  const { addToast } = useToastContext();

  useEffect(() => {
    const newSocket = new WebSocket(url);

    newSocket.addEventListener('open', () => {
      console.log('Connected to WebSocket');
      setSocket(newSocket);
      newSocket.addEventListener('close', (event) => {
        if (!event.wasClean) {
          console.log('WebSocket connection closed due to error');
          addToast('Connection closed! try again!');
        } else {
          console.log('WebSocket connection closed');
        }
      });

    newSocket.addEventListener('error', (e) => {
      addToast( 'Websocket error: ' + e);
    });
    });
    return () => {
      newSocket.close();
    };
  }, [url]);

  return { socket };
}

export default useWebSocket;
