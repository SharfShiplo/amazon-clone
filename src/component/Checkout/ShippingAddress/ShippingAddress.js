import React from "react";
import "./ShippingAddress.css";
import { Grid, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAddress } from "../../../features/deliveryaddress/deliveryAddressSlice";
import { useForm } from "react-hook-form";
function ShippingAddress() {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const onAddressAdd = (data) => {
    let deliveryAddress = {
      name: data.nameInput,
      phoneNo: data.phoneInput,
      street: data.streetInput,
      city: data.cityInput,
      zip: data.zipInput,
      country: data.countryInput,
    };
    dispatch(addAddress(deliveryAddress));
    history.replace("/payment");
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
            <form
              className="shippingAddress__form"
              onSubmit={handleSubmit(onAddressAdd)}
            >
              <div className="shippingAddress__formInputWrapper">
                <label>Country/Region</label>
                <input
                  type="text"
                  name="countryInput"
                  ref={register({ required: true })}
                />
                {errors.countryInput && (
                  <small style={{ color: "red", marginTop: "4px" }}>
                    Your country is required
                  </small>
                )}
              </div>
              <div className="shippingAddress__formInputWrapper">
                <label>Full name (First and Last name)</label>
                <input
                  type="text"
                  name="nameInput"
                  ref={register({ required: true })}
                />
                {errors.nameInput && (
                  <small style={{ color: "red", marginTop: "4px" }}>
                    Your Full Name is required
                  </small>
                )}
              </div>
              <div className="shippingAddress__formInputWrapper">
                <label>Street address</label>
                <input
                  type="text"
                  name="streetInput"
                  ref={register({ required: true })}
                />
                {errors.streetInput && (
                  <small style={{ color: "red", marginTop: "4px" }}>
                    Your Street is required
                  </small>
                )}
              </div>
              <div className="shippingAddress__formInputWrapper">
                <label>City</label>
                <input
                  type="text"
                  name="cityInput"
                  ref={register({ required: true })}
                />
                {errors.cityInput && (
                  <small style={{ color: "red", marginTop: "4px" }}>
                    Your city is required
                  </small>
                )}
              </div>
              <div className="shippingAddress__formInputWrapper">
                <label>Zip Code</label>
                <input
                  type="text"
                  name="zipInput"
                  ref={register({ required: true })}
                />
                {errors.zipInput && (
                  <small style={{ color: "red", marginTop: "4px" }}>
                    Zipcode is required
                  </small>
                )}
              </div>
              <div className="shippingAddress__formInputWrapper">
                <label>Phone number</label>
                <input
                  type="number"
                  name="phoneInput"
                  ref={register({ required: true })}
                />
                {errors.phoneInput && (
                  <small style={{ color: "red", marginTop: "4px" }}>
                    Phone Number is required
                  </small>
                )}
              </div>
              <button type="submit">Add Address</button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ShippingAddress;
