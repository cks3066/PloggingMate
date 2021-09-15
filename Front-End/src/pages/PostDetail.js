import React from "react";
import styled from "styled-components";
import Modal_Post from "../elements/Modal_Post";
import { useHistory } from "react-router-dom";

const PostDetail = (props) => {
  const history = useHistory();
  const postData = props.location.state.props;
  const [modalVisible, setModalVisible] = React.useState(true);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    history.push('/postlist');
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
          <Content>
            <Title>{postData.contents}</Title>
            <Position>위치 : {postData.position}</Position>
            <Date>일정 : {postData.date}</Date>
            <Line />
            <Participant>참여자 3/5</Participant>
            <Position>on_schan, onsky, onstar</Position>
            <Participation>참여하기</Participation>
          </Content>
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
    max-height: 400px;
    min-height: 400px;
  }
  @media screen and (max-width: 768px) {
    max-width: 250px;
    min-width: 250px;
    max-height: 400px;
    min-height: 400px;
  }
`;

const Title = styled.h2`
  text-align: left;
  margin-bottom: 5px;
  border-bottom: 1px solid #8f8f8f;
  padding-bottom: 20px;
`;

const Position = styled.h4`
  text-align: left;
`;
const Date = styled.h4`
  text-align: left;
`;
const Content = styled.div`
  width: 21em;
  display: flex;
  flex-direction: column;
  align-content: center;
  color: #535c68;
`;

const Line = styled.div`
  padding-top: 10px;
  border-bottom: 1px solid #8f8f8f;
`;

const Participant = styled.h4`
  font-size: 18px;
  text-align: left;
`;

const Participation = styled.button`
  
`