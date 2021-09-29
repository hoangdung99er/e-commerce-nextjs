import styled from "styled-components";
import Head from "next/head";
import { Header } from "../components";
import jwt_decode from "jwt-decode";
import ProductsAdmin from "../components/Admin/Products";
import EditProductAdmin from "../components/Admin/EditProduct";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { onGetAllProduct } from "../store/actions/productAction";

function Admin({ tokenCookie, decodedSwr }) {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [pid, setPId] = useState(null);

  const fetchProduct = useCallback(async () => {
    const products = await dispatch(onGetAllProduct());
    setProducts(products);
  }, [dispatch]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct, pid]);

  const handleId = (id) => {
    setPId(id);
  };

  return (
    <Container>
      <Head>
        <title>Rex's Admin Center</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header tokenCookie={tokenCookie} decodedSwr={decodedSwr} />
      <ProductsAdmin
        products={products}
        handleId={handleId}
        tokenCookie={tokenCookie}
        setProducts={setProducts}
      />
      {pid && (
        <EditProductAdmin
          pid={pid}
          products={products}
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
