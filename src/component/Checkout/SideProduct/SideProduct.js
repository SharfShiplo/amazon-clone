import React, { useState } from "react";
import "./SideProduct.css";
import StarIcon from "@material-ui/icons/Star";
import { useDispatch } from "react-redux";
import { addItem } from "../../../features/basket/basket";
import { Snackbar } from "@material-ui/core";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
function SideProduct({ id, title, price, rating, image }) {
  const dispatch = useDispatch();
  const [snacker, setSnacker] = useState(false);
  const addTocart = () => {
    let newCount = 1;
    dispatch(
      addItem({
        id: id,
        title: title,
        count: newCount,
        price: price,
        rating: rating,
        image: image,
        totalPrice: price,
      })
    );
    setSnacker(true);
  };
  const closeSnackbar = () => {
    setSnacker(false);
  };
  let customSnackbar = (
    <Snackbar
      open={snacker}
      autoHideDuration={2000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <CustomAlert image={image} price={price} />
    </Snackbar>
  );
  return (
    <div className="sideProduct">
      <div className="sideProduct__image">
        <img src={image} alt="" />
      </div>
      <div className="sideProduct__info">
        <h6>{title}</h6>
        <div className="sideProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <div key={i}>
                <StarIcon style={{ fontSize: "large", color: "#FFA41C" }} />
              </div>
            ))}
        </div>
        <p className="sideProudct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <button onClick={addTocart}>Add to Cart</button>
      </div>
      {snacker && customSnackbar}
    </div>
  );
}

export default SideProduct;
