import React from "react";
import { Button } from "@mui/material";
import { Mobile } from "../../Reponsive";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { onEditProduct } from "../../store/actions/productAction";
import { mutate } from "swr";
import {
  TextField,
  Input as InputMui,
  CircularProgress,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import { PhotoCamera, SendOutlined } from "@material-ui/icons";
import UploadImageHandle from "../../shared/UploadImage";
import { products as productsReducer } from "../../store/reducers/products";

function EditProduct({ products, pid, tokenCookie, setPId }) {
  const [product, setProduct] = useState({
    title: "",
    desc: "",
    categories: "",
    size: "",
    color: "",
    price: 0,
  });
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const { isLoading, uploadImage } = UploadImageHandle();
  const { isFetching } = useSelector(productsReducer);

  //Set value for state
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle Submit edit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    mutate(
      "http://localhost:3000/api/product/all",
      [...products, product],
      false
    );

    await dispatch(onEditProduct(product, pid, tokenCookie));

    mutate("http://localhost:3000/api/product/all");

    setProduct("");
    setPId(null);
  };

  useEffect(() => {
    setProduct(products.find((product) => product._id === pid));
  }, [pid]);

  const handleSubmitImage = (e) => {
    e.preventDefault();

    uploadImage({ file: file, label: "img" }, setProduct);
  };

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
            type="text"
          />
          <TextField
            InputProps={{
              readOnly: true,
            }}
            id="read-only-image"
            value={product?.img}
          />
          {file && (
            <WrapperReviewImage>
              <Image
                src={URL.createObjectURL(file)}
                width={200}
                height={200}
                layout="fixed"
                alt="product image"
              />
              <Button
                onClick={handleSubmitImage}
                variant="contained"
                endIcon={!isLoading && <SendOutlined />}
              >
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  "Send"
                )}
              </Button>
            </WrapperReviewImage>
          )}
          <label htmlFor="icon-button-file">
            <InputMui
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
              id="icon-button-file"
              type="file"
              sx={{ display: "none" }}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
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
            {isFetching ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Edit"
            )}
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default React.memo(EditProduct);

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
  width: 50%;
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

const WrapperReviewImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
