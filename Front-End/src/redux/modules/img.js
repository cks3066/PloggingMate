import { createAction, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    image_url: "http://via.placeholder.com/400x300",
    uploading: false,
    preview: null,
};

// 액션
const UPLOADING = "img/UPLOADING";
const UPLOAD_IMAGE = "img/UPLOAD_IMAGE";
const SET_PREVIEW = "img/SET_PREVIEW";

// 액션 크리에이터
const uploading = createAction(UPLOADING);
const uploadImage = createAction(UPLOAD_IMAGE);
const setPreview = createAction(SET_PREVIEW);

// thunk middleware- 함수형 액션
const uploadImageFB = (image) => {
    return function (dispatch, getState) {
        dispatch(uploading(true));
        // const _upload = storage.ref(`image/${image.name}`).put(image);

        // _upload.then((snapshot) => {
        //     console.log(snapshot);

        //     snapshot.ref.getDownloadURL().then((url) => {
        //         dispatch(uploadImage(url));
        //         console.log(url);
        //     });
        // });
    };
};

// 리듀서
export default createReducer(initialState, {
    [UPLOAD_IMAGE]: (state, action) => {
        state.image_url = action.payload.image_url;
        state.uploading = false;
    },
    [UPLOADING]: (state, action) => {
        state.uploading = action.payload.uploading;
    },
    [SET_PREVIEW]: (state, action) => {
        state.preview = action.payload.preview;
    },
});

// 디스패치용 액션크리에이터
const actionCreators = {
    uploadImage,
    uploadImageFB,
    setPreview,
};

export { actionCreators };