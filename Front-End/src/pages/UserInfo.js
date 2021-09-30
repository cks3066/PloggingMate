import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import StarIcon from "@material-ui/icons/Star";
import { Link } from "react-router-dom";

import Modal from "../elements/Modal";
import CloseIcon from "@material-ui/icons/Close";
import "../scss/UserInfo.scss";

function UserInfo({ history }) {
  const inputRef = useRef(null);
  let [imageURL, setImageURL] = useState("");
  let [modalVisible, setModalVisible] = useState(false);
  const user = useSelector((state) => state.user.user);
  const is_login = useSelector((state) => state.user.is_login);
  console.log();

  if (!is_login) {
    window.alert("로그인 후 이용가능합니다.");
    history.replace("/login");
    return <></>;
  }

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  function onClick() {
    inputRef.current.disabled = false;
    inputRef.current.click();
  }

  const onChange = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    console.log(imageUrl);
  };
  return (
    <React.Fragment>
      <div className="userinfo-container">
        <div className="inner">
          <h1>My Profile</h1>
          <div className="box">
            <img src={require("../img/logo.png").default} alt="logo" />
            <div className="btn-container">
              <form
                onSubmit={onSubmit}
                method="post"
                encType="multipart/form-data"
              >
                <button
                  type="submit"
                  className="btn btn-change"
                  onClick={openModal}
                >
                  {/* <label htmlFor="file"> 프로필 사진 변경</label> */}
                  <input
                    disabled
                    ref={inputRef}
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={onChange}
                  />
                  프로필 사진 변경
                </button>
              </form>
              <Link to="/myplogging" className="link btn btn-myplogging">
                내 플로깅
              </Link>
            </div>
          </div>
          <div className="my-point">
            나의 플로깅 지수는 <StarIcon></StarIcon> {user.participationCount}
            <Link to="/postlist" className="link btn btn-postlist">
              플로깅 참여하러 가기
            </Link>
          </div>
          <div className="info">
            <span>Name </span>
            <input
              className="input-name"
              type="text"
              placeholder={user.nickname}
            />
            <span>Address</span>
            <input
              className="input-address"
              type="text"
              placeholder={user.address}
            />
          </div>

          <button className="btn btn-modify">수정하기</button>
        </div>
      </div>
      {modalVisible && (
        <Modal
          className="modal-container"
          visible={modalVisible}
          maskClosable={true}
          onClose={closeModal}
        >
          <div className="inner">
            <p>서비스 준비중입니다.</p>
            <CloseIcon className="icon" onClick={closeModal}></CloseIcon>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
}

export default UserInfo;
