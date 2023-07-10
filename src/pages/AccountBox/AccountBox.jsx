import React, { useState } from "react";
import { AccountContext } from "../../context/AccountContext";
import {
  AccountContainer,
  BoxContainer,
  TopContainer,
  BackDrop,
  HeaderContainer,
  HeaderText,
  SmallText,
  InnerContainer,
} from "./AccountStyled";
import { Signin } from "../../components/SigninAndSignup/Signin";
import { Signup } from "../../components/SigninAndSignup/Signup";

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

export const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

const AccountBox = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContainer>
      <AccountContext.Provider value={contextValue}>
        <BoxContainer>
          <TopContainer>
            <BackDrop
              initial={false}
              animate={isExpanded ? "expanded" : "collapsed"}
              variants={backdropVariants}
              transition={expandingTransition}
            />
            {active === "signin" && (
              <HeaderContainer>
                <HeaderText>Tekrar</HeaderText>
                <HeaderText>Hoşgeldiniz</HeaderText>
                <SmallText>Devam etmek için giriş yapın!</SmallText>
              </HeaderContainer>
            )}
            {active === "signup" && (
              <HeaderContainer>
                <HeaderText>Yeni Hesap</HeaderText>
                <HeaderText>Oluştur</HeaderText>
                <SmallText>Devam etmek için lütfen kaydolun!</SmallText>
              </HeaderContainer>
            )}
          </TopContainer>
          <InnerContainer>
            {active === "signin" && <Signin />}
            {active === "signup" && <Signup />}
          </InnerContainer>
        </BoxContainer>
      </AccountContext.Provider>
    </AccountContainer>
  );
};

export default AccountBox;
