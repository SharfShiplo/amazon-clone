import React, { useState } from "react";
import "./BottomHeader.css";
import MenuIcon from "@material-ui/icons/Menu";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Hidden from "@material-ui/core/Hidden";
import SideDrawer from "../SideDrawer/SideDrawer";
const BottomHeader = () => {
  const [openSideDrawer, setOpenSideDrawer] = useState(false);
  return (
    <>
      <div className="bottomHeader">
        <div className="bottomHeader__left">
          <div
            className="bottomHeader__option"
            onClick={() => setOpenSideDrawer(true)}
          >
            <MenuIcon />
          </div>
          <div className="bottomHeader__option">
            <LocationOnOutlinedIcon />
            <span className="bottomHeader_option__text">
              Deliver to Bangladesh
            </span>
          </div>
          <Hidden smDown>
            <div className="bottomHeader__option">
              <span className="bottomHeader_option__text">Today's Deals</span>
            </div>
          </Hidden>
          <Hidden smDown>
            <div className="bottomHeader__option">
              <span className="bottomHeader_option__text">
                Customer Service
              </span>
            </div>
          </Hidden>

          <Hidden smDown>
            <div className="bottomHeader__option">
              <span className="bottomHeader_option__text">Gift Cards</span>
            </div>
          </Hidden>
          <Hidden smDown>
            <div className="bottomHeader__option">
              <span className="bottomHeader_option__text">Sell</span>
            </div>
          </Hidden>
          <Hidden smDown>
            <div className="bottomHeader__option">
              <span className="bottomHeader_option__text">Registry</span>
            </div>
          </Hidden>
        </div>
        <div className="bottomHeader__right">
          <Hidden smDown>
            <div className="bottomHeader__option">
              <span className="bottomHeader_option__text">
                Amazon's response to COVID-19
              </span>
            </div>
          </Hidden>
        </div>
      </div>
      <SideDrawer
        open={openSideDrawer}
        openIt={() => setOpenSideDrawer(true)}
        closeIt={() => setOpenSideDrawer(false)}
      />
    </>
  );
};

export default BottomHeader;
