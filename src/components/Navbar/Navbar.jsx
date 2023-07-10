import React from "react";
//icons
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { AiOutlineHome, AiOutlineShopping } from "react-icons/ai";
//styled components
import { NavbarButton, ButtonText, NavbarContainer } from "./Navbar";
//router
import { NavLink } from "react-router-dom";

const NavlinkStyle = {
  textDecoration: "none",
  border: "none",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
  color: "black",
  padding: "0px 10px",
  borderEndStartRadius: "10px",
  borderStartStartRadius: "10px",
};

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavLink to="/Anasayfa" style={NavlinkStyle}>
        <AiOutlineHome size={30} />
        <ButtonText>Anasayfa</ButtonText>
      </NavLink>
      <NavLink to="/Şirketler" style={NavlinkStyle}>
        <HiOutlineBuildingOffice2 size={30} />
        <ButtonText>Şirketler</ButtonText>
      </NavLink>
      <NavLink to="/Ürünler" style={NavlinkStyle}>
        <AiOutlineShopping size={30} />
        <ButtonText>Ürünler</ButtonText>
      </NavLink>
    </NavbarContainer>
  );
};

export default Navbar;
