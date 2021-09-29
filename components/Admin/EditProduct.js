import React from "react";
import { Button } from "@mui/material";
import { Mobile } from "../../Reponsive";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { onEditProduct } from "../../store/actions/productAction";

function EditProduct({ products, pid, tokenCookie, setPId }) {
  const [product, setProduct] = useState({
    title: "",
    desc: "",
    img: "",
    categories: "",
    size: "",
    color: "",
    price: "",
  });
  const dispatch = useDispatch();

  //Set value for state
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle Submit form login
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(onEditProduct(product, pid, tokenCookie));

    setProduct("");
    setPId(null);
  };

  useEffect(() => {
    setProduct(products.find((product) => product._id === pid));
  }, [pid]);

  return (
    <Container>
      <Wrapper>
        <Title>EDIT PRODUCT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Title"
            name="title"
            id="title"
            value={product?.title}
            onChange={handleChange}
            type="text"
          />
          <Input
            placeholder="Description"
            name="desc"
            id="desc"
            value={product?.desc}
            onChange={handleChange}
            type="text"
          />
          <Input
            placeholder="Image..."
            name="img"
            id="img"
            value={product?.img}
            onChange={handleChange}
            type="text"
          />
          <Input
            placeholder="Categories"
            name="categories"
            id="categories"
            value={product?.categories}
            onChange={handleChange}
            type="text"
          />
          <Input
            placeholder="Size"
            name="size"
            id="size"
            value={product?.size}
            onChange={handleChange}
            type="text"
          />
          <Input
            placeholder="Color"
            name="color"
            id="color"
            value={product?.color}
            onChange={handleChange}
            type="text"
          />
          <Input
            placeholder="Price"
            name="price"
            id="price"
            value={product?.price}
            onChange={handleChange}
            type="number"
          />
          <Button type="submit" variant="contained">
            Edit
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default EditProduct;

const Container = styled.div`
  width: 100%;
  height: 500px;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
