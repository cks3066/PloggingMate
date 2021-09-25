import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const is_login = useSelector((state) => state.user.is_login);

  if (is_login) history.goBack();
  return (
    <Body>
      {!is_login && (
        <Card>
          <Logo>
            <Img src={require("../img/logo.png").default} alt="logo" />
            <LogoText> 로그인</LogoText>
          </Logo>
          <Form
            onSubmit={(e) => {
              e.preventDefault();

              dispatch(userActions.login(id, pwd, history));
            }}
          >
            <Input
              required
              type="email"
              placeholder="아이디를 입력해주세요."
              onChange={(e) => {
                e.target.style.backgroundColor = "#e3f0e4";
                if (e.target.value === "")
                  e.target.style.backgroundColor = "white";
                setId(e.target.value);
              }}
              onFocus={(e) => {
                e.target.placeholder = "";
              }}
              onBlur={(e) => {
                e.target.placeholder = "아이디를 입력해주세요.";
              }}
            />
            <Input
              required
              type="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={(e) => {
                e.target.style.backgroundColor = "#e3f0e4";
                if (e.target.value === "")
                  e.target.style.backgroundColor = "white";
                setPwd(e.target.value);
              }}
              onFocus={(e) => {
                e.target.placeholder = "";
              }}
              onBlur={(e) => {
                e.target.placeholder = "비밀번호를 입력해주세요.";
              }}
            />

            <Button>로그인</Button>
            <ETC>
              <Link to="/signup" className="Link_Login">
                <Forgot>아이디/비밀번호 찾기</Forgot>
              </Link>
              <Link to="/signup" className="Link_Login">
                <Signup>회원가입</Signup>
              </Link>
            </ETC>
          </Form>
        </Card>
      )}
    </Body>
  );
};

export default withRouter(Login);
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 60px;
  max-width: 1200px;
`;

const Form = styled.form`
  font-family: "Nanum Gothic", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Card = styled.div`
  border-radius: 10px;
  border: 2px solid #d3d3d3;
  margin-top: 60px;
  margin-bottom: 60px;
  margin-left: 40px;
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    margin: 20px;
  }
`;

const Logo = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
`;

const LogoText = styled.h3`
  font-weight: 1000;
  color: #3fc556;
  font-size: 2rem;
  padding-right: 20px;
`;

const Input = styled.input`
  box-sizing: border-box;
  display: block;
  height: 40px;
  width: 300px;
  margin-bottom: 20px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #838080;
  font-size: 15px;

  &:focus {
    outline: none;
    border: 3px solid #89db96;
  }
`;

const Img = styled.img`
  margin-top: 5px;
  padding: 0px;
  width: 50px;
  height: 80px;
  object-fit: cover;
`;

const Button = styled.button`
  border-radius: 15px;
  width: 60%;
  height: 35px;
  border: 1px solid #9e6727;
  background-color: #9e6727;
  font-weight: 1000;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  padding-bottom: 7px;
  box-shadow: 0 3px 5px -1px #464441;
  &:hover {
    background-color: #6b481f;
    color: white;
    padding-bottom: 0px;
    border-bottom: 4px solid #3b2811;
  }
`;

const ETC = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 25px;
  font-size: 14px;
  color: #838080;
  font-weight: 600;
`;

const Signup = styled.div`
  cursor: pointer;
  text-decoration: none;
  padding: 1px;
  border-bottom: #838080 solid 1px;
  &:hover {
    color: black;
    font-weight: 700;
  }
`;

const Forgot = styled.div`
  cursor: pointer;
  text-decoration: none;
  padding: 1px;
  border-bottom: #838080 solid 1px;
  &:hover {
    color: black;
    font-weight: 700;
  }
`;
