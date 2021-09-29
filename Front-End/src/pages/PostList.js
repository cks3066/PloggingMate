import React from "react";
import Post from "../components/Post";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Modal from "../elements/Modal";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const address = useSelector((state) => state.address);
  const posts = useSelector((state) => state.post.list);
  const postsExpired = useSelector((state) => state.post.listExpired);
  const [showNum, setShowNum] = React.useState(0);
  const [showNum_complete, setShowNum_complete] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [init, setInit] = React.useState(true);
  const closeModal = () => {
    setModalVisible(false);
  };

  React.useEffect(() => {
    dispatch(postActions.getPost());
    if (init) {
      if (posts.length < 12) {
        setShowNum(posts.length);
      } else {
        setShowNum(12);
      }
      if (postsExpired.length < 8) {
        setShowNum_complete(postsExpired.length);
      } else {
        setShowNum_complete(8);
      }
      setInit(false);
    }
  }, []);

  const clickMore = () => {
    if (showNum + 4 < posts.length) setShowNum(showNum + 4);
    else {
      setShowNum(posts.length);
    }
    if (showNum === posts.length) window.alert("더이상 게시물이 없습니다.");
  };

  const clickMore_complete = () => {
    if (showNum_complete + 4 < postsExpired.length)
      setShowNum_complete(showNum_complete + 4);
    else {
      setShowNum_complete(postsExpired.length);
    }
    if (showNum_complete === postsExpired.length)
      window.alert("더이상 게시물이 없습니다.");
  };

  const rendering = () => {
    const result = [];
    for (let i = 0; i < showNum; i++) {
      result.push(<Post key={posts[i].postId} post={posts[i]} />);
    }
    return result;
  };

  const rendering_complete = () => {
    const result = [];
    for (let i = 0; i < showNum_complete; i++) {
      result.push(
        <Post
          key={postsExpired[i].postId}
          post={postsExpired[i]}
          is_progress={false}
        />
      );
    }
    return result;
  };

  return (
    <Body>
      <Title>플로깅 메이트 찾기</Title>
      <SubTitle>
        회원님의 주변 공원에서 진행중인 플로깅입니다. 플로깅에 함께
        참여해보세요!
      </SubTitle>
      <Posts>
        <PostsElm>
          {is_login && (
            <Link to="/postwrite" className="Link_PostWrtie">
              새 게시물 작성
            </Link>
          )}
        </PostsElm>
        {rendering()}
        <Button onClick={clickMore}>더보기</Button>
      </Posts>
      <hr></hr>
      <Title complete>완료된 플로깅</Title>
      <SubTitle>
        최근 진행되었던 플로깅입니다. 진행되었던 플로깅을 확인해보세요!
      </SubTitle>
      <Posts>
        {rendering_complete()}
        <Button onClick={clickMore_complete}>더보기</Button>
      </Posts>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          maskClosable={true}
          onClose={closeModal}
        ></Modal>
      )}
    </Body>
  );
};

export default PostList;

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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border: 2px solid #d3d3d3;
  border-radius: 35px;
  padding-top: 30px;
  padding-bottom: 30px;

  @media screen and (max-width: 900px) {
    width: 768px;
  }

  @media screen and (max-width: 768px) {
    width: 500px;
  }
`;

const Title = styled.span`
  text-align: center;
  margin-top: 10px;
  font-size: 40px;
  font-weight: 1000;
  color: ${(props) => (props.complete ? "#da590f" : "#3fc556")};
`;

const Button = styled.button`
  width: 100px;
  height: 30px;
  margin-top: 30px;
  background-color: #aaa69d;
  border: none;
  border-radius: 20px;
  font-weight: 800;
  font-size: 1rem;
  color: white;
  margin-left: 500px;
  margin-right: 500px;
  padding-bottom: 5px;
  box-shadow: 0 4px 5px -1px #464441;
  cursor: pointer;
  &:hover {
    background-color: #84817a;
    color: white;
    padding-bottom: 0px;
  }

  @media screen and (max-width: 900px) {
    margin-left: 200px;
    margin-right: 200px;
  }

  @media screen and (max-width: 768px) {
    margin-left: 100px;
    margin-right: 100px;
  }
`;

const PostsElm = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const SubTitle = styled.span`
  color: #7a7977;
  margin: 10px;
  width: 600px;
  font-weight: 600;
  font-size: 14px;
`;

const Sort = styled.span`
  font-weight: 1000;
  font-size: 18px;
  text-decoration: none;
  margin-left: 60px;
  color: #9e6727;
`;
