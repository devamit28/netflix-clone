import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Head = (props) => {
  const navigate = useNavigate();
  return (
    <StyledHeader className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="Netflix Logo" />
      </div>
      <button
        onClick={() => {
          navigate(props.login ? "/login" : "/signup");
        }}
      >
        {props.login ? "Log In" : "Sign Up"}
      </button>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  padding: 0 4rem;
  .logo {
    img {
      height: 5rem;
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }
`;

export default Head;
