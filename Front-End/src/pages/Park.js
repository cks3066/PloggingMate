import React, { useEffect, useState } from "react";

import "../scss/Park.scss";

import SearchIcon from "@material-ui/icons/Search";

import MapContainer from "../components/MapContainer";

const { kakao } = window;

function Park() {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");
  const msg = document.querySelector(".message");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== "")
      msg.innerHTML = `<strong>${inputText} 공원</strong>에 대한 검색 결과입니다`;
    setPlace(inputText + " 공원");
    setInputText("");
  };

  return (
    <React.Fragment>
      <div className="park-container">
        <h1>근처 공원을 검색해보세요!</h1>
        <h4>지역 이름까지만 검색해주세요 ex) 노원구 공원 : 노원구</h4>
        <form className="inputform" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search Place..."
            onChange={onChange}
            value={inputText}
          />
          <button type="submit">
            <SearchIcon></SearchIcon>
          </button>
        </form>
        <p className="message"></p>
        <MapContainer searchPlace={place} />
      </div>
    </React.Fragment>
  );
}

export default Park;
