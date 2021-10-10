import styled from "styled-components";
import { Product } from "../components";
import { useEffect, useCallback, useState } from "react";

function Products({
  category,
  filters,
  sort,
  products,
  tokenCookie,
  decodedSwr,
}) {
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    setFilterProducts(
      products?.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
    );
  }, [category, filters, products]);

  useEffect(() => {
    if (sort === "newest") {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilterProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilterProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <Container>
      {category
        ? filterProducts?.map((item) => (
            <Product
              item={item}
              key={item._id}
              tokenCookie={tokenCookie}
              decodedSwr={decodedSwr}
            />
          ))
        : products
            ?.slice(0, 7)
            .map((item) => (
              <Product
                item={item}
                key={item._id}
                tokenCookie={tokenCookie}
                decodedSwr={decodedSwr}
              />
            ))}
    </Container>
  );
}

export default Products;

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
