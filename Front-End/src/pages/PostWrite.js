import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { CloseOutlined } from "@ant-design/icons";

const PostWrite = (props) => {
  const { daum } = window;
  const is_login = useSelector((state) => state.user.is_login);
  const user = useSelector((state) => state.user.user);
  const test = useSelector((state) => state.post.location);
  const { history } = props;
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [address, setAddress] = React.useState(
    props.location.state === undefined ? "" : props.location.state.address
  );
  const [location, setLocation] = React.useState(
    props.location.state === undefined ? "" : props.location.state.location
  );

  if (!is_login) {
    window.alert("로그인 후 이용가능합니다.");
    history.replace("/login");
    return <></>;
  }

  const onClickAddress = () => {
    if (address === "") {
      new daum.Postcode({
        oncomplete: function (data) {
          setAddress(data.address);
          setLocation(data.buildingName);
        },
      }).open();
    }
  };

  return (
    <Body>
      <ModalOverlay visible={true} />
      <ModalWrapper tabIndex="-1" visible={true}>
        <Posts tabIndex="0">
          <Notice>
            게시물 작성
            <GoBack onClick={() => history.goBack()} />
          </Notice>
          <Img src="http://via.placeholder.com/400x300" alt="이미지" />
          <Container>
            <Title>
              <Input
                title
                placeholder="* 타이틀을 적어주세요."
                onChange={(e) => setTitle(e.target.value)}
                maxLength="14"
              />
            </Title>
            <NoticeText>
              위치 :{" "}
              <Location onClick={onClickAddress}>
                {address === ""
                  ? "* 주소를 검색하려면 클릭하세요"
                  : `${address}`}
              </Location>
            </NoticeText>
            <Input_Location
              placeholder="* 상세 위치 ex) ○○공원"
              maxLength="14"
              value={location === "" ? "" : location}
            />
            <NoticeText>
              일정 : <Date type="datetime-local" />
            </NoticeText>
            <Line />
            <ContentContainer>
              <Input_Content
                rows="3"
                placeholder="* 소개글을 적어주세요. (40자이내)"
                maxLength="40"
                onChange={(e) => setContent(e.target.value)}
              />
            </ContentContainer>
            <Warning>
              * 게시물에 욕설 및 비방을 포함하거나 게시물의 악용 시 삭제 조치 및
              서비스 이용에 제한이 있을 수 있습니다.
            </Warning>
            <Participation>작성 완료</Participation>
          </Container>
        </Posts>
      </ModalWrapper>
    </Body>
  );
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 60px;
  max-width: 1200px;
`;

const Posts = styled.div`
  background-color: #fff;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  border: 2px solid #d3d3d3;
  border-radius: 10px;
  width: 800px;
  height: 480px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  z-index: 1000;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;

  @media screen and (max-width: 786px) {
    width: 680px;
  }

  @media screen and (max-width: 650px) {
    width: 480px;
  }
`;

const Notice = styled.h1`
  justify-content: space-between;
  padding: 15px;
  padding-left: 44%;
  display: flex;
  width: 100%;
  border-bottom: 2px solid #d3d3d3;
  font-weight: bold;
  margin: 0px;
  font-size: 20px;
  color: #505050;
`;

const Img = styled.img`
  width: 44%;
  height: 84%;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  margin: 10px 0px 10px 15px;
`;

const Input = styled.input.attrs({ required: true })`
  width: 100%;
  border: none;
  font-size: 24px;
  font-weight: bold;
  color: #535c68;
  &::placeholder {
    color: #8f8f8f;
  }
  &:focus {
    outline: none;
  }
  &:focus::-webkit-input-placeholder {
    color: transparent;
  }

  @media screen and (max-width: 780px) {
    font-size: 17px;
  }

  @media screen and (max-width: 650px) {
    font-size: 14px;
  }
`;

const Input_Location = styled.input.attrs({ required: true })`
  width: 80%;
  border: none;
  border-bottom: 1px solid gray;
  font-size: 16px;
  font-weight: bold;
  color: #535c68;
  margin-left: 13%;
  &::placeholder {
    color: #8f8f8f;
  }
  &:focus {
    outline: none;
  }
  &:focus::-webkit-input-placeholder {
    color: transparent;
  }

  @media screen and (max-width: 780px) {
    font-size: 14px;
  }

  @media screen and (max-width: 650px) {
    font-size: 12px;
  }
`;

const Input_Content = styled.textarea.attrs({ required: true })`
  width: 100%;
  border: none;
  font-size: 17px;
  font-weight: bold;
  color: #535c68;
  resize: none;
  &::placeholder {
    color: #8f8f8f;
  }
  &:focus {
    outline: none;
  }
  &:focus::-webkit-input-placeholder {
    color: transparent;
  }

  @media screen and (max-width: 780px) {
    font-size: 14px;
  }

  @media screen and (max-width: 650px) {
    font-size: 12px;
  }
`;

const Title = styled.div`
  display: flex;
  height: 15%;
  border-bottom: 1px solid #8f8f8f;
  justify-content: flex-start;
`;

const Location = styled.div`
  border: none;
  color: #535c68;
  margin-left: 15px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    outline: 1px solid black;
  }

  @media screen and (max-width: 780px) {
    font-size: 14px;
  }

  @media screen and (max-width: 650px) {
    font-size: 12px;
  }
`;

const Date = styled.input`
  margin-left: 15px;
  border: none;
  font-size: 15px;
  font-weight: bold;
  &:focus {
    outline: 1px solid #8f8f8f;
  }
`;

const GoBack = styled(CloseOutlined)`
  margin: 0px;
  margin-right: 5px;
  font-weight: bold;
  cursor: pointer;
`;

const Line = styled.div`
  border-bottom: 1px solid #8f8f8f;
`;

const NoticeText = styled.h4`
  text-align: left;
  margin: 15px 0px;
  display: flex;
  color: #8d8d8d;
  margin-right: 10px;
`;

const ContentContainer = styled.div`
  height: 30%;
  margin: 20px 0px;
  border: 1px solid #8f8f8f;
  border-radius: 10px;
  padding: 15px;
`;

const Participation = styled.button`
  margin: 5px;
  background-color: #3fc556;
  border: 0.2px solid #bdbdbd;
  font-size: 18px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const Warning = styled.b`
  color: #bdbdbd;
  font-size: 13px;
  margin: 5% 0px 5px 0px;
`;

export default withRouter(PostWrite);
