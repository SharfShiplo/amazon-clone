import React, { useState, useEffect } from "react";
import "./ProductDetails.css";
import { Grid, Typography, Hidden, Snackbar } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import PhoneIcon from "@material-ui/icons/Phone";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import CustomAlert from "../UI/CustomAlert/CustomAlert";
import { addItem } from "../../features/basket/basket";
import Select from "react-select";

const options = [
  { value: 1, label: "Only1" },
  { value: 2, label: "Only2" },
  { value: 3, label: "Only3" },
  { value: 4, label: "Only4" },
  { value: 5, label: "Only5" },
  { value: 6, label: "Only6" },
  { value: 7, label: "Only7" },
  { value: 8, label: "Only8" },
  { value: 9, label: "Only9" },
  { value: 10, label: "Only10" },
];
function ProductDetails() {
  const [product, setProduct] = useState({});
  const [snacker, setSnacker] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    value: 1,
    label: "Only1",
  });
  const dispatch = useDispatch();
  const { productId } = useParams();
  useEffect(() => {
    let fetctProduct = async () =>
      db
        .collection("products")
        .doc(productId)
        .onSnapshot((snapshot) =>
          setProduct({ ...snapshot.data(), id: productId })
        );
    fetctProduct();
    return () => {
      fetctProduct();
      setProduct({});
    };
  }, [productId]);

  const AddToBasket = () => {
    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        count: selectedOption.value,
        price: product.price,
        rating: product.rating,
        image: product.image,
        totalPrice: product.price * selectedOption.value,
      })
    );
    setSnacker(true);
    setSelectedOption({ value: 1, label: "Only1" });
  };
  const closeSnackbar = () => {
    setSnacker(false);
  };
  let customSnackbar = (
    <Snackbar
      open={snacker}
      autoHideDuration={2000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <CustomAlert image={product.image} price={product.price} />
    </Snackbar>
  );
  return (
    <>
      <div className="productDetails">
        <div className="productDetails__container">
          <Grid container justify="center">
            <Grid item xs={11} md={5} lg={4}>
              <div className="productDetails__imageWrapper">
                <img src={product.image} alt="" />
              </div>
            </Grid>
            <Grid item xs={11} md={7} lg={5}>
              <div className="productDetails__info">
                <Typography variant="h4">{product.title}</Typography>
                <div className="productDetails__rating">
                  <div className="productDetails__ratingLeft">
                    {Array(product.rating)
                      .fill()
                      .map((_, i) => (
                        <div key={i}>
                          <StarIcon
                            style={{ fontSize: "large", color: "#FFA41C" }}
                          />
                        </div>
                      ))}
                  </div>
                  <div className="productDetails__ratingRight">
                    <Typography variant="body2">62,825 ratings</Typography>
                  </div>
                </div>
                <div className="productDetails__price">
                  <Typography variant="h5">
                    $ {product.price} <small>($ {product.price}/count)</small>
                  </Typography>
                  <Typography variant="body2">
                    Excluded Shipping charge
                  </Typography>
                </div>
                <div className="productDetails__count">
                  <Typography variant="body1">Quantity:</Typography>
                  <div className="productDetails__select">
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                    />
                  </div>
                </div>
                <button
                  className="productDetails__button"
                  onClick={AddToBasket}
                >
                  Add to cart
                </button>
                <div className="productDetails__callFor">
                  <Typography variant="body2">
                    Have questions about this product
                  </Typography>
                  <Typography variant="h6">
                    <PhoneIcon /> <span>099966655588</span>
                  </Typography>
                </div>
              </div>
            </Grid>
            <Hidden mdDown>
              <Grid item lg={3}>
                <div className="productDetails__extraInfo">
                  <Typography variant="h6">
                    Only 142 left in stock - order soon.
                  </Typography>
                  <Typography variant="body1">
                    Shipping from <span>fakeamazon.com</span>
                  </Typography>
                  <Typography variant="body1">
                    Sold by <span>fakeamazon.com</span>
                  </Typography>
                </div>
              </Grid>
            </Hidden>
          </Grid>
        </div>
      </div>
      {snacker && customSnackbar}
    </>
  );
}

export default ProductDetails;
