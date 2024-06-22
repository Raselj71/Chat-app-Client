'use client'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';


const useSocket = (userId) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io('http://localhost:5000'); 

    socketIo.on('connect', () => {
      console.log('connected');
      socketIo.emit('join', { userId });
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [userId]);

  return socket;
};

export default useSocket;
