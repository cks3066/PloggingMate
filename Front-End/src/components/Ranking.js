import React from "react";
import styled from "styled-components";
import { CloseCircleOutlined, TrophyTwoTone } from "@ant-design/icons";

const Ranking = (props) => {
  const [toggle, setToggle] = React.useState(true);
  let rankButton;
  const onClick = () => {
    setToggle(true);
    rankButton = document.getElementById("RankButton");
    rankButton.style.display = "none";
  };
  const onCloseButtonClick = () => {
    setToggle(false);
    rankButton = document.getElementById("RankButton");
    rankButton.style.display = "block";
  };
  return (
    <>
      <RankButton onClick={onClick} id="RankButton">
        <TrophyTwoTone
          twoToneColor="#FFC312"
          style={{
            fontSize: "50px",
            paddingTop: "25%",
            color: "#FFC312",
          }}
        />
      </RankButton>
      {toggle && (
        <Body>
          <HeaderInRank>
            <TrophyTwoTone
              twoToneColor="#FFC312"
              style={{ fontSize: "20px" }}
            />
            Ranking
            <CloseButton
              style={{ fontSize: "18px", color: "black" }}
              onClick={onCloseButtonClick}
            />
          </HeaderInRank>
          <RankTable>
            <RankElement>순위</RankElement> <RankElement>아이디</RankElement>
            <RankElement>참여</RankElement>
          </RankTable>
          <Table>
            <tr>
              <td>1</td>
              <td>on_schan</td> <td>12</td>
            </tr>
            <tr>
              <td>2</td>
              <td>dhstmdcks</td> <td>10</td>
            </tr>
            <tr>
              <td>3</td>
              <td>tmdcks</td> <td>10</td>
            </tr>
            <tr>
              <td>4</td>
              <td>cks</td> <td>9</td>
            </tr>
            <tr>
              <td>5</td>
              <td>on1234</td>
              <td>8</td>
            </tr>
            <tr>
              <td>6</td>
              <td>tmd0987</td> <td>8</td>
            </tr>
            <tr>
              <td>7</td>
              <td>cks1234</td> <td>7</td>
            </tr>
            <tr>
              <td>8</td>
              <td>qweasd</td>
              <td>5</td>
            </tr>
            <tr>
              <td>9</td>
              <td>zxczxc</td> <td>4</td>
            </tr>
            <tr>
              <td>10</td>
              <td>zxcasdqwea</td> <td>3</td>
            </tr>
          </Table>
        </Body>
      )}
    </>
  );
};

const RankButton = styled.div`
  display: none;
  position: fixed;
  width: 6em;
  height: 6em;
  bottom: 4em;
  right: 7em;
  z-index: 2;
  cursor: pointer;
  border: 2px solid gray;
  border-radius: 50px;
  background-color: #f5f6fa;
  &:hover {
    background-color: #dcdde1;
  }
  box-shadow: 2px 2px 5px #999;
`;
const Body = styled.div`
  position: fixed;
  width: 15%;
  height: 75%;
  bottom: 2em;
  right: 5em;
  z-index: 1;
  border-radius: 10px;
  border: 1px solid #a5a5a5;
  background-color: white;
  @media screen and (max-width: 930px) {
    display: none;
  }
`;
const CloseButton = styled(CloseCircleOutlined)`
  cursor: pointer;
`;

const HeaderInRank = styled.div`
  padding: 5%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #a5a5a5;
  background-color: #ebebeb;
  border-radius: 10px 10px 0px 0px;
  font-weight: bold;
`;

const Table = styled.table`
  width: 100%;
  height: 85%;
`;

const RankTable = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5%;
`;

const RankElement = styled.div`
  font-weight: bold;
  font-size: 13px;
  color: #2f3640;
`;
export default Ranking;
