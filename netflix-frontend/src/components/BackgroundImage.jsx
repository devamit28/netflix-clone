import React from "react";
import styled from "styled-components";
import background from "../assets/background.jpg";

const BackgroundImage = () => {
  return (
    <Container>
      <img src={background} alt="Netflix Cover" />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  img {
    height: 100vh;
    width: 100vw;
  }
`;

export default BackgroundImage;
