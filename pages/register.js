import styled from "styled-components";
import Head from "next/head";

function Register() {
  return (
    <Container>
      <Head>
        <title>Register an account</title>
      </Head>
      <Wrapper>
        <Title>CREAT AN ACCOUNT</Title>
        <Form>
          <Input placeholder="Name" />
          <Input placeholder="Last Name" />
          <Input placeholder="Email" />
          <Input placeholder="Username" />
          <Input placeholder="Password" />
          <Input placeholder="Confirm Password" />
          <Agreement>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            <b>Dignissimos, sapiente!</b>
          </Agreement>
          <Button>Register</Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Register;

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

import { Mobile } from "../Reponsive";

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
  width: 40%;
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
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 50%;
  margin: 20px 10px 0 0;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  outline: none;
`;
