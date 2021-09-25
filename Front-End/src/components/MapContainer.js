import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Modal from "../elements/Modal";
import PostWrite from "../pages/PostWrite";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import { withRouter } from "react-router";

import { connect } from "react-redux";

import "../scss/MapContainer.scss";

const { kakao } = window;

const MapContainer = ({ searchPlace }) => {
  let [modalVisible, setModalVisible] = useState(false);
  let [location, setLoctaion] = useState("");
  let [address, setAddress] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);

    const geocoder = new kakao.maps.services.Geocoder();
    let marker = new kakao.maps.Marker();
    let infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

    const mapTypeControl = new kakao.maps.MapTypeControl();
    const zoomControl = new kakao.maps.ZoomControl();

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      kakao.maps.event.addListener(marker, "click", () => {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        setModalVisible(true);
        setLoctaion(place.place_name);
        geocoder.coord2RegionCode(place.x, place.y, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            setAddress(result[0].address_name);
          }
        });
      });

      kakao.maps.event.addListener(
        marker,
        "mouseover",
        makeOverListener(map, marker, infowindow, place.place_name)
      );

      kakao.maps.event.addListener(
        marker,
        "mouseout",
        makeOutListener(infowindow)
      );
    }

    function makeOverListener(map, marker, infowindow, name) {
      return function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' + name + "</div>"
        );
        infowindow.open(map, marker);
      };
    }

    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }

    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    kakao.maps.event.addListener(map, "idle", function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        let infoDiv = document.getElementById("centerAddr");
        if (infoDiv) {
          for (let i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === "H") {
              infoDiv.innerHTML = result[i].address_name;
              break;
            }
          }
        }
      }
    }

    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, [searchPlace]);

  function closeModal() {
    setModalVisible(false);
  }

  return (
    <div className="map-container">
      <div id="map"></div>
      <div className="hAddr">
        <span className="title">지도중심기준 행정동 주소정보</span>
        <span id="centerAddr"></span>
      </div>
      {modalVisible && (
        <Modal
          className="modal-container"
          visible={modalVisible}
          maskClosable={true}
          onClose={closeModal}
        >
          <h1>{location}</h1>

          <p>위 장소에서 플로깅을 진행하시겠어요?</p>
          <div className="btn-container">
            <button className="btn later" onClick={closeModal}>
              나중에 할게요!
            </button>
            <Link
              to={{
                pathname: "/postwrite",
                state: { address, location },
              }}
              className="link btn go"
            >
              {console.log(address)}글 작성하기
            </Link>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MapContainer;
