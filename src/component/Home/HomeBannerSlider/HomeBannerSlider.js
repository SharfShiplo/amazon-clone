import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";

export default function CarouselComponent() {
  const [sliderIamges, setSliderImages] = useState([]);

  useEffect(() => {
    const fetchbannerImages = db
      .collection("homebanners")
      .onSnapshot((snapshot) => {
        setSliderImages(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
    return () => {
      fetchbannerImages();
    };
  }, []);
  return (
    <div className="carousel-wrapper">
      <Carousel
        infiniteLoop
        useKeyboardArrows
        autoPlay
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
      >
        {sliderIamges.map((sliderImage) => (
          <Link key={sliderImage.id} to={sliderImage.data.to}>
            <div>
              <img
                className="home__image"
                src={sliderImage.data.src}
                alt={sliderImage.data.title}
              />
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
}
