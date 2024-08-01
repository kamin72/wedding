import Test from "../components/btn";
import Carousel from "../components/carousel";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
        crossorigin></Script>
      <Script
        src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
        crossorigin></Script>

      <Carousel></Carousel>
    </>
  );
}
