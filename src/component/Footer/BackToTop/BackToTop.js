import React from "react";
import { Typography } from "@material-ui/core";
import "./BackToTop.css";
function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="backToTop" onClick={scrollToTop}>
      <div className="backToTop__container">
        <Typography variant="button">Back To Top</Typography>
      </div>
    </div>
  );
}

export default BackToTop;
