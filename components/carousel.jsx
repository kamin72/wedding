import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import data from "../photos.json";
import VivusAnimation from "../components/svg";
import Vivus from "vivus";

function SingleImageCarousel() {
  const svgString = `<svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      fill="#fc037f"
      version="1.1"
      id="Capa_1"
      width="300px"
      height="200px"
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

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <style>
        {`
 

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform:  translateX(0) translateY(0);
  }
  100% {
    opacity: 0;
    transform:  translateX(-20%) translateY(-20%);
  }
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(20%) translateY(-20%);
  }
  100% {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}

.carousel-fade-slide .carousel-item {
  opacity: 0;
  transition: opacity 6s ease-out, transform 6s ease-out;

}

.carousel-fade-slide .carousel-item.active {
  opacity: 1;
  position: relative;
  transform: translateX(0) translateY(0);
  animation: fadeOut 2s ease-out both;
}

.carousel-fade-slide .carousel-item-next {
  animation: fadeInRight 6s ease-out both;
}

.carousel-inner{
 transform: translateX(0) translateY(0);
}



 /* 隐藏轮播控制按钮 */
.carousel-control-prev,
.carousel-indicators,
.carousel-control-next {
  display: none;
  }



        `}
      </style>

      <div className="pb-5 m-auto w-100 ">
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
                className="w-100 h-50 object-fit-contain "
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
