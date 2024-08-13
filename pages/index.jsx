import Carousel from "../components/carousel";
import Script from "next/script";
import Layout from "../components/layout";
import { useWebSocket } from "../lib/websocket";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import VivusAnimation from "../components/svg";
import Vivus from "vivus";
import Image from "next/image";

export default function Home() {
  const repoName = "wedding";
  const basePath = process.env.NODE_ENV === "production" ? `/${repoName}` : "";

  const svgString = `<svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      fill="#fc037f"
      version="1.1"
      id="Capa_1"
      width="300px"
      height="100px"
      viewBox="0 0 49.618 49.619"
      xml:space="preserve">
      <g>
        <g>
          <path stroke="#fc037f" fill="transparent" stroke-width="1" d="M42.938,8.943c-1.656-0.635-3.6-0.971-5.619-0.971c-3.74,0-7.409,1.087-10.037,2.884c-0.455,0.312-0.937,0.17-1.132-0.347    c-1.44-3.816-4.905-9.463-12.783-9.463C8.734,1.066,4.869,3.118,2.483,6.825c-3.205,4.994-3.315,12.262-0.288,18.967    c4.906,10.862,12.86,21.922,12.93,22.017c0,0,0.149,0.207,0.333,0.463c0.183,0.256,0.569,0.371,0.862,0.256l0.53-0.211    c3.099-1.225,30.338-12.399,32.582-27.226C50.68,12.852,45.307,9.852,42.938,8.943z M46.538,20.658    c-0.141,0.943-0.417,1.887-0.842,2.882c-4.364,10.141-22.089,18.64-27.943,21.217c-0.505,0.224-1.173,0.029-1.484-0.427    c-2.417-3.541-7.803-11.758-11.406-19.741c-2.257-5.004-2.559-10.423-0.808-14.493c0.255-0.59,0.556-1.16,0.894-1.691    c1.684-2.617,4.242-4.122,7.439-4.39c0.55-0.046,1.509-0.048,2.059-0.002c8.386,0.696,9.744,10.102,9.799,10.514l0.376,2.892    c0.071,0.547,0.376,0.618,0.682,0.158l1.614-2.431c1.657-2.515,5.888-4.27,10.286-4.27c1.703,0,3.323,0.276,4.688,0.801    C45.605,13.102,47.212,16.206,46.538,20.658z" />
        </g>
      </g>
    </svg>
    
    `;

  const vivusOptions = {
    duration: 500,
    type: "sync",
    animTimingFunction: Vivus.EASE,
  };

  //websocket
  const socket = useWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => console.log("WebSocket connected");
      socket.onmessage = (event) => {
        const newMsg = JSON.parse(event.data);
        setMessages((prev) => {
          let updateMsg = [
            ...prev,
            {
              ...newMsg,
              position: {
                top: `${Math.random() * 60}%`,
              },
            },
          ];

          if (
            Date.now() -
              new Date(updateMsg[updateMsg.length - 1].timeStamp).getTime() >
            600000
          ) {
            return [...updateMsg].sort(
              (a, b) => new Date(a.timeStamp) - new Date(b.timeStamp)
            );
          } else {
            return [...updateMsg]
              .sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp))
              .slice(-20);
          }
        });
      };
      socket.onerror = (error) => console.error("WebSocket error:", error);
      return () => socket.close();
    }
  }, [socket]);
  console.log(messages);

  const [visibleMessages, setVisibleMessages] = useState([]);

  const addMessageGradually = useCallback(() => {
    setVisibleMessages((prev) => {
      if (prev.length < messages.length) {
        return [...prev, messages[prev.length]];
      } else {
        return messages;
      }
    });
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(addMessageGradually, 3000);
    return () => clearInterval(interval);
  }, [addMessageGradually]);

  console.log(visibleMessages);

  return (
    <>
      <style>
        {`
    .w-50{
    width: 70% !important;
    }

    @keyframes slider{
      from {
        transform: translateX(100vw);
        }
      to {
        transform: translateX(-100vw);
        }
      }
      
      .msgs:nth-child(2n){
      animation: slider 10s linear infinite;
      color: white;
      background-color: #808080;
      width: 300px;
      border-radius: 20px;
      padding: 5px 0;
      text-align: center;
      }

      .msgs:nth-child(2n-1){
      animation: slider 10s linear infinite;
      color: black;
      background-color: white;
      width: 300px;
      border-radius: 20px;
      padding: 5px 0;
      text-align: center;
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
        <section
          className="position-relative W-100 h-100"
          style={{ paddingTop: "100px" }}>
          <VivusAnimation
            id="mySvg"
            svg={svgString}
            options={vivusOptions}
            interval={5000}
          />
          <div className="position-relative h-100">
            <div
              className="m-auto rounded-pill rounded-bottom-0 overflow-hidden position-relative z-1"
              style={{
                width: "50%",
                height: "90%",
                border: "double 20px #7E4847",
              }}>
              <Carousel />
            </div>
            <Image
              src={`${basePath}/images/flower-01.png`}
              alt=""
              width={300}
              height={400}
              priority
              className="position-absolute z-3"
              style={{ top: "-4%", left: "22%" }}
            />{" "}
            <Image
              src={`${basePath}/images/flower-02.png`}
              alt=""
              width={300}
              height={300}
              priority
              className="position-absolute z-3"
              style={{ top: "-4%", right: "22%" }}
            />{" "}
            <Image
              src={`${basePath}/images/flower-03.png`}
              alt=""
              width={300}
              height={300}
              priority
              className="position-absolute z-3"
              style={{ bottom: "5%", left: "18%" }}
            />
            <Image
              src={`${basePath}/images/flower-04.png`}
              alt=""
              width={250}
              height={400}
              priority
              className="position-absolute z-3"
              style={{ bottom: "8%", right: "20%" }}
            />
          </div>
          {visibleMessages.map((msg, index) => {
            return (
              <p
                key={index}
                style={{
                  top: msg.position.top,
                  right: msg.position.right,
                  position: "absolute",
                  fontSize: "36px",
                  fontFamily: '"Edu AU VIC WA NT Hand", cursive',
                }}
                className="msgs z-0">
                {msg.displayName}: {msg.message}
              </p>
            );
          })}
        </section>
      </Layout>
    </>
  );
}
