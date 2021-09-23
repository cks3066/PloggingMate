import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Post = (props) => {
  const { post } = props;
  const { is_progress } = props;
  const yearMonth = post.reservedAt.split("-");
  const dayTime = yearMonth[2].split("T");
  const time = dayTime[1].split(":");
  const date = {
    year: yearMonth[0],
    month: yearMonth[1],
    day: dayTime[0],
    hour: time[0],
    minute: time[1],
  };
  return (
    <PostBody>
      <Link
        to={{
          pathname: `/postdetail/${post.postId}`,
          state: {
            post,
            date,
            is_progress,
          },
        }}
        className="Link_Post"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))," +
            "url(" +
            `${props.image_url}` +
            "/" +
            `${post.postId}` +
            ")",
        }}
      >
        {is_progress ? (
          <Top>
            <Participant>참가 {post.applyCount}/5</Participant>
            <Progress>진행중</Progress>
          </Top>
        ) : (
          <Expired>완료</Expired>
        )}
        <Content> {post.contents}</Content>
        <div>
          <Date>{post.parkName} </Date>
          <Date>
            {date.month}월 {date.day}일 {date.hour}시 {date.minute}분
          </Date>
        </div>
      </Link>
      <UserName>포스트에 등록된 작성자 아이디</UserName>
    </PostBody>
  );
};

Post.defaultProps = {
  image_url: "https://source.unsplash.com/random",
  is_progress: true,
};

const PostBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const Progress = styled.div`
  color: #fff0f0;
  background-color: #238d34;
  padding: 5px;
  border-radius: 15px;
  font-size: 12px;
  margin-top: 11px;
  margin-right: 11px;
  margin-left: 58px;
`;
const Expired = styled.div`
  color: #fff0f0;
  background-color: #da590f;
  padding: 5px;
  border-radius: 15px;
  font-size: 12px;
  margin-top: 11px;
  margin-right: 11px;
  align-self: flex-end;
`;
const Date = styled.div`
  color: #fff0f0;
  font-size: 12px;
  margin-bottom: 10px;
`;
const Content = styled.div`
  color: white;
  margin-top: -15px;
`;

const Participant = styled.div`
  color: #fff0f0;
  background-color: #5f5f5f;
  padding: 5px;
  border-radius: 15px;
  font-size: 12px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 60px;
`;

const UserName = styled.span`
  color: gray;
  font-weight: 1000;
  font-size: 12px;
  margin-top: 5px;
  cursor: pointer;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Post;
