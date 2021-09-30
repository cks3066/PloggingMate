import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { actionCreators as userAction } from "../redux/modules/user";
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
  const list = useSelector((state) => state.user.user.ploggingList);
  const posts = useSelector((state) => state.post.list);

  console.log(posts);
  console.log("List", list);
  console.log(useSelector((state) => state.post));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAction.getMyPost(user.uid));
  }, []);

  console.log(user);
  if (!is_login) {
    window.alert("로그인 후 이용가능합니다.");
    history.replace("/login");
    return <></>;
  }
  return (
    <React.Fragment>
      <div className="list-container">
        <h1>My Plogging</h1>
        {list.length > 0 ? (
          <ul>
            {list.map((data) => {
              const yearMonth = data.reservedAt.split("-");
              const dayTime = yearMonth[2].split("T");
              const time = dayTime[1].split(":");
              const date = {
                year: yearMonth[0],
                month: yearMonth[1],
                day: dayTime[0],
                hour: time[0],
                minute: time[1],
              };
              return (
                <li>
                  <div className="title">
                    <h4>{data.contents}</h4>
                  </div>
                  <div className="location-container">
                    <p>
                      {data.address.split(" ")[0] +
                        " " +
                        data.address.split(" ")[1]}
                    </p>
                    <p>{data.parkName}</p>
                  </div>
                  <Link
                    to={{
                      pathname: `/postdetail/${data.postId}`,

                      state: { post: data, date, is_progress: true },
                    }}
                    className="link btn btn-postdetail"
                  >
                    이동
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="below">
            <h4>참여한 플로깅이 없습니다.</h4>
            <h5>
              아래 버튼을 눌러 <br />
              플로깅에 참여해보세요!🏃‍♀️
            </h5>
            <Link to="/postlist" className="link btn btn-postlist">
              챌린지 리스트로 이동
            </Link>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default MyPlogging;
