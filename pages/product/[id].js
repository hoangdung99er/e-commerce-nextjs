import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { Header, Announcement, Newletter, Footer } from "../../components";
import { Mobile, Tablet } from "../../Reponsive";
import React, { useState } from "react";
import Head from "next/head";
import jwt_decode from "jwt-decode";
import callApi from "../../store/lib/apiCall";
import { useDispatch } from "react-redux";
import { onAddCart } from "../../store/actions/cartAction";

function ProductDetail({ tokenCookie, decodedSwr, product }) {
  const newColor = product?.color?.split(",");
  const [colorPick, setColorPick] = useState(newColor[0]);
  const dispatch = useDispatch();
  const newSize = product?.size?.split(",");
  const [sizePick, setSizePick] = useState(newSize[0]);
  const [sizePickFlag, setSizePickFlag] = useState(newSize[0]);
  const [quantity, setQuantity] = useState(1);

  const [newProduct, setNewProduct] = useState({
    id: `${product?._id}-${colorPick}-${sizePick}`,
    title: product?.title,
    desc: product?.desc,
    img: product?.img,
    categories: product?.categories,
    color: colorPick,
    size: sizePick,
    price: product?.price,
  });

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleRemove = () => {
    if (quantity <= 1) return setQuantity(1);
    setQuantity((prev) => prev - 1);
  };

  const handleChange = (e) => {
    setSizePickFlag(e.target.value);
    setNewProduct({
      ...newProduct,
      color: colorPick,
      id: `${product?._id}-${colorPick}-${e.target.value}`,
      [e.target.name]: e.target.value,
    });
  };

  const handleColor = (color) => {
    setColorPick(color);
    setNewProduct((prev) => {
      return {
        ...prev,
        color: color,
        id: `${product?._id}-${color}-${sizePickFlag}`,
      };
    });
  };

  const handleAddCart = () => {
    dispatch(
      onAddCart(newProduct, quantity, newProduct.id, product?.price * quantity)
    );
  };

  return (
    <>
      <Head>
        <title>{product?.title}</title>
      </Head>
      <Announcement />
      <Header tokenCookie={tokenCookie} decodedSwr={decodedSwr} />
      <Wrapper>
        <ImgContainer>
          <Image
            src="https://www.transparentpng.com/thumb/clothes/KaU7ZT-blue-women-dress-clothes-hd-image.png"
            alt=""
          />
        </ImgContainer>
        <InfoContainer>
          <Title>{product?.title}</Title>
          <Desc>{product?.desc}</Desc>
          <Price>$ {product?.price}</Price>
          {product?.categories?.map((cate, i) => (
            <Category key={i}>{cate.split(",").join(" ")}</Category>
          ))}
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {newColor?.map((color, i) => (
                <FilterColor
                  key={i}
                  className={`${color.toLowerCase() === colorPick && "active"}`}
                  color={color?.toLowerCase()}
                  value={color?.toLowerCase()}
                  name="color"
                  onClick={() => handleColor(color.toLowerCase())}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize name="size" onChange={handleChange}>
                {newSize?.map((size, i) => (
                  <FilterSizeOption value={size} key={i}>
                    {size}
                  </FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIconCustom onClick={handleRemove} />
              <Amount>{quantity}</Amount>
              <AddIconCustom onClick={handleAdd} />
            </AmountContainer>
            {tokenCookie && !decodedSwr.isAdmin && (
              <Button onClick={handleAddCart}>Add to Cart</Button>
            )}
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newletter />
      <Footer />
    </>
  );
}

export default React.memo(ProductDetail);

export async function getServerSideProps(context) {
  const tokenCookie = context?.req?.cookies.token;
  const {
    query: { id },
  } = context;
  const decoded = tokenCookie && (await jwt_decode(tokenCookie));
  let product;
  try {
    product = await callApi(`product/single/${id}`);
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      tokenCookie: tokenCookie || null,
      decodedSwr: decoded || null,
      product,
    },
  };
}

const RemoveIconCustom = styled(Remove)`
  cursor: pointer;
`;

const AddIconCustom = styled(Add)`
  cursor: pointer;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${Tablet({
    padding: "10px",
    flexDirection: "column",
  })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${Mobile({
    height: "50vh",
  })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${Mobile({
    padding: "10px",
  })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  ${Mobile({
    width: "100%",
  })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;

  &.active {
    border: 2px solid gray;
  }
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  ${Mobile({
    width: "100%",
  })}
`;

const Category = styled.div`
  color: blue;
  font-style: italic;
  font-size: 15px;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  outline: none;
  font-weight: 500;

  &:hover {
    background-color: lightgray;
  }
`;
