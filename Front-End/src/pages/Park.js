/*global kakao*/

import React, { useEffect } from "react";

import "../scss/Park.scss";

function Park() {
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
    };
    let map = new kakao.maps.Map(container, options);

    let markerPosition = new kakao.maps.LatLng(
      37.365264512305174,
      127.10676860117488
    );
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
    let geocoder = new kakao.maps.services.Geocoder();

    // let marker = new kakao.maps.Marker();
    // let infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

    // kakao.maps.event.addEventListener(map, "click", (mouseEvent) => {
    //   searchDetailAddrFromCoords(mouseEvent.latLng, (result, status) => {
    //     if (status === kakao.maps.services.Status.OK) {
    //       let detailAddr = !!result[0].road_adrress
    //         ? "<div>도로명주소 : " +
    //           result[0].road_adrress.address_name +
    //           "</div>"
    //         : "";
    //       let content =
    //         '<div className="bAddr">' +
    //         '<span className="title">법정동 주소정보</span>' +
    //         detailAddr +
    //         "</div>";

    //       marker.setPosition(mouseEvent.latLng);
    //       marker.setMap(map);

    //       infowindow.setContent(content);
    //       infowindow.open(map, marker);
    //     }
    //   });
    // });

    // function searchAddrFromCoords(coords, callback) {
    //   geocoder.coor2dRegionCode(coords.getLng(), coords.getLat(), callback);
    // }

    // function searchDetailAddrFromCoords(coords, callback) {
    //   geocoder.coor2dAddress(coords.getLng(), coords.getLat(), callback);
    // }

    // function displayCenterInfo(result, status) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     let infoDiv = document.getElementById("centerAddr");

    //     for (let i = 0; i < result.length; i++) {
    //       if (result[i].region_type === "H") {
    //         infoDiv.innerHTML = result[i].address_name;
    //         break;
    //       }
    //     }
    //   }
    // }
  });

  return (
    <React.Fragment>
      <div className="map-container">
        <div id="map"></div>
      </div>
    </React.Fragment>
  );
}

export default Park;
