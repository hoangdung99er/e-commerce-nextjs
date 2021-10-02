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
import { useState } from "react";
import { useRouter } from "next/router";

function ProductLists() {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const router = useRouter();
  const { category } = router.query || null;

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, [e.target.name]: value });
  };

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
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option value="white">White</Option>
            <Option value="black">Black</Option>
            <Option value="red">Red</Option>
            <Option value="blue">Blue</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="green">Green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option value="XS">XS</Option>
            <Option value="S">S</Option>
            <Option value="M">M</Option>
            <Option value="L">L</Option>
            <Option value="XL">XL</Option>
            <Option value="XXL">XXL</Option>
          </Select>
          <FilterText>Sort Products</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} sort={sort} filters={filters} />
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
