import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./component/Header/Header";
import "fontsource-roboto";
import Home from "./component/Home/Home";
import Footer from "./component/Footer/Footer";
import Login from "./component/Login/Login";
import Checkout from "./component/Checkout/Checkout";
import Payment from "./component/Checkout/Payment/Payment";
import { useDispatch } from "react-redux";
import { putUser, removeUser } from "./features/user/userSlice";
import { auth } from "./firebase";
import ShippingAddress from "./component/Checkout/ShippingAddress/ShippingAddress";
import Orders from "./component/Orders/Orders";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const theUser = {
          email: authUser.email,
          displayName: authUser.displayName,
          userId: authUser.uid,
        };
        dispatch(putUser(theUser));
      } else {
        dispatch(removeUser());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
            <Footer />
          </Route>
          <Route path="/addressselect">
            <ShippingAddress />
          </Route>
          <Route path="/payment">
            <Header />
            <Payment />
            <Footer />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
            <Footer />
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
