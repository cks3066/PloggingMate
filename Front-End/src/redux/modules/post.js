import { createAction, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: [],
  listExpired: [],
  is_loading: false,
};

// 액션
const SET_POST = "post/SET_POST";
const ADD_POST = "post/ADD_POST";
const EDIT_POST = "post/EDIT_POST";
const LOADING = "post/LOADING";

// 액션 크리에이터
const setPost = createAction(SET_POST);
const addPost = createAction(ADD_POST);
const editPost = createAction(EDIT_POST);
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
    console.log("호출");
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
      .then((res) => {
        dispatch(getPost());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
// 리듀서
export default createReducer(initialState, {
  [SET_POST]: (state, action) => {
    state.list = action.payload[0];
    state.listExpired = action.payload[1];
    state.is_loading = false;
  },
  [ADD_POST]: (state, action) => {},
  [EDIT_POST]: (state, action) => {},
  [LOADING]: (state, action) => {
    state.is_loading = action.payload;
  },
});

// 디스패치용 액션크리에이터
const actionCreators = {
  setPost,
  addPost,
  editPost,
  getPost,
  applyPost,
};

export { actionCreators };
