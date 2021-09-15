import React, { useEffect } from "react";

import "../scss/MapContainer.scss";

const { kakao } = window;

const MapContainer = ({ searchPlace }) => {
  useEffect(() => {
    console.log(searchPlace);
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
      kakao.maps.event.addListener(marker, "click", function (mouseEvent) {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        console.log(typeof place);
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
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

    kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      searchDetailAddrFromCoords(mouseEvent.latLng, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let detailAddr = !!result[0].road_address
            ? "<div>도로명주소 : " +
              result[0].road_address.address_name +
              "</div>"
            : "";
          detailAddr +=
            "<div>지번 주소 : " + result[0].address.address_name + "</div>";

          let content =
            '<div className="bAddr">' +
            '<span className="title">법정동 주소정보</span>' +
            detailAddr +
            "</div>";

          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });

    kakao.maps.event.addListener(map, "idle", function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        let infoDiv = document.getElementById("centerAddr");
        for (let i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            if (
              result[i].address_name.trim() !== "" ||
              result[i].address_name !== null
            ) {
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

  return (
    <div className="map-container">
      <div id="map"></div>
      <div className="hAddr">
        <span className="title">지도중심기준 행정동 주소정보</span>
        <span id="centerAddr"></span>
      </div>
    </div>
  );
};

export default MapContainer;
