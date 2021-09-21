import React from "react";
import "../scss/UserInfo.scss";

import StarIcon from "@material-ui/icons/Star";

function UserInfo() {
  return (
    <React.Fragment>
      <div className="userinfo-container">
        <div className="inner">
          <h1>My Profile</h1>
          <div className="box">
            <img src={require("../img/logo.png").default} alt="logo" />
            <div className="btn-container">
              <button className="btn btn-change">Change Picture</button>
              <button className="btn btn-delete">Delete Picture</button>
            </div>
          </div>
          <div className="my-point">
            나의 플로깅 지수는 <StarIcon></StarIcon> user.count
          </div>
          <div className="info">
            <span>Name </span>
            <input
              className="input-name"
              type="text"
              placeholder="이름을 입력하세요."
            />
            <span>Address</span>
            <input
              className="input-address"
              type="text"
              placeholder="주소를 입력하세요."
            />
          </div>

          <button className="btn btn-modify">수정하기</button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserInfo;
