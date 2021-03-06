import React, { useState, useEffect } from "react";
import "./Orders.css";
import { Grid, Typography } from "@material-ui/core";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
function Orders() {
  const user = useSelector(selectUser);
  const [orderItems, setOrderItems] = useState([]);
  let userIdfromStore = user?.userId;
  useEffect(() => {
    const cleanUp = async () =>
      db
        .collection("orders")
        .where("userid", "==", userIdfromStore)
        .get()
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            items: doc.data().ordereditems,
            grandTotal: doc.data().totalprice,
            shippingto: doc.data().shippingto,
          }));
          setOrderItems(data);
        })
        .catch((error) => alert(error.message));
    cleanUp();
    return () => {
      cleanUp();
    };
  }, [userIdfromStore]);
  return (
    <div className="orders">
      <div className="orders__container">
        <Grid container justify="center">
          <Grid item xs={12} sm={10} md={10} lg={6}>
            <div className="orders__section">
              <div className="orders__title">
                <Typography variant="h4">Your Orders</Typography>
              </div>
              {orderItems.map((orderItem) => (
                <div className="orders__displayBox" key={orderItem.id}>
                  <div className="orders__displayBox__option">
                    {orderItem.items.map((item) => (
                      <div
                        className="orders__displayBox__optionItem"
                        key={item.id}
                      >
                        <img
                          className="displayBox__optionImage"
                          src={item.image}
                          alt=""
                        />
                        <div className="displayBox__optionInfo">
                          <Typography variant="h6">{item.title}</Typography>
                          <Typography variant="body2">
                            <span>item price: $ {item.price},</span>
                            <span>Unit: {item.count},</span>
                            <span>Total price: $ {item.totalPrice}</span>
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className="orders__displayBox__option"
                    style={{ marginBottom: "5px" }}
                  >
                    <Typography variant="h5">
                      Grand Total: $ {orderItem.grandTotal}
                    </Typography>
                  </div>
                  <div className="orders__displayBox__option">
                    <Typography variant="h5">Shipping information:</Typography>
                    <div className="displayBox_shipping_info">
                      <ul>
                        <li>
                          <span>Name:</span>
                          <span>{orderItem.shippingto.name}</span>
                        </li>
                        <li>
                          <span>Phone No.</span>
                          <span>{orderItem.shippingto.phoneNo}</span>
                        </li>
                        <li>
                          <span>Street:</span>
                          <span>{orderItem.shippingto.street}</span>
                        </li>
                        <li>
                          <span>City:</span>
                          <span>{orderItem.shippingto.city}</span>
                        </li>
                        <li>
                          <span>Zipcode:</span>
                          <span>{orderItem.shippingto.zip}</span>
                        </li>
                        <li>
                          <span>Country:</span>
                          <span>{orderItem.shippingto.country}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Orders;
