import styled from "styled-components";
import {
  Header,
  Announcement,
  Products,
  Newletter,
  Footer,
} from "../components";
import Head from "next/head";
import { Mobile } from "../Reponsive";

function ProductLists() {
  return (
    <Container>
      <Head>
        <title>Product Lists</title>
      </Head>
      <Announcement />
      <Header />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products</FilterText>
          <Select>
            <Option disabled selected>
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
            <Option>Red Formula</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>XXL</Option>
          </Select>
          <FilterText>Sort Products</FilterText>
          <Select>
            <Option disabled selected>
              Newest
            </Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      <Newletter />
      <Footer />
    </Container>
  );
}

export default ProductLists;

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${Mobile({
    margin: "0 20px",
    flexDirection: "column",
    display: "flex",
    flex: 1,
  })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${Mobile({
    marginRight: "0",
  })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${Mobile({
    margin: "5px 0",
  })}
`;

const Option = styled.option``;
