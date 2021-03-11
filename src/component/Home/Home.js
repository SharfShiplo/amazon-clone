import React, { useState, useEffect } from "react";
import "./Home.css";
import HomeBannerSlider from "./HomeBannerSlider/HomeBannerSlider";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Product from "./Product/Product";
import { db } from "../../firebase";
function Home() {
  const [homeProducts, setHomeProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = db
      .collection("products")
      .onSnapshot((snapshot) =>
        setHomeProducts(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        )
      );
    return () => {
      fetchProducts();
    };
  }, []);
  return (
    <div className="home">
      <Container maxWidth="xl">
        <HomeBannerSlider />
      </Container>
      <div className="home__gridWrapper">
        <Grid container spacing={2} justify="center">
          {homeProducts.map((homeProduct) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={homeProduct.id}>
              <Product
                id={homeProduct.id}
                title={homeProduct.data.title}
                price={homeProduct.data.price}
                rating={homeProduct.data.rating}
                image={homeProduct.data.image}
                unit={homeProduct.data.unit}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Home;
