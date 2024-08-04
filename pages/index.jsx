import Carousel from "../components/carousel";
import Script from "next/script";
import Layout from "../components/layout";
import Nav from "../components/nav";
import { useWebSocket } from "../lib/websocket";
import { useEffect, useState, useCallback } from "react";

export default function Home() {
  //websocket
  const socket = useWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
  const [messages, setMessages] = useState([]);
  const clearMessage = useCallback((id) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => console.log("WebSocket connected");
      socket.onmessage = (event) => {
        const newMsg = JSON.parse(event.data);
        const id = Date.now();
        setMessages((pre) => [
          ...pre,
          {
            ...newMsg,
            id,
            position: {
              top: `${Math.random() * 80}%`,
            },
          },
        ]);
        setTimeout(() => clearMessage(id), 20000);
      };
      socket.onerror = (error) => console.error("WebSocket error:", error);
    }
  }, [socket, clearMessage]);
  // console.log(messages);

  return (
    <>
      <style>
        {`
     @keyframes slider{
      from {
        transform: translateX(50vw);
        }
      to {
        transform: translateX(-50vw);
        }
      }
      
      .msgs{
      animation: slider 5s linear infinite;
      white-space: nowrap;
      }
      `}
      </style>

      <Script
        src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
        crossorigin></Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
        crossorigin></Script>
      <Layout>
        <Nav />
        <section className="position-relative W-100 vh-50">
          <Carousel />
          {messages.map((msg, index) => (
            <p
              key={index}
              style={{
                top: msg.position.top,
                position: "absolute",
                fontSize: "48px",
              }}
              className="msgs">
              {msg.displayName}: {msg.message}
            </p>
          ))}
        </section>
      </Layout>
    </>
  );
}
