import React, { useState } from "react";
import "./Payment.css";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { Typography, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAddress,
  resetAddress,
} from "../../../features/deliveryaddress/deliveryAddressSlice";
import {
  selectBasket,
  getBasketTotal,
  getBasketItems,
  resetBasket,
} from "../../../features/basket/basket";
import { db } from "../../../firebase";
import { selectUser } from "../../../features/user/userSlice";
import firebase from "firebase/app";
function Payment() {
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const address = useSelector(selectAddress);
  const basket = useSelector(selectBasket);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    let grandTotal = getBasketTotal(basket);
    await db
      .collection("orders")
      .add({
        ordereditems: basket,
        shippingto: address,
        totalprice: grandTotal,
        userid: user.userId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setProcessing(false);
        setSucceeded(true);
        setError(null);
        history.replace("/orders");
        dispatch(resetBasket());
        dispatch(resetAddress());
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <Grid container justify="center">
          <Grid item xs={12} sm={10} md={10} lg={6}>
            <div className="payment__containerTitle">
              <Typography variant="h4">
                Checkout (
                <Link to="/checkout"> {getBasketItems(basket)} items</Link>)
              </Typography>
            </div>
            <div className="payment__section">
              <div className="payment_title">
                <h3>Shipping from amazon-clone.com</h3>
              </div>
              <div className="payment__address">
                <Typography variant="body1">
                  <strong>Shipping to: </strong>
                  {`${address.name}, ${address.street}, 
                  ${address.city}, ${address.zip} ${address.country}`}
                </Typography>
              </div>
            </div>
            <div className="payment__section">
              <div className="payment_title">
                <h3>Review items and delivery</h3>
              </div>
              <div className="payment__items">
                {basket.map((item) => (
                  <CheckoutProduct
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    count={item.count}
                    image={item.image}
                    price={item.price}
                    totalPrice={item.totalPrice}
                    rating={item.rating}
                  />
                ))}
              </div>
            </div>
            <div className="payment__section">
              <div className="payment__details">
                <form onSubmit={handleSubmit}>
                  <div className="payment__priceContainer">
                    <CurrencyFormat
                      renderText={(value) => <h3>Order Total: {value}</h3>}
                      decimalScale={2}
                      value={getBasketTotal(basket)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                    <button disabled={processing || succeeded}>
                      <span>{processing ? <p>processing</p> : "Buy Now"}</span>
                    </button>
                  </div>
                  {error && <div>{error}</div>}
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Payment;
