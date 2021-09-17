import { createAction, createReducer } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};

const initialPost = {
  id: 0,
  user_info: {
    user_name: "on.schan",
    user_profile: "https://source.unsplash.com/random/1",
  },
  //
  image_url: "https://source.unsplash.com/random/2",
  contents: "",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
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
  return function (dispatch, getState) { };
};

// 리듀서
export default createReducer(initialState, {
  [SET_POST]: (state, action) => {
    state.list.push(action.payload.post_list);
    state.paging = action.payload.paging;
    state.is_loading = false;
  },
  [ADD_POST]: (state, action) => {
    state.list.unshift(action.payload.post);
  },
  [EDIT_POST]: (state, action) => {
    let idx = state.list.findIndex((p) => p.id === action.payload.post_id);
    state.list[idx] = { ...state.list[idx], ...action.payload.post };
  },
  [LOADING]: (state, action) => {
    state.is_loading = action.payload.is_loadging;
  },
});

// 디스패치용 액션크리에이터
const actionCreators = {
  setPost,
  addPost,
  editPost,
};

export { actionCreators };
