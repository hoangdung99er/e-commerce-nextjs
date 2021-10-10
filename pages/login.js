import styled from "styled-components";
import Head from "next/head";
import { Mobile } from "../Reponsive";
import { useState } from "react";
import Link from "next/link";
import { onSignIn } from "../store/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { user as userAction } from "../store/reducers/user";
import { CircularProgress, Alert } from "@mui/material";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();
  const { isFetching, error, currentUser, success } = useSelector(userAction);

  //Set value for state
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle Submit form login
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(onSignIn(user, router));
  };

  return (
    <Container>
      <Head>
        <title>SIGN IN</title>
      </Head>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Username"
            name="username"
            id="username"
            value={user.username}
            onChange={handleChange}
            type="text"
          />
          <Input
            placeholder="Password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
            type="password"
          />
          {error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>{success && <Alert severity="success">Success login!</Alert>}</>
          )}
          <CustomButton variant="contained" disabled={isFetching} type="submit">
            {isFetching ? <CircularProgress size={20} /> : "Login"}
          </CustomButton>
          <LinkRef href="/">Remember the password?</LinkRef>
          <LinkRef href="/register">Create a new account</LinkRef>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Login;

export async function getServerSideProps(context) {
  const tokenCookie = context?.req?.cookies.token;

  if (tokenCookie) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      tokenCookie: tokenCookie || null,
    },
  };
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/8356406/pexels-photo-8356406.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")
      center no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 25%;
  background-color: white;
  ${Mobile({
    width: "75%",
  })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40px;
  margin: 10px 0;
  padding: 10px;
`;

const CustomButton = styled(Button)`
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const LinkRef = styled(Link)`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
