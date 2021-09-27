import { createAction, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: [],
  listExpired: [],
  is_loading: false,
};

// 액션
const SET_POST = "post/SET_POST";
const LOADING = "post/LOADING";

// 액션 크리에이터
const setPost = createAction(SET_POST);
const loading = createAction(LOADING);

// thunk middleware- 함수형 액션
const thunkTest = (payload) => {
  return function (dispatch, getState) {};
};

const getPost = (payload) => {
  return function (dispatch, getState) {
    dispatch(loading(true));
    axios
      .get("http://localhost:8080/app/posts", {
        headers: {
          "X-ACCESS-TOKEN": getState().user.jwt,
        },
      })
      .then((res) => {
        dispatch(setPost(res.data.result));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
};

const applyPost = (postId) => {
  return function (dispatch, getState) {
    axios
      .post(
        `http://localhost:8080/app/posts/${postId}/applications/accounts/auth`,
        {},
        {
          headers: {
            "X-ACCESS-TOKEN": getState().user.jwt,
          },
        }
      )
      .then((res) => {})
      .catch((error) => {
        console.dir(error);
      });
  };
};

const addPost = (title, address, location, time, content, file, history) => {
  return function (dispatch, getState) {
    const formData = new FormData();
    var contents = {
      name: "제102호 어린이공원",
      address: "경기도 용인시 수지구 죽전동 1484번지 일원",
    };
    formData.append("file", file);
    formData.append("content", contents);
    axios
      .post("http://localhost:8080/app/park", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-ACCESS-TOKEN": getState().user.jwt,
          withCredentials: true,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.dir(error);
      });
  };
  //   axios
  //     .post(
  //       `http://localhost:8080/app/posts/`,
  //       {
  //         contents: title,
  //         reservedAt: time,
  //         totalApplyCount: 5,
  //         name: location,
  //         address: address,
  //       },
  //       {
  //         headers: {
  //           "X-ACCESS-TOKEN": getState().user.jwt,
  //         },
  //       }
  //     )
  //     .then(async (res) => {
  //       console.log(res);
  //       history.goBack();
  //     })
  //     .catch((error) => {
  //       console.dir(error);
  //     });
  // };
};
// 리듀서
export default createReducer(initialState, {
  [SET_POST]: (state, action) => {
    state.list = action.payload[0];
    state.listExpired = action.payload[1];
    state.is_loading = false;
  },
  [LOADING]: (state, action) => {
    state.is_loading = action.payload;
  },
});

// 디스패치용 액션크리에이터
const actionCreators = {
  setPost,
  addPost,
  getPost,
  applyPost,
};

export { actionCreators };
