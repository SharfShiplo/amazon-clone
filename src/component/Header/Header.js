import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link, useHistory } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import BottomHeader from "./BottomHeader/BottomHeader";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { selectUser, removeUser } from "../../features/user/userSlice";
import { getBasketItems, selectBasket } from "../../features/basket/basket";

function Header() {
  const history = useHistory();
  const signedInuser = useSelector(selectUser);
  const basket = useSelector(selectBasket);
  const dispatch = useDispatch();
  const handleAuthentication = () => {
    if (signedInuser) {
      dispatch(removeUser);
      auth.signOut();
      history.push("/");
    } else {
      history.push("/login");
    }
  };
  const myOrders = () => {
    if (signedInuser) {
      history.push("/orders");
    } else {
      history.push("/login");
    }
  };
  return (
    <>
      <div className="header">
        <Link to="/">
          <img
            className="header__logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="amazon logo"
          />
        </Link>
        <div className="header__search">
          <input
            className="header__searchInput"
            type="text"
            placeholder="Just a 
            Dummy input"
          />
          <SearchIcon className="header__searchIcon" />
        </div>
        <div className="header__nav">
          <Hidden smDown>
            <div className="header__option" onClick={handleAuthentication}>
              <span className="header__optionLineOne">
                Hello {!signedInuser ? "Guest" : signedInuser.displayName}
              </span>
              <span className="header__optionLineTwo">
                {!signedInuser ? "Sign in" : "Sign Out"}
              </span>
            </div>
          </Hidden>
          <Hidden smDown>
            <div className="header__option" onClick={myOrders}>
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">&amp; Orders</span>
            </div>
          </Hidden>
          <Hidden smDown>
            <div className="header__option">
              <span className="header__optionLineOne">Your</span>
              <span className="header__optionLineTwo">Prime</span>
            </div>
          </Hidden>
          <Link to="/checkout">
            <div className="header__optionBasket">
              <ShoppingBasketIcon />
              <span className="header__optionLineTwo header__basketCount">
                {getBasketItems(basket)}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <BottomHeader />
    </>
  );
}

export default Header;
