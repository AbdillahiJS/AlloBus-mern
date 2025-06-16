
import { useEffect, useState } from 'react';
import { onlineManager } from '@tanstack/react-query';

export function useOnlineStatus() {
    const [online, setOnline] = useState(onlineManager.isOnline());
  
    useEffect(() => {
      const unsubscribe = onlineManager.subscribe(setOnline);
      return unsubscribe;
    }, []);
  
    return online;
  }