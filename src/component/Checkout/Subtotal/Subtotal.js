import React, { useState } from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { selectUser } from "../../../features/user/userSlice";
import {
  getBasketTotal,
  getBasketItems,
  selectBasket,
} from "../../../features/basket/basket";
import { useSelector } from "react-redux";
import { selectAddress } from "../../../features/deliveryaddress/deliveryAddressSlice";

function Subtotal() {
  const user = useSelector(selectUser);
  const basket = useSelector(selectBasket);
  const address = useSelector(selectAddress);
  const [withGift, setWithGift] = useState(false);
  const history = useHistory();
  const handleChange = () => {
    setWithGift(!withGift);
  };
  const handleCheckOut = () => {
    if (user) {
      if (address) {
        history.push("/payment");
      } else {
        history.push("/addressselect");
      }
    } else {
      history.push("/login");
    }
  };
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({getBasketItems(basket)} items):
              <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={withGift}
                    onChange={handleChange}
                    name="withgift"
                    color="primary"
                  />
                }
                label="This order contain a gift"
              />
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={handleCheckOut}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
