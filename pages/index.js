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
import jwt_decode from "jwt-decode";
import { useRequestApi } from "../store/lib/useRequest";

export default function Home({ tokenCookie, decodedSwr }) {
  const { data, error } = useRequestApi("/product/all");

  if (error) return <h1>Something went wrong!</h1>;
  if (!data) return <h1>Loading...</h1>;
  console.log(error);
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
      <Products filters={{}} products={data} />
      <Newletter />
      <Footer />
    </Container>
  );
}

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
