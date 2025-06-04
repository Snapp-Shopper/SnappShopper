import React from "react";
import HeroBanner from "../components/shared/HeroBanner";
import ProductSection from "../components/Product/ProductSection";

const Home = () => {
  return (
    <>
      <HeroBanner />
      <div className="mx-auto p-4">
        <ProductSection title="Recently Viewed Products" />
        <ProductSection title="Top Deals" />
        <ProductSection title="Explore Arrivals" />
      </div>
    </>
  );
};

export default Home;
