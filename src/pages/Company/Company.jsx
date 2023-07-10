import React from "react";
import { CompanyContainer, CompanyContent } from "./Company.js";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Header from "../../components/Header/Header.jsx";
import CompanyTable from "../../components/CompanyTable/CompanyTable.jsx";

const Company = () => {
  return (
    <CompanyContainer>
      <Header />
      <CompanyContent>
        <Navbar />
        <CompanyTable />
      </CompanyContent>
    </CompanyContainer>
  );
};

export default Company;
