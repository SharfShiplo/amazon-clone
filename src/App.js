import React, { useEffect, Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./component/Header/Header";
import "fontsource-roboto";
import Home from "./component/Home/Home";
import Footer from "./component/Footer/Footer";
import { useDispatch } from "react-redux";
import { putUser, removeUser } from "./features/user/userSlice";
import { auth } from "./firebase";
// import Login from "./component/Login/Login";
// import Checkout from "./component/Checkout/Checkout";
// import Payment from "./component/Checkout/Payment/Payment";
// import ShippingAddress from "./component/Checkout/ShippingAddress/ShippingAddress";
// import Orders from "./component/Orders/Orders";
// import ProductDetails from "./component/ProductDetails/ProductDetails";
// import ProductSlider from "./component/ProductSlider/ProductSlider";
const Login = lazy(() => import("./component/Login/Login"));
const Checkout = lazy(() => import("./component/Checkout/Checkout"));
const Payment = lazy(() => import("./component/Checkout/Payment/Payment"));
const ShippingAddress = lazy(() =>
  import("./component/Checkout/ShippingAddress/ShippingAddress")
);
const Orders = lazy(() => import("./component/Orders/Orders"));
const ProductSlider = lazy(() =>
  import("./component/ProductSlider/ProductSlider")
);
const ProductDetails = lazy(() =>
  import("./component/ProductDetails/ProductDetails")
);
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
      <Suspense fallback={<div>Loading...</div>}>
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
          <Route path="/products/:productId" exact>
            <Header />
            <ProductDetails />
            <ProductSlider />
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
      </Suspense>
    </Router>
  );
}

export default App;
