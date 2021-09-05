import styled from "styled-components";

import Head from "next/head";
import {
  Announcement,
  Header,
  Slider,
  Categories,
  Products,
  Newletter,
  Footer,
} from "../components";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Rex E-Commerce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Announcement />
      <Header />
      <Slider />
      <Categories />
      <Products />
      <Newletter />
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
