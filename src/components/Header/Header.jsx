import React from "react";
//styled components
import {
  HeaderContainer,
  HeaderText1,
  HeaderText2,
  ProfileContainer,
  ProfilName,
} from "./Header.js";
//antd components and icons
import { AiOutlineMail } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { Avatar } from "antd";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderText1>CNKMRK</HeaderText1>
      <HeaderText2>list</HeaderText2>
      <ProfileContainer>
        <AiOutlineMail size={25} color="#2B3D63" cursor="pointer" />
        <IoNotificationsOutline size={25} color="#2B3D63" cursor="pointer" />
        <Avatar size={35} src="profil.jpeg" />
        <ProfilName>Cenk Merk</ProfilName>
      </ProfileContainer>
    </HeaderContainer>
  );
};

export default Header;
