import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Loading3QuartersOutlined } from "@ant-design/icons";
<<<<<<< HEAD
=======
import "../scss/Dust.scss";

>>>>>>> 2126b110b8b727d370a4934babdddd970e1d8bc6

const Grade = ({ grade }) => {
  switch (grade) {
    case "1":
      return <b style={{ color: "blue" }}>좋음!</b>;
    case "2":
      return <b style={{ color: "green" }}>보통</b>;
    case "3":
      return <b style={{ color: "orange" }}>나쁨!</b>;
    case "4":
      return <b style={{ color: "red" }}>매우 나쁨!!</b>;
    default:
      return;
  }
};

const Dust = (props) => {
  const [dustData, setDustData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (props.pos.posX !== undefined && props.pos.posY !== undefined) {
      const dustURL = `http://localhost:8080/app/microdust?tmX=${props.pos.posX}&tmY=${props.pos.posY}`;

      axios
        .get(dustURL)
        .then((res) => {
          setDustData(res.data.result);
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
<<<<<<< HEAD
        {isLoading || !user.is_login ? (
=======
        {isLoading ? (
>>>>>>> 2126b110b8b727d370a4934babdddd970e1d8bc6
          <Loading3QuartersOutlined
            spin
            style={{ fontSize: "50px", color: "#3fc556" }}
          />
        ) : (
          <div>
            <p>{props.location}의 미세먼지 정보 : </p>
            <p>측정일시 : {dustData.dataTime} </p>
            <p>
              통합대기환경수치 :<Grade grade={dustData.khaiGrade} />{" "}
            </p>
            <p>통합대기환경지수 : {dustData.khaiValue}</p>
            <p>
              미세먼지 등급 : <Grade grade={dustData.pm10Grade} />
            </p>
            <p>미세먼지 농도 : {dustData.pm10Value}</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Dust;
