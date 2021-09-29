import React from "react";
import styled from "styled-components";
import Modal_Post from "../elements/Modal_Post";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { actionCreators as postActions } from "../redux/modules/post";

const PostDetail = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { post } = props.location.state;
  const { date } = props.location.state;
  const { is_progress } = props.location.state;
  const { user } = useSelector((state) => state.user);
  const is_login = useSelector((state) => state.user.is_login);
  const [modalVisible, setModalVisible] = React.useState(true);
  const url = `https://source.unsplash.com/random/${post.postId}`;
  const applied =
    post.accounts.filter((item) => item.accountId === user.uid).length !== 0
      ? true
      : false;
  const closeModal = () => {
    setModalVisible(false);
    history.goBack();
  };
  console.log(post);
  const onClick = () => {
    if (is_login) {
      if (!applied) {
        if (window.confirm("플로깅에 참여하시겠습니까?")) {
          dispatch(postActions.applyPost(post.postId));
          dispatch(postActions.getPost());
          history.push("/");
        }
      } else {
        if (window.confirm("플로깅 참여를 취소하시겠습니까?")) {
          dispatch(postActions.applyPost(post.postId));
          dispatch(postActions.getPost());
          history.push("/");
        }
      }
    } else {
      if (window.confirm("플로깅 참여를 위해선 로그인이 필요합니다.")) {
        history.push("/login");
      }
    }
  };
  const rendering = () => {
    const result = [];
    post.accounts.map((item, index) => {
      result.push(<p key={index}>{item.accountName}</p>);
    });
    return result;
  };
  React.useEffect(() => {
    rendering();
  });

  return (
    <Container>
      {modalVisible && (
        // eslint-disable-next-line react/jsx-pascal-case
        <Modal_Post
          visible={modalVisible}
          maskClosable={true}
          onClose={closeModal}
        >
          <Img src={url} alt="image" />
          <Contents>
            <Title>{post.contents}</Title>
            <Notice style={{ flexDirection: "column" }}>
              <NoticeInner>위치 : {post.address} </NoticeInner>
              <LocationDetail>{post.parkName} </LocationDetail>
            </Notice>
            <Notice>
              <NoticeInner>일정 : </NoticeInner>
              {date.year}년 {date.month}월 {date.day}일 {date.hour}시{" "}
              {date.minute}분
            </Notice>
            <Line />
            <Content>포스트에 들어있는 세부정보 넣기</Content>
            <Line />
            <Notice participant>
              <NoticeInner>참여자</NoticeInner>
              <ParticipantNotice>{post.applyCount}/5</ParticipantNotice>
            </Notice>
            <Participant>{rendering()}</Participant>
            {is_progress ? (
              <Participation onClick={onClick}>
                {!applied ? "플로깅 참여" : "플로깅 참여 취소"}
              </Participation>
            ) : (
              <Expired>완료된 플로깅입니다</Expired>
            )}
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

const LocationDetail = styled.b`
  color: #535c68;
  margin-top: 10px;
  margin-left: 14%;
  margin-bottom: 0px;
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
  margin: 8px 0px 8px 0px;
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
  margin-right: 10px;
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
  border: 1px solid #8f8f8f;
  margin: 15px 0px 15px 0px;
  padding: 12px;
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
  margin: 0px 0px 5px 0px;
  height: 22%;
`;

const ParticipantNotice = styled.b`
  background-color: #d1d1d1;
  padding: 3px 4px 3px 4px;
  border-radius: 10px;
  font-size: 13px;
  letter-spacing: 1px;
`;

const Participation = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  background-color: #3fc556;
  border: 0.2px solid #bdbdbd;
  font-size: 18px;
  color: white;
  border-radius: 5px;
  height: 10%;
  cursor: pointer;
`;
const Expired = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  background-color: #bdbdbd;
  border: 0.2px solid #bdbdbd;
  font-size: 18px;
  color: white;
  height: 10%;
  border-radius: 5px;
`;
