import React from "react";
import { Typography } from "@material-ui/core";
import "./CustomAlert.css";
function CustomAlert({ image, price }) {
  return (
    <div className="customAlert">
      <img className="customAlert__image" src={image} alt="" />
      <Typography variant="h6">$ {price}</Typography>
    </div>
  );
}

export default CustomAlert;
