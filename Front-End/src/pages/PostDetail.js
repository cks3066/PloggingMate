import React from "react";
import styled from "styled-components";
import Modal_Post from "../elements/Modal_Post";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const PostDetail = (props) => {
  const history = useHistory();
  const postData = props.location.state.props;
  const [modalVisible, setModalVisible] = React.useState(true);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    history.goBack();
  };

  console.log(postData);

  return (
    <Container>
      {modalVisible && (
        // eslint-disable-next-line react/jsx-pascal-case
        <Modal_Post
          visible={modalVisible}
          maskClosable={true}
          onClose={closeModal}
        >
          <Img src={postData.image_url} alt="image" />
          <Contents>
            <Title>{postData.contents}</Title>
            <Notice><NoticeInner>위치 : </NoticeInner>{postData.position}</Notice>
            <Notice><NoticeInner>일정 : </NoticeInner>{postData.date}</Notice>
            <Line />
            <Content>토요일 오후 낙산공원에서 환경을 위해 다같이 플로깅하는게 어때요? 😊</Content>
            <Line />
            <Notice participant><NoticeInner>참여자</NoticeInner><ParticipantNotice>3/5</ParticipantNotice></Notice>
            <Participant>on_schan, onsky, onstar</Participant>
            <Participation>플로깅 참여</Participation>
          </Contents>
        </Modal_Post>
      )}
    </Container>
  );
};

export default PostDetail;

const Container = styled.div`
  display: flex;
`;

const Img = styled.img`
  max-width: 420px;
  min-width: 420px;
  height: 25rem;
  margin-right: 10px;
  @media screen and (max-width: 900px) {
    max-width: 300px;
    min-width: 300px;
    min-height: 400px;
  }
  @media screen and (max-width: 768px) {
    max-width: 220px;
    min-width: 220px;
    min-height: 400px;
  }
`;

const Title = styled.h2`
  text-align: left;
  margin-bottom: 5px;
  border-bottom: 1px solid #8f8f8f;
  padding-bottom: 20px;
  @media screen and (max-width: 700px) {
    font-size: 18px;
  }
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const Notice = styled.h4`
  text-align: left;
  margin:10px 0px 10px 0px;
  display: flex;
  @media screen and (max-width: 700px) {
    font-size: 16px;
  }
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

const NoticeInner = styled.b`
color: #8d8d8d;
margin-right:10px;
`;

const Contents = styled.div`
  width: 21em;
  display: flex;
  flex-direction: column;
  align-content: center;
  color: #535c68;
`;

const Content = styled.div`
  text-align: left;
  color: #535c68;
  font-weight: 600;
  border : 1px solid #8f8f8f;
  margin : 15px 0px 15px 0px;
  padding : 12px;
  border-radius: 10px;
  @media screen and (max-width: 540px) {
    font-size: 14px;
  }

`;

const Line = styled.div`
  border-bottom: 1px solid #8f8f8f;
`;

const Participant = styled.h4`
  font-size: 16px;
  text-align: left;
  margin:0px 0px 5px 0px;
  height: 22%;
`;

const ParticipantNotice = styled.b`
background-color: #d1d1d1;
padding:3px 4px 3px 4px;
border-radius: 10px;
font-size: 13px;
letter-spacing :1px;

`;

const Participation = styled.button`
  margin:5px;
  background-color: #3fc556;
  border:0.2px solid #bdbdbd;
  font-size: 18px;
  color:white;
  border-radius: 5px;
  cursor: pointer;
`