import { useEffect, useState } from "react";

export function useWebSocket(url) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // 確保只在客戶端執行
    if (typeof window !== "undefined") {
      const newSocket = new WebSocket(url);
      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [url]);

  return socket;
}
