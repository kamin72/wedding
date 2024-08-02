import Test from "../components/btn";
import Carousel from "../components/carousel";
import Script from "next/script";
import Layout from "../components/layout";
import Nav from "../components/nav";

export default function Home() {
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
        <Carousel></Carousel>
      </Layout>
    </>
  );
}
