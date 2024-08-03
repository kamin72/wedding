import Carousel from "../components/carousel";
import Script from "next/script";
import Layout from "../components/layout";
import Nav from "../components/nav";
import { useWebSocket } from "../lib/websocket";
import { useEffect, useState } from "react";

export default function Home() {
  const socket = useWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => console.log("WebSocket connected");
      socket.onmessage = (event) => {
        setMessages((prev) => [...prev, event.data]);
      };
      socket.onerror = (error) => console.error("WebSocket error:", error);
    }
  }, [socket]);

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  };

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
        crossorigin></Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
        crossorigin></Script>
      <Layout>
        <Nav></Nav>
        <Carousel>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </Carousel>
      </Layout>
    </>
  );
}
