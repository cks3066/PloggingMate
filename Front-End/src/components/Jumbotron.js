import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { data } from "../elements/SliderData";

import "../scss/Swiper.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function Jumbotron() {
  return (
    <React.Fragment>
      <Container>
        <Swiper
          className="swiper-container"
          spaceBetween={0}
          slidesPerView={1}
          navigation
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
          {data.map((item, index) => {
            return (
              <>
                <SwiperSlide>
                  <Link to="/postlist">
                    <img src={item.img} alt="Slider Image" />
                  </Link>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      </Container>
      <p>슬라이드를 누르시면 챌린지로 이동합니다.</p>
    </React.Fragment>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 400px;
  width: 800px;
  @media screen and (max-width: 768px) {
    width: 500px;
  }
`;

export default Jumbotron;
