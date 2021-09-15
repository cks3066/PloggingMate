import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";
import "../scss/Navbar.scss";

function Navbar({ history }) {
  const [isLogin, setIsLogin] = useState(false);

  const onClick = (e) => {
    document.querySelectorAll(".tab-item").forEach((el) => {
      if (el.classList.contains("active")) {
        el.classList.remove("active");
      }
    });

    if (e.target.className !== "logo") e.target.classList.add("active");
  };

  const logout = () => {
    setIsLogin(false);
    //history push home ?
  };

  return (
    <>
      <NormalNav>
        <NavbarItems>
          <Link to="/" className="logo" onClick={onClick}>
            <span className="home">
              <img src={require("../img/logo.png").default} alt="logo" />
              PloggingMate
            </span>
          </Link>
          <Tab>
            <Link to="/postlist" className="tab-item" onClick={onClick}>
              Challenge
            </Link>
            <Link to="/Park" className="tab-item" onClick={onClick}>
              Park
            </Link>
            {isLogin ? (
              <Link to="/logout" className="tab-item" onClick={logout}>
                Logout
              </Link>
            ) : (
              <>
                <Link to="/signup" className="tab-item" onClick={onClick}>
                  Sign Up
                </Link>
                <Link to="/login" className="tab-item" onClick={onClick}>
                  Login
                </Link>
              </>
            )}
          </Tab>
        </NavbarItems>
      </NormalNav>
    </>
  );
}

const NormalNav = styled.nav`
  z-index: 10;
  position: fixed;
  top: 0;
  font-family: inherit;
  font-weight: 700;
  padding: 20px 0;
  max-width: 1200px;
  width: 100%;
  background-color: white;
  border-bottom: 2px solid white;
  &::after {
    content: "";
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 1px;
    width: 100%;
    background-color: #d3d3d3;
  }
`;

const NavbarItems = styled.div`
  margin-bottom: 6.5px;
  display: flex;
  padding: 0 20px;
  align-items: center;
  justify-content: space-between; ;
`;

const Tab = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default Navbar;
