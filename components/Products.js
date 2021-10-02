import styled from "styled-components";
import { Product } from "../components";
import { useEffect, useCallback, useState } from "react";
import { onGetAllProduct } from "../store/actions/productAction";
import { useDispatch } from "react-redux";

function Products({ category, filters, sort, products }) {
  const dispatch = useDispatch();
  // const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);

  // const fetchProduct = useCallback(async () => {
  //   const data = await dispatch(onGetAllProduct(category));
  //   setProducts(data);
  // }, [dispatch, category]);

  // useEffect(() => {
  //   fetchProduct();
  // }, [fetchProduct]);

  useEffect(() => {
    setFilterProducts(
      products.filter((item) =>
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
        ? filterProducts?.map((item) => <Product item={item} key={item._id} />)
        : products
            ?.slice(0, 7)
            .map((item) => <Product item={item} key={item._id} />)}
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
