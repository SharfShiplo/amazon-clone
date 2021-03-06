import React, { useState } from "react";
import "./ShippingAddress.css";
import { Grid, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAddress } from "../../../features/deliveryaddress/deliveryAddressSlice";
function ShippingAddress() {
  const [country, setCountry] = useState("");
  const [fullName, setFullName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const onAddressAdd = (e) => {
    e.preventDefault();
    let deliveryAddress = {
      name: fullName,
      phoneNo: phoneNumber,
      street: street,
      city: city,
      zip: zipcode,
      country: country,
    };
    dispatch(addAddress(deliveryAddress));
    history.replace("/payment");
    setCountry("");
    setFullName("");
    setStreet("");
    setCity("");
    setZipcode("");
    setphoneNumber("");
  };
  return (
    <div className="shippingAddress">
      <Grid container justify="center">
        <Grid item xs={10} sm={8} md={6} lg={5}>
          <div className="shippingAddress__container">
            <div style={{ textAlign: "center" }}>
              <Link to="/">
                <img
                  className="shippingAddress__image"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png"
                  alt="amazon logo"
                />
              </Link>
            </div>
            <Typography variant="h5">Add shipping address</Typography>
            <form className="shippingAddress__form">
              <div className="shippingAddress__formInputWrapper">
                <label>Country/Region</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="shippingAddress__formInputWrapper">
                <label>Full name (First and Last name)</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="shippingAddress__formInputWrapper">
                <label>Street address</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="shippingAddress__formInputWrapper">
                <label>City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="shippingAddress__formInputWrapper">
                <label>Zip Code</label>
                <input
                  type="text"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                />
              </div>
              <div className="shippingAddress__formInputWrapper">
                <label>Phone number</label>
                <input
                  type="number"
                  value={phoneNumber}
                  onChange={(e) => setphoneNumber(e.target.value)}
                />
              </div>
              <button type="submit" onClick={onAddressAdd}>
                Add Address
              </button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ShippingAddress;
