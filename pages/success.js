import styled from "styled-components";
import Head from "next/head";
import { Success as SuccessComponent, Footer } from "../components";

function Success() {
  return (
    <Container>
      <Head>
        <title>Congratulation!</title>
      </Head>

      <SuccessComponent />
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  place-content: center;
`;

export default Success;
