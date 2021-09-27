import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import "../scss/Dust.scss";
import styled from "styled-components";

const Grade = ({ grade, value, label }) => {
  switch (grade) {
    case "1":
      return (
        <>
          <GradeBox style={{ backgroundColor: "#48dbfb" }}>{value}</GradeBox>
          <ShowGrade>
            <div>{label}</div>
            <b style={{ color: "#48dbfb" }}>좋음</b>
          </ShowGrade>
        </>
      );
    case "2":
      return (
        <>
          <GradeBox style={{ backgroundColor: "#1dd1a1" }}>{value}</GradeBox>
          <ShowGrade>
            <div>{label}</div>
            <b style={{ color: "#1dd1a1" }}>보통</b>
          </ShowGrade>
        </>
      );
    case "3":
      return (
        <>
          <GradeBox style={{ backgroundColor: "#feca57" }}>{value}</GradeBox>
          <ShowGrade>
            <div>{label}</div>
            <b style={{ color: "#feca57" }}>나쁨</b>
          </ShowGrade>
        </>
      );
    case "4":
      return (
        <>
          <GradeBox style={{ backgroundColor: "#ff6b6b" }}>{value}</GradeBox>
          <ShowGrade>
            <div>{label}</div>
            <b style={{ color: "#ff6b6b" }}>매우나쁨</b>
          </ShowGrade>
        </>
      );
    default:
      return;
  }
};

const NotiGrade = ({ grade }) => {
  switch (grade) {
    case "1":
      return (
        <>
          <Noti1 style={{ paddingRight: "45%" }}>"오늘은 플로깅하기</Noti1>
          <Noti2 style={{ paddingLeft: "30%" }}>무척 좋은 날이에요!🌞"</Noti2>
        </>
      );
    case "2":
      return (
        <>
          <Noti1 style={{ paddingRight: "45%" }}>"오늘은 플로깅하기</Noti1>
          <Noti2 style={{ paddingLeft: "40%" }}>괜찮은 날이에요!🌳"</Noti2>
        </>
      );
    case "3":
      return (
        <>
          <Noti1 style={{ paddingRight: "30%" }}>
            "오늘은 꼭 마스크를 쓰고
          </Noti1>
          <Noti2 style={{ paddingLeft: "38%" }}>플로깅 하는게 좋아요"</Noti2>
        </>
      );
    case "4":
      return (
        <>
          <Noti1 style={{ paddingRight: "45%" }}>"오늘은 대기상태가</Noti1>
          <Noti2 style={{ paddingLeft: "45%" }}>매우 안좋아요😥"</Noti2>
        </>
      );
    default:
      return;
  }
};

const Dust = (props) => {
  const [dustData, setDustData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const location = props.location.split(" ");
  useEffect(() => {
    if (props.pos.posX !== undefined && props.pos.posY !== undefined) {
      const dustURL = `http://localhost:8080/app/microdust?tmX=${props.pos.posX}&tmY=${props.pos.posY}`;

      axios
        .get(dustURL)
        .then((res) => {
          setDustData(res.data.result);
          console.log("data", res.data.result);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [props]);
  return (
    <React.Fragment>
      <div className="dust-container">
        {isLoading ? (
          <Loading>
            <Loading3QuartersOutlined
              spin
              style={{ fontSize: "50px", color: "#3fc556" }}
            />
            <span style={{ margin: "30px" }}>
              로딩이 지속될 경우 새로고침하세요.
            </span>
          </Loading>
        ) : (
          <div>
            <Title>
              <TitleEl>미세먼지 정보</TitleEl>
              <Ment>플로깅 가기 전에 먼저 미세먼지를 확인하세요</Ment>
            </Title>
            {!!dustData.khaiGrade ? (
              <NotiGrade grade={dustData.khaiGrade} />
            ) : (
              <p>통합지수 데이터를 불러올 수 없습니다.</p>
            )}
            <Container>
              {!!dustData.khaiGrade ? (
                <Grade
                  grade={dustData.khaiGrade}
                  value={dustData.khaiValue}
                  label="통합지수"
                />
              ) : (
                <p>통합지수 없음</p>
              )}
              {!!dustData.pm10Grade ? (
                <Grade
                  grade={dustData.pm10Grade}
                  value={dustData.pm10Value}
                  label="미세먼지"
                />
              ) : (
                <p>미세먼지 없음</p>
              )}
            </Container>
            <div>
              <Location>
                위치 : {location[0]} {location[1]} {location[2]}
              </Location>
              <Time>측정일시 : {dustData.dataTime}</Time>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

const Title = styled.div`
  margin: 20px;
`;
const Noti1 = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  margin: 8px 0px 8px 0px;
`;
const Noti2 = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
`;

const Ment = styled.p`
  margin: 0px;
  font-size: 14px;
  color: gray;
`;
const TitleEl = styled.h1`
  margin: 10px;
  font-weight: bold;
  color: #2ecc71;
`;
const Location = styled.div`
  font-size: 12px;
  margin: 0px;
  margin-top: 15px;
  margin-left: 55%;
  color: #7f8c8d;
`;
const Time = styled.div`
  font-size: 12px;
  margin: 0px;
  margin-top: 5px;
  margin-left: 48%;
  color: #7f8c8d;
`;
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 15%;
  margin: 15px 0px 10px 0px;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #d3d3d3;
  padding: 10px;
  border-radius: 15px;
`;
const GradeBox = styled.div`
  display: flex;
  border-radius: 5px;
  background-color: black;
  width: 2.7em;
  height: 2.5em;
  color: white;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  padding: 2px;
  font-size: 14px;
`;
const ShowGrade = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: -7%;
`;
const Loading = styled.div`
  display: flex;
  flex-direction: column;
`;
export default Dust;
