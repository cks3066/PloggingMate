import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Connect = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector(state => state.user.is_login);
  const jwt = useSelector(state => state.user.jwt);

  if (is_login) {
    axios.get("http://localhost:8080/app/v1/microdust", {
      headers: {
        "X-ACCESS-TOKEN": jwt
      }
    }).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error.response.data)
    })
  }
  return <></>;
};

export default Connect;
