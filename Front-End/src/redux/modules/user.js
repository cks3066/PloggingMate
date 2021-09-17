import { createAction, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  is_login: false,
  jwt: null,
  user: {
    uid: null,
    email: "",
    address: "",
    nickname: "",
  }
};

// 액션
const LOG_OUT = "user/LOG_OUT";
const SET_USER = "user/SET_USER";
const SET_LOGIN = "user/SET_LOGIN";

// 액션 크리에이터
const logOut = createAction(LOG_OUT);
const setUser = createAction(SET_USER);
const setLogin = createAction(SET_LOGIN);

// thunk middleware- 함수형 액션
const login = (id, pwd, history) => {
  return function (dispatch, getState) {
    axios.post("http://localhost:8080/app/sign-in", {
      email: id,
      password: pwd
    }).then(res => {
      dispatch(setLogin({ jwt: res.data.result.jwt }));
    }).catch(error => {
      window.alert(error.response.data.message)
    }).then(() => {
      if (getState().user.jwt === null) return;
      axios.get("http://localhost:8080/app/accounts/auth", {
        headers: {
          "X-ACCESS-TOKEN": getState().user.jwt
        }
      }).then(res => {
        dispatch(setUser(res.data.result));
      }).catch(error => {
        console.log(error);
      }).then(() => { history.replace('/') })
    })
  }
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
  [SET_LOGIN]: (state, action) => {
    state.is_login = true;
    state.jwt = action.payload.jwt;
  },
  [SET_USER]: (state, action) => {
    const userData = action.payload;
    state.user.uid = userData.accountId;
    state.user.email = userData.email;
    state.user.address = userData.address;
    state.user.nickname = userData.nickname;
  },
  [LOG_OUT]: (state, action) => {
    state.is_login = false;
    state.jwt = null;
    state.user = {
      uid: null,
      email: "",
      address: "",
      nickname: "",
    }
  },
});

// 디스패치용 액션크리에이터
const actionCreators = {
  login,
  signup,
  logOut,
};

export { actionCreators };
