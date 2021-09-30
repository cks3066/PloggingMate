import React, { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";
import Navbar from "../components/Navbar";
import Jumbotron from "../components/Jumbotron";
import LoginBox from "../components/LoginBox";
import Dust from "../components/Dust";
import FindPark from "../components/FindPark";

import "../scss/Home.scss";
import Ranking from "../components/Ranking";

const Home = () => {
  const API_AUTH =
    "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json";
  const API_TRAD =
    "https://sgisapi.kostat.go.kr/OpenAPI3/transformation/transcoord.json";

  const CONSUMER_KEY = "ba3ecec0514e40e0a36a"; // 서비스 ID
  const CONSUMER_SECRET = "1891fab306e244f99077"; // 보안 KEY
  const WGS84 = 4326;
  const GRS80 = 5181;

  let [tmPos, setTmPos] = useState({});
  let [location, setLocation] = useState("");

  useEffect(() => {
    const url = `${API_AUTH}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;

    navigator.geolocation.getCurrentPosition((position) => {
      axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${position.coords.longitude}&y=${position.coords.latitude}&input_coord=WGS84`,
          {
            headers: {
              Authorization: "KakaoAK c110186294e282609044a72dd378ffbf",
            },
          }
        )
        .then((res) => {
          setLocation(res.data.documents[0].address.address_name);
        });

      axios
        .get(url)
        .then((res) => {
          if (res.status === 200) {
            xyToTM(
              res.data.result.accessToken,
              position.coords.latitude,
              position.coords.longitude
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });

    function xyToTM(accessToken, latitude, longitude) {
      const url = `${API_TRAD}?accessToken=${accessToken}&src=${WGS84}&dst=${GRS80}&posX=${longitude}&posY=${latitude}`;

      axios
        .get(url)
        .then((res) => {
          if (res.status === 200) {
            let data = {
              posX: res.data.result.posX,
              posY: res.data.result.posY,
            };
            setTmPos(data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <Container>
      <Jumbotron></Jumbotron>
      <Section className="section-container">
        <Dust pos={tmPos} location={location}></Dust>
        <LoginBox></LoginBox>
      </Section>
      <FindPark></FindPark>
      <Ranking />
    </Container>
  );
};

const Container = styled.div`
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const Section = styled.section`
  width: 800px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  margin-top: 20px;
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export default Home;
