import React, { useState, useEffect } from "react";
import "./ProductSlider.css";
import { Typography } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db } from "../../firebase";
import { useHistory } from "react-router-dom";
function ProductSlider() {
  const [sliderProduct, setSliderProduct] = useState([]);
  const history = useHistory();
  useEffect(() => {
    let fetchSliderProdust = async () =>
      db
        .collection("products")
        .onSnapshot((snapshot) =>
          setSliderProduct(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
    fetchSliderProdust();
    return () => {
      fetchSliderProdust();
      setSliderProduct([]);
    };
  }, []);
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
          dost: true,
        },
      },
    ],
    nextArrow: (
      <button>
        <SkipNextIcon style={{ fontSize: "20px" }} />
      </button>
    ),
    prevArrow: (
      <button>
        <SkipPreviousIcon style={{ fontSize: "20px" }} />
      </button>
    ),
  };
  const viewProduct = (id) => {
    history.push(`/products/${id}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="productSlider">
      <div className="prductStider__container">
        <div className="productSlider__title">
          <Typography variant="h6">4 stars and above</Typography>
        </div>
        <Slider {...settings}>
          {sliderProduct.map((item) => (
            <div
              key={item.id}
              className="produvtSlider__item"
              onClick={() => viewProduct(item.id)}
            >
              <img src={item.data.image} alt="" />
              <Typography variant="h5">{item.data.title}</Typography>
              <div className="productSlider__rating">
                {Array(item.data.rating)
                  .fill()
                  .map((_, i) => (
                    <div key={i}>
                      <StarIcon
                        style={{ fontSize: "large", color: "#FFA41C" }}
                      />
                    </div>
                  ))}
              </div>
              <Typography variant="h6">{item.data.price}</Typography>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ProductSlider;
