import React, { useState, useEffect } from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal/Subtotal";
import CheckoutProduct from "./CheckoutProduct/CheckoutProduct";
import Grid from "@material-ui/core/Grid";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { useSelector } from "react-redux";
import { selectBasket } from "../../features/basket/basket";
import SideProduct from "./SideProduct/SideProduct";
import { db } from "../../firebase";
function Checkout() {
  const basket = useSelector(selectBasket);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProcucts = db
      .collection("sideproducts")
      .onSnapshot((snapshot) =>
        setProducts(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        )
      );
    return () => {
      fetchProcucts();
    };
  }, []);
  let basketItem = (
    <div className="checkout__blank">
      <div className="checkout__blankCircle">
        <RemoveShoppingCartIcon
          style={{ fontSize: "100px", color: "#f0c14b" }}
        />
      </div>
      <p>Your cart is empty</p>
    </div>
  );
  if (basket.length > 0) {
    basketItem = basket.map((item) => (
      <CheckoutProduct
        key={item.id}
        id={item.id}
        title={item.title}
        price={item.price}
        count={item.count}
        image={item.image}
        totalPrice={item.totalPrice}
        rating={item.rating}
      />
    ));
  }
  // console.log(basket);
  return (
    <div className="checkout">
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} sm={12} md={8} lg={9}>
          <div className="checkout__ad">
            <img
              src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668.jpg"
              alt=""
            />
          </div>
          <div className="checkout__left">
            <h2 className="checkout__title">Shopping Cart</h2>
            {basketItem}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3}>
          {basket.length > 0 && <Subtotal />}
          <div className="checkout__sideWrapper">
            {products.map((product) => (
              <SideProduct
                key={product.id}
                id={product.id}
                title={product.data.title}
                price={product.data.price}
                image={product.data.image}
                rating={product.data.rating}
                unit={product.data.unit}
              />
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Checkout;
