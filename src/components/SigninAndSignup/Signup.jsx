import React, { useContext } from "react";
//sytled components
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./SigninAndSignup";
//context
import { AccountContext } from "../../context/AccountContext";
//router
import { NavLink } from "react-router-dom";

const NavLinkStyle={
  color:"inherit",
  textDecoration:"none",
  padding:"11px 40%"
}
export function Signup(props) {
  const { switchToSignin } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Adınız ve Soyadınız" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Şifre" />
        <Input type="password" placeholder="Şifreyi tekrar giriniz" />
      </FormContainer>
      <SubmitButton type="submit"><NavLink to="/Anasayfa" style={{color:"inherit", textDecoration:"none"}}>Kaydol</NavLink></SubmitButton>
      <MutedLink href="#">
        Zaten hesabınız var mı?
        <BoldLink href="#" onClick={switchToSignin}>
          Giriş Yap
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
