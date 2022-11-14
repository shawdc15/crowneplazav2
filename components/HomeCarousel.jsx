import React from 'react'
import Image from 'next/image'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

const HomeCarousel = () => {
  return (
    <Carousel
      className="-z-0 overflow-hidden "
      interval={3000}
      showArrows={true}
      autoPlay={true}
      showThumbs={false}
      dynamicHeight={true}
    >
      <div className="">
        <img
          className="h-80 object-cover md:h-carouselImage"
          src="/hotel4.png"
          alt="image1"
        />
      </div>
      <div>
        <img
          className="h-80 object-cover md:h-carouselImage"
          src="/hotel1.jpg"
          alt="image2"
        />
      </div>
      <div>
        <img
          className="h-80 object-cover md:h-carouselImage"
          src="/hotel2.jpg"
          alt="image3"
        />
      </div>
      <div>
        <img
          className="h-80 object-cover md:h-carouselImage"
          src="/hotel3.png"
          alt="image4"
        />
      </div>
    </Carousel>
  )
}

export default HomeCarousel
