import React from "react";
import styled from "styled-components";

import { data } from "../elements/SliderData";

import "../scss/Swiper.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function Jumbotron() {
  console.log(data);

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
          onInit={(swiper) => console.log(swiper)}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
          {data.map((item, index) => {
            return (
              <SwiperSlide>
                <Card>
                  <img src={item.img} alt="Slider Image" />
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
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

const Card = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Jumbotron;
