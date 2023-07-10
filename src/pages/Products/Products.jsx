import React from "react";
import { ProductContainer, ProductContent } from "./Product.js";
import Header from "../../components/Header/Header.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import ProductTable from "../../components/ProductTable/ProductTable.jsx";
const Products = () => {
  return (
    <ProductContainer>
      <Header />
      <ProductContent>
        <Navbar />
        <ProductTable/>
      </ProductContent>
    </ProductContainer>
  );
};

export default Products;
