import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const VivusNoSSR = dynamic(() => import("vivus"), { ssr: false });

const VivusAnimation = ({ id, svg, options, interval = 5000 }) => {
  const svgRef = useRef(null);
  const vivusRef = useRef(null);
  const timeoutRef = useRef(null);

  const playAnimation = () => {
    if (vivusRef.current) {
      vivusRef.current.reset().play();
      timeoutRef.current = setTimeout(playAnimation, interval);
    }
  };

  useEffect(() => {
    const initVivus = async () => {
      if (svgRef.current && !vivusRef.current) {
        const Vivus = (await import("vivus")).default;
        vivusRef.current = new Vivus(svgRef.current.querySelector("svg"), {
          ...options,
          start: "manual",
        });
        playAnimation();
      }
    };

    initVivus();

    return () => {
      if (vivusRef.current) {
        vivusRef.current.destroy();
        vivusRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [options, interval]);

  return (
    <>
      <div
        id={id}
        ref={svgRef}
        dangerouslySetInnerHTML={{ __html: svg }}
        className="w-25 m-auto"
      />
    </>
  );
};

export default VivusAnimation;
