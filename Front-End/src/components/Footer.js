import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <>
      <CopyRight>
        CopyRight &copy; {new Date().getFullYear()} Team PloggingMate. All
        Rights Reserved.
      </CopyRight>
    </>
  );
}

const CopyRight = styled.div`
  z-index: 9;
  position: absolute;
  display: flex;
  color: #333;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  background-color: white;
`;

export default Footer;
