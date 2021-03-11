import React from "react";
import "./Footer.css";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import BackToTop from "./BackToTop/BackToTop";
function Footer() {
  return (
    <>
      <BackToTop />
      <div className="footer">
        <div className="footer__container">
          <Grid
            container
            spacing={2}
            justify="center"
            style={{ paddingBottom: "32px" }}
          >
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <div className="footer__options">
                <Typography variant="h6">Get to Know Us</Typography>
                <ul>
                  <li>
                    <Link to="/">Careers</Link>
                  </li>
                  <li>
                    <Link to="/">Blog</Link>
                  </li>

                  <li>
                    <Link to="/">About Amazon</Link>
                  </li>
                  <li>
                    <Link to="/">Sustainability</Link>
                  </li>
                  <li>
                    <Link to="/">Investor Relations</Link>
                  </li>
                  <li>
                    <Link to="/">Amazon Devices</Link>
                  </li>
                  <li>
                    <Link to="/">Amazon Tours</Link>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <div className="footer__options">
                <Typography variant="h6">Make Money with Us</Typography>
                <ul>
                  <li>
                    <Link to="/">Sell products on Amazon</Link>
                  </li>
                  <li>
                    <Link to="/">Sell apps on Amazon</Link>
                  </li>

                  <li>
                    <Link to="/">Become an Affiliate</Link>
                  </li>
                  <li>
                    <Link to="/">Advertise Your Products</Link>
                  </li>
                  <li>
                    <Link to="/">Self-Publish with Us</Link>
                  </li>
                  <li>
                    <Link to="/">Host an Amazon Hub</Link>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <div className="footer__options">
                <Typography variant="h6">Amazon Payment Products</Typography>
                <ul>
                  <li>
                    <Link to="/">Amazon Business Card</Link>
                  </li>
                  <li>
                    <Link to="/">Shop with Points</Link>
                  </li>

                  <li>
                    <Link to="/">Reload Your Balance</Link>
                  </li>
                  <li>
                    <Link to="/">Amazon Currency Converter</Link>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3}>
              <div className="footer__options">
                <Typography variant="h6">Let Us Help You</Typography>
                <ul>
                  <li>
                    <Link to="/">Amazon and COVID-19</Link>
                  </li>
                  <li>
                    <Link to="/">Your Account</Link>
                  </li>

                  <li>
                    <Link to="/">Your Orders</Link>
                  </li>
                  <li>
                    <Link to="/">Shipping Rates &amp; Policies</Link>
                  </li>
                  <li>
                    <Link to="/">Returns &amp; Replacements</Link>
                  </li>
                  <li>
                    <Link to="/">Amazon Assistant</Link>
                  </li>
                  <li>
                    <Link to="/">Help</Link>
                  </li>
                </ul>
              </div>
            </Grid>
          </Grid>
          <Divider />
          <div className="footer__copyright">
            <div className="footer__copyright_left">
              <Link to="/">
                <img
                  className="footer__logo"
                  src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                  alt="amazon logo"
                />
              </Link>
            </div>
            <div className="footer__copyrightRight">
              <Link to="/">
                <span className="footer__copyrightOption">U.S. Dollar</span>
              </Link>
              <Link to="/">
                <span className="footer__copyrightOption">United States</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
