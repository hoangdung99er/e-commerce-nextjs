import styled from "styled-components";
import {
  Search,
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import {
  Badge,
  IconButton,
  Popover,
  Typography,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import { Mobile, Tablet } from "../Reponsive";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { quantity } from "../store/reducers/cart";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { clearError } from "../store/actions/authAction";
import { user } from "../store/reducers/user";

function Header({ tokenCookie, decodedSwr }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const quantityAction = useSelector(quantity);
  const [anchorEl, setAnchorEl] = useState(null);
  const { favOfUser } = useSelector(user);

  const handleLogout = () => {
    cookie.remove("token");
    router.push("/login");
    dispatch(clearError());
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Container>
        <Wrapper>
          {!decodedSwr?.isAdmin && (
            <Left>
              <Language>EN</Language>
              <SearchContainer>
                <Input placeholder="Search" />
                <Search style={{ color: "gray", fontSize: 16 }} />
              </SearchContainer>
            </Left>
          )}
          <Center>
            <Logo onClick={() => router.push("/")}>
              {decodedSwr?.isAdmin ? "Rex's Admin" : "Rex"}
            </Logo>
          </Center>
          <Right>
            {tokenCookie && !decodedSwr?.isAdmin && (
              <>
                <IconButton
                  aria-describedby={id}
                  onClick={handleClick}
                  aria-label="favorite"
                  color="primary"
                >
                  <FavoriteBorderOutlined />
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  sx={{ overflowX: "auto" }}
                >
                  {favOfUser?.length > 0 ? (
                    favOfUser?.map((product) => (
                      <Stack
                        sx={{
                          height: 100,
                          "&:hover": {
                            backgroundColor: "lightgray",
                            cursor: "pointer",
                          },
                        }}
                        key={product._id}
                        justifyContent="center"
                        alignItems="center"
                        direction="row"
                        spacing={2}
                        onClick={() => router.push(`/product/${product._id}`)}
                      >
                        <Avatar
                          alt={product.title}
                          src={product.img}
                          sx={{ width: 50, height: 50, ml: 1 }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <Typography variant="body1">
                            {product.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontStyle: "italic" }}
                          >
                            {product.categories.map((cate) => cate)}
                          </Typography>
                        </Box>
                      </Stack>
                    ))
                  ) : (
                    <Typography>No product of your favorite</Typography>
                  )}
                </Popover>
              </>
            )}
            {tokenCookie ? (
              <>
                {decodedSwr?.isAdmin ? (
                  <MenuItem onClick={() => router.push("/admin")}>
                    ADMIN PANEL
                  </MenuItem>
                ) : (
                  <MenuItem onClick={() => router.push("/cart")}>
                    <Badge badgeContent={quantityAction} color="primary">
                      <ShoppingCartOutlined />
                    </Badge>
                  </MenuItem>
                )}

                <MenuItem onClick={handleLogout}>LOG OUT</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={() => router.push("/register")}>
                  REGISTER
                </MenuItem>
                <MenuItem onClick={() => router.push("/login")}>
                  SIGN IN
                </MenuItem>
              </>
            )}
          </Right>
        </Wrapper>
      </Container>
    </div>
  );
}

export default React.memo(Header);

const Container = styled.div`
  height: 60px;

  ${Mobile({
    height: "50px",
  })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${Mobile({
    padding: "10px 0",
  })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${Mobile({
    width: "50px",
  })}
  ${Tablet({
    width: "60px",
  })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${Mobile({
    display: "none",
  })}
  ${Tablet({
    display: "none",
  })}
`;

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${Mobile({
    marginLeft: "25px",
  })}
  ${Tablet({
    marginLeft: "0",
  })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  word-wrap: unset;
  ${Mobile({
    width: "24px",
    marginLeft: "10px",
  })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${Mobile({
    justifyContent: "center",
    flex: 2,
  })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 2rem;
  ${Mobile({
    fontSize: "12px",
    marginLeft: "10px",
  })}
`;
