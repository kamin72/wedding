import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import data from "../photos.json";

function SingleImageCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <style type="text/css">
        {`
  .w-40{
    width: 40% !important;
    }
    `}
      </style>

      <div className="container pt-5 pb-5 text-center w-40">
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          interval={5000}
          className="">
          {data.map((image) => (
            <Carousel.Item key={image.id} className="w-100 h-100">
              <Image
                src={image.url}
                alt={image.id}
                width={800}
                height={900}
                layout="cover"
                className="w-100"
                priority
              />
              <Carousel.Caption>
                <h3>test</h3>
                <p>This is a description for the current slide.</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default SingleImageCarousel;
