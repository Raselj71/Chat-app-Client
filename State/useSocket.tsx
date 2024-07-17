'use client'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';


const useSocket = (userId:any) => {
  const [socket, setSocket] = useState<any>(null);

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
