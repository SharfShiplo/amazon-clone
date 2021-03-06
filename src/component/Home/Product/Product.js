import React, { useState } from "react";
import "./Product.css";
import StarIcon from "@material-ui/icons/Star";
import Snackbar from "@material-ui/core/Snackbar";
import { useDispatch } from "react-redux";
import { addItem } from "../../../features/basket/basket";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
function Product({ id, title, image, price, rating }) {
  const [snacker, setSnacker] = useState(false);
  const dispatch = useDispatch();

  const AddToBasket = () => {
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
    <>
      <div className="product">
        <div className="product__info">
          <p className="product__title">{title}</p>
          <p className="proudct__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="product__rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <div key={i}>
                  <StarIcon style={{ fontSize: "large", color: "#FFA41C" }} />
                </div>
              ))}
          </div>
        </div>
        <img src={image} alt="product" />
        <div className="product__buttonWrapper">
          <button onClick={AddToBasket}>Add to Cart</button>
        </div>
      </div>
      {snacker && customSnackbar}
    </>
  );
}

export default Product;
