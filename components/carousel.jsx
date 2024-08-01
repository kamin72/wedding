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
      <style>
        {`
  .w-40{
  width: 40%;
  }

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform:  translateY(0%);
  }
  100% {
    opacity: 0;
    transform: translateY(-20%) translateX(-20%);
  }
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(20%) translateY(-20%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.carousel-fade-slide .carousel-item {
  opacity: 0;
  transition: opacity 6s ease-out, transform 6s ease-out;
}

.carousel-fade-slide .carousel-item.active {
  opacity: 1;
  position: relative;
  transform: translateX(0);
  animation: fadeOut 2s ease-out both;
}

.carousel-fade-slide .carousel-item-next {
  animation: fadeInRight 6s ease-out both;
}

 /* 隐藏轮播控制按钮 */
.carousel-control-prev,
.carousel-indicators,
.carousel-control-next {
  display: none;
  }


        `}
      </style>

      <div className="container pt-5 pb-5 text-center w-40">
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          interval={3000}
          className="carousel-fade-slide">
          {data.map((image) => (
            <Carousel.Item key={image.id} className="w-100">
              <Image
                src={image.url}
                alt={image.id}
                width={800}
                height={900}
                className="w-100 h-25 object-fit-contain"
                priority
              />
              <Carousel.Caption>
                {/* <h3>test</h3>
                <p>This is a description for the current slide.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default SingleImageCarousel;
