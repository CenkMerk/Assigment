import React from "react";
import { LastAddContainer } from "./LastAdd";

const LastAdd = ({ data }) => {
  console.log(data);
  return (
    <LastAddContainer>
      <h4 style={{ color: "#f06150" }}>{data.companyName}</h4>
      <h4 style={{ color: "#f06150" }}>{data.headquarters}</h4>
    </LastAddContainer>
  );
};

export default LastAdd;
