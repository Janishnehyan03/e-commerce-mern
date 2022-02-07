import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Features from "../components/Features";
import Products from "../components/Products";

function Home() {
  return (
    <>
      <Banner />
      <Features />
      <Categories />
      <Products/>
    </>
  );
}

export default Home;
