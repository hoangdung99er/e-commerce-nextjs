import Head from "next/head";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import { onCreateProduct } from "../store/actions/productAction";
import styled from "styled-components";
import { Mobile } from "../Reponsive";
import { useState } from "react";
import jwt_decode from "jwt-decode";

function Create({ tokenCookie }) {
  const [product, setProduct] = useState({
    title: "",
    desc: "",
    img: "",
    categories: "",
    size: "",
    color: "",
    price: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();

  //Set value for state
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle Submit form login
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(onCreateProduct(product, router, tokenCookie));
  };

  return (
    <Container>
      <Head>
        <title>Create Product</title>
      </Head>
      <Wrapper>
        <Title>CREATE PRODUCT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Title"
            name="title"
            id="title"
            value={product.title}
            onChange={handleChange}
            type="text"
          />
          <Input
            placeholder="Description"
            name="desc"
            id="desc"
            value={product.desc}
            onChange={handleChange}
            type="text"
          />
          <Input
            placeholder="Image..."
            name="img"
            id="img"
            value={product.img}
            onChange={handleChange}
            type="text"
          />
          <Input
            placeholder="Categories"
            name="categories"
            id="categories"
            value={product.categories}
            onChange={handleChange}
            type="text"
          />
          <Input
            placeholder="Size"
            name="size"
            id="size"
            value={product.size}
            onChange={handleChange}
            type="text"
          />
          <Input
            placeholder="Color"
            name="color"
            id="color"
            value={product.color}
            onChange={handleChange}
            type="text"
          />
          <Input
            placeholder="Price"
            name="price"
            id="price"
            value={product.price}
            onChange={handleChange}
            type="number"
          />
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Create;

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
    },
  };
}
