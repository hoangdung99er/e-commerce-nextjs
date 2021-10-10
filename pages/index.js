import styled from "styled-components";
import React from "react";
import Head from "next/head";
import {
  Announcement,
  Header,
  Slider,
  Categories,
  Products,
  Newletter,
  Footer,
  BackDrop,
} from "../components";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { useRequestApi } from "../store/lib/useRequest";
import { user as userAction } from "../store/reducers/user";

function Home({ tokenCookie, decodedSwr }) {
  const { data, error } = useRequestApi("/product/all");

  if (error) return <h1>Something went wrong!</h1>;
  if (!data) return <BackDrop data={data} />;
  return (
    <Container>
      <Head>
        <title>Rex E-Commerce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Announcement />
      <Header tokenCookie={tokenCookie} decodedSwr={decodedSwr} />
      <Slider />
      <Categories />
      <Products
        filters={{}}
        products={data}
        tokenCookie={tokenCookie}
        decodedSwr={decodedSwr}
      />
      <Newletter />
      <Footer />
    </Container>
  );
}

export default React.memo(Home);

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

export async function getServerSideProps(context) {
  const tokenCookie = context?.req?.cookies.token;
  const decoded = tokenCookie && (await jwt_decode(tokenCookie));

  return {
    props: {
      tokenCookie: tokenCookie || null,
      decodedSwr: decoded || null,
    },
  };
}
