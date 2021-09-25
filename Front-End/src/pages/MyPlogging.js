import React from "react";
import { useSelector } from "react-redux";

import "../scss/MyPlogging.scss";

const dummyData = [
  {
    id: 0,
    title: "플로깅 타이틀1",
    address: "서울 노원구",
    location: "노해근린공원",
    completed: true,
    participate: true,
  },
  {
    id: 1,
    title: "플로깅 타이틀2",
    address: "경기 인창동",
    location: "구리역공원",
    completed: true,
    participate: false,
  },
  {
    id: 2,
    title: "플로깅 타이틀3",
    address: "서울 노원구",
    location: "갈울근린공원",
    completed: false,
    participate: false,
  },
];

function MyPlogging({ history }) {
  const user = useSelector((state) => state.user.user);
  const is_login = useSelector((state) => state.user.is_login);
  if (!is_login) {
    window.alert("로그인 후 이용가능합니다.");
    history.replace("/login");
    return <></>;
  }
  return (
    <React.Fragment>
      <div className="list-container">
        <h1>My Plogging</h1>
        <ul>
          {dummyData.map((data) => {
            return (
              <li>
                <div className="title">
                  <h4>{data.title}</h4>
                </div>
                <div className="location-container">
                  <p>{data.address}</p>
                  <p>{data.location}</p>
                </div>
                <button>이동</button>
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default MyPlogging;
