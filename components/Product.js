import { FavoriteBorderOutlined, SearchOutlined } from "@material-ui/icons";
import { Mobile } from "../Reponsive";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAddFavoriteProduct } from "../store/actions/productAction";
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from "../store/actions/authAction";
import { user } from "../store/reducers/user";

function Product({ item, tokenCookie, decodedSwr }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const { currentUser, favOfUser } = useSelector(user);
  const handleAddFavorite = (pid) => {
    if (favOfUser?.some(({ _id }) => _id === pid)) {
      dispatch(removeFavoriteProduct(pid));
    } else {
      dispatch(addFavoriteProduct(item));
    }
    dispatch(onAddFavoriteProduct(pid, tokenCookie));
  };

  const checkFavorite = (pid) => {
    return favOfUser?.some(({ _id }) => _id === pid);
  };

  return (
    <Container>
      <Circle />
      <Image src={item.img} alt="" />
      <Info>
        <Icon onClick={() => router.push(`/product/${item._id}`)}>
          <SearchOutlined />
        </Icon>
        {tokenCookie && !decodedSwr?.isAdmin && (
          <Icon onClick={() => setIsFavorite((prev) => !prev)}>
            <FavoriteBorderOutlined
              color={checkFavorite(item._id) ? "error" : "inherit"}
              onClick={() => handleAddFavorite(item._id)}
            />
          </Icon>
        )}
      </Info>
    </Container>
  );
}

export default Product;

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
  ${Mobile({
    width: "100%",
  })}
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  cursor: pointer;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
