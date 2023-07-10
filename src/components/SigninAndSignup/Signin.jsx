import React, { useContext } from "react";
//styled components
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

export function Signin(props) {
  const { switchToSignup } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Şifre" />
      </FormContainer>
      <MutedLink href="#">Şifreni mi unuttun?</MutedLink>
      <SubmitButton type="submit">
        <NavLink
          to="/Anasayfa"
          style={{ color: "inherit", textDecoration: "none", width: "100%"}}
        >
          Giriş
        </NavLink>
      </SubmitButton>
      <MutedLink href="#">
        Hesabınız yok mu?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Kayıt Ol
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
