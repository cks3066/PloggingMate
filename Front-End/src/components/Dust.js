import React, { useState, useEffect } from "react";
import "../scss/Dust.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

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

const Dust = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [dustData, setDustData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const location = user.user.address.split(" ");

  useEffect(() => {
    if (user.is_login) {
      axios
        .get("http://localhost:8080/app/microdust", {
          headers: {
            "X-ACCESS-TOKEN": user.jwt,
          },
        })
        .then((res) => {
          setDustData(res.data.result);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <React.Fragment>
      <div className="dust-container">
        {isLoading || !user.is_login ? (
          <p>loading</p>
        ) : (
          <div>
            <p>{location[0] + " " + location[1]}의 미세먼지 정보 : </p>
            <p>측정일시 : {dustData.dataTime}</p>
            <p>
              통합대기환경수치 :<Grade grade={dustData.khaiGrade} />{" "}
            </p>
            <p>통합대시환경지수 : {dustData.khaiValue}</p>
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
