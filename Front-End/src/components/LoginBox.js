import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../scss/LoginBox.scss";
import { useSelector } from "react-redux";
import axios from "axios";

function LoginBox() {
  const login = useSelector(state => state.user.is_login);
  const user = useSelector(state => state.user.user);
  return (
    <React.Fragment>
      <div className="userbox-container">
        {login ? (
          <div className="userbox">
            <p>
              <strong>{user.nickname}님</strong> <br />
              안녕하세요!😀
            </p>
            <div className="btn-container">
              <Link to="/" className="link btn to-mypage">
                마이 페이지
              </Link>
              <Link to="/postlist" className="link btn to-challenge">
                챌린지 보러 가기
              </Link>
            </div>
          </div>
        ) : (
          <div className="loginbox">
            <span>
              <strong>로그인</strong>하여 <br />
              주위에서 진행되는 <br />
              플로깅에 참석해보세요!
            </span>
            <Link to="/login" className="link btn">
              로그인 하러가기
            </Link>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default LoginBox;
