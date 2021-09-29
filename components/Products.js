import styled from "styled-components";
import { Product } from "../components";
import { useEffect, useCallback, useState } from "react";
import { onGetAllProduct } from "../store/actions/productAction";
import { useDispatch } from "react-redux";

function Products() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const fetchProduct = useCallback(async () => {
    const data = await dispatch(onGetAllProduct());
    setProducts(data);
  }, [dispatch]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <Container>
      {products?.map((item) => (
        <Product item={item} key={item._id} />
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
