import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { Mobile, Tablet } from "../Reponsive";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { cart } from "../store/reducers/cart";
import { useSelector } from "react-redux";

function Header({ tokenCookie, decodedSwr }) {
  const router = useRouter();
  const handleLogout = () => {
    cookie.remove("token");
    router.push("/login");
  };
  const cartAction = useSelector(cart);

  console.log(cartAction);

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
            {tokenCookie ? (
              <>
                {decodedSwr?.isAdmin ? (
                  <MenuItem onClick={() => router.push("/admin")}>
                    ADMIN PANEL
                  </MenuItem>
                ) : (
                  <MenuItem onClick={() => router.push("/cart")}>
                    <Badge badgeContent={4} color="primary">
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

export default Header;

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
