import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Features from "../components/Features";
import Products from "../components/Products";

function Home({ cartOpen, setCartOpen }) {
  return (
    <>
      <Banner />
      <Features />
      <Categories />
      <Products cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </>
  );
}

export default Home;
