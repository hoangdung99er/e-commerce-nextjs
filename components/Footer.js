import styled from "styled-components";
import {
  Facebook,
  Instagram,
  Twitter,
  Pinterest,
  GitHub,
  Room,
  Phone,
  Mail,
} from "@material-ui/icons";
import { Mobile, Tablet } from "../Reponsive";

function Footer() {
  return (
    <Container>
      <Left>
        <Logo>Rex E-Commerce</Logo>
        <Desc>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis quia
          laborum voluptatem velit consectetur asperiores similique,
          reprehenderit officiis soluta minima natus, beatae voluptates saepe
          aperiam.
        </Desc>
        <SocialContainer>
          <SocialIcon color="385999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="e4405f">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55acee">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="e60023">
            <Pinterest />
          </SocialIcon>
          <SocialIcon color="4078c0">
            <GitHub />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Assessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room /> 13/ 14 Kp6 , P13, Tam Hiep
        </ContactItem>
        <ContactItem>
          <Phone />
          +84 777 003 524
        </ContactItem>
        <ContactItem>
          <Mail /> hoangdung99er@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
}

export default Footer;

const Container = styled.div`
  display: flex;
  ${Mobile({
    flexDirection: "column",
  })}
  ${Tablet({
    flexDirection: "column",
  })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${Mobile({
    display: "none",
  })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  word-wrap: normal;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${Mobile({
    backgroundColor: "#eee",
  })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;
