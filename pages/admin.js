import styled from "styled-components";
import Head from "next/head";
import { Header, BackDrop } from "../components";
import jwt_decode from "jwt-decode";
import ProductsAdmin from "../components/Admin/Products";
import EditProductAdmin from "../components/Admin/EditProduct";
import React, { useState } from "react";
import { useRequestApi } from "../store/lib/useRequest";

function Admin({ tokenCookie, decodedSwr }) {
  const [pid, setPId] = useState(null);
  const { data, error } = useRequestApi("/product/all");

  const handleId = (id) => {
    setPId(id);
  };

  if (error) return <h1>Something went wrong...</h1>;
  if (!data) return <BackDrop data={data} />;

  return (
    <Container>
      <Head>
        <title>Rex's Admin Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header tokenCookie={tokenCookie} decodedSwr={decodedSwr} />
      <ProductsAdmin
        products={data}
        handleId={handleId}
        tokenCookie={tokenCookie}
      />
      {pid && (
        <EditProductAdmin
          pid={pid}
          products={data}
          setPId={setPId}
          tokenCookie={tokenCookie}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

export default React.memo(Admin);

export async function getServerSideProps(context) {
  const tokenCookie = context?.req?.cookies.token;
  const decoded = tokenCookie && (await jwt_decode(tokenCookie));

  if (!tokenCookie || !decoded?.isAdmin) {
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
      decodedSwr: decoded,
    },
  };
}
