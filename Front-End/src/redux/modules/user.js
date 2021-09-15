import { createAction, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialState = {
  is_login: false,
};

// 액션
const LOG_OUT = "user/LOG_OUT";
const GET_USER = "user/GET_USER";
const SET_USER = "user/SET_USER";

// 액션 크리에이터
const logOut = createAction(LOG_OUT);
const getUser = createAction(GET_USER);
const setUser = createAction(SET_USER);

// thunk middleware- 함수형 액션
const login = (id, pwd, history) => {
  return function (dispatch, getState) {
    axios.post("http://localhost:8080/app/sign-in", {
      email: id,
      password: pwd
    }).then(res => {
      sessionStorage.setItem("JWT", res.data.result.jwt);
      window.alert("로그인 성공");
      dispatch(setUser());
      history.push('/');
    }).catch(error => {
      window.alert(error.response.data.message)
    })
  };
};

const signup = (id, nickname, pwd, address, history) => {
  return function (dispatch, getState) {
    axios.post("http://localhost:8080/app/sign-up", {
      email: id,
      nickname: nickname,
      password: pwd,
      address: address
    }).then(res => {
      window.alert("회원가입 성공");
      history.push('/');
    }).catch(error => {
      if (error.response.data.message === "닉네임 형식을 확인해주세요.") {
        window.alert("닉네임 형식을 확인해주세요.\n닉네임은 3글자 이상, 20글자 이하이며, \n특수문자는 '_' 와 '-' 만 허용됩니다.")
      } else {
        window.alert(error.response.data.message)
      }
    })
  };
};

// 리듀서
export default createReducer(initialState, {
  [GET_USER]: (state, action) => { },
  [SET_USER]: (state, action) => {
    state.is_login = true;
  },
  [LOG_OUT]: (state, action) => {
    state.is_login = false;
    sessionStorage.removeItem("JWT");
  },
});

// 디스패치용 액션크리에이터
const actionCreators = {
  login,
  signup,
  logOut,
  setUser,
};

export { actionCreators };
