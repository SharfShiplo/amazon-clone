import React, { useState } from "react";
import "./CheckoutProduct.css";
import StarIcon from "@material-ui/icons/Star";
import { useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  deleteItem,
} from "../../../features/basket/basket";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
import { Snackbar } from "@material-ui/core";
function CheckoutProduct({
  id,
  title,
  image,
  price,
  count,
  rating,
  totalPrice,
}) {
  const [snacker, setSnacker] = useState(false);
  const dispatch = useDispatch();
  const removeItemUnit = () => {
    dispatch(removeItem({ id: id }));
  };
  const risecount = () => {
    let newCount = 1;
    dispatch(
      addItem({
        id: id,
        title: title,
        count: newCount,
        price: price,
        rating: rating,
        image: image,
        totalPrice: totalPrice,
      })
    );
    setSnacker(true);
  };
  const removeFromBasket = () => {
    dispatch(deleteItem({ id: id }));
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
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt="product" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>
            {price} X {count}
          </strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <div key={i}>
                <StarIcon style={{ fontSize: "large", color: "#FFA41C" }} />
              </div>
            ))}
        </div>
        <div className="checkoutProduct_buttonWrapper">
          <div className="checkoutProduct__quantity">
            <div
              className="checkoutProduct__quantityMinus"
              onClick={removeItemUnit}
            >
              <RemoveIcon />
            </div>
            <div className="checkoutProduct__quantityDisplay">
              <span>{count}</span>
            </div>
            <div className="checkoutProduct__quantityPlus" onClick={risecount}>
              <AddIcon />
            </div>
          </div>
          <IconButton onClick={removeFromBasket}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      {snacker && customSnackbar}
    </div>
  );
}

export default CheckoutProduct;
