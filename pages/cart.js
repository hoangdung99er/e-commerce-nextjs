import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { Header, Announcement, Footer } from "../components";
import { Mobile } from "../Reponsive";
import Head from "next/head";
import { useSelector } from "react-redux";
import { products, total, quantity } from "../store/reducers/cart";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

let SHIPPING_FEE = 2;

function Cart({ tokenCookie, decodedSwr }) {
  const productsAction = useSelector(products);
  const quantityAction = useSelector(quantity);
  const total_Cart = useSelector(total);
  const router = useRouter();
  const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN;

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios({
      method: "post",
      url: `${SERVER_DOMAIN}/stripe/payment`,
      data: { items: productsAction },
      headers: {
        Authorization: "Bearer " + process.env.NEXT_PUBLIC_STRIPE_PR_KEY,
      },
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  console.log(productsAction);
  return (
    <>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <Announcement />
      <Header tokenCookie={tokenCookie} decodedSwr={decodedSwr} />

      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => router.replace("/products")}>
            CONTINUE SHOPPING
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag({quantityAction})</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {productsAction.length > 0 ? (
              productsAction?.map(({ product, quantity }, i) => (
                <Product key={i}>
                  <ProductDetail>
                    <Image
                      src="https://www.transparentpng.com/thumb/clothes/KaU7ZT-blue-women-dress-clothes-hd-image.png"
                      alt=""
                    />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product.id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add />
                      <Amount>{quantity}</Amount>
                      <Remove />
                    </ProductAmountContainer>
                    <ProductPrice>$ {product.price}</ProductPrice>
                  </PriceDetail>
                </Product>
              ))
            ) : (
              <h1>Empty Cart</h1>
            )}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {total_Cart}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ {SHIPPING_FEE}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {total_Cart + SHIPPING_FEE}</SummaryItemPrice>
            </SummaryItem>
            {tokenCookie && (
              <Button
                onClick={createCheckoutSession}
                variant="contained"
                color="primary"
                fullWidth
              >
                CHECKOUT NOW
              </Button>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </>
  );
}

export default Cart;

export async function getServerSideProps(context) {
  const tokenCookie = context?.req?.cookies.token;
  const decoded = tokenCookie && (await jwt_decode(tokenCookie));

  return {
    props: {
      tokenCookie: tokenCookie || null,
      decodedSwr: decoded || null,
    },
  };
}

const Wrapper = styled.div`
  padding: 20px;
  ${Mobile({
    padding: "10px",
  })}
`;

const Title = styled.div`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && ""};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${Mobile({
    display: "none",
  })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${Mobile({
    flexDirection: "column",
  })}
`;

const Info = styled.div`
  flex: 3;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  min-height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const SummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  border: none;
  outline: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  &:not(:first-child) {
    border-top: 1px solid #eee;
  }
  ${Mobile({
    flexDirection: "column",
  })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ProductName = styled.span`
  flex: 1;
`;
const ProductId = styled.span`
  flex: 1;
`;
const ProductColor = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span`
  flex: 1;
`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const Amount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${Mobile({
    margin: "5px 15px",
  })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${Mobile({
    marginBottom: "20px",
  })}
`;
