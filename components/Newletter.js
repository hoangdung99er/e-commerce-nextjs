import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { Mobile } from "../Reponsive";

function Newletter() {
  return (
    <Container>
      <Title>Newletter</Title>
      <Description>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit sit
        cupiditate totam, sapiente laborum voluptate veritatis. Culpa debitis
        voluptatibus placeat!
      </Description>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
}

export default Newletter;

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: calc(100vw - 55px);
  margin: 0 auto;
`;
const Title = styled.h1`
  font-size: 70px;
  ${Mobile({
    fontSize: "45px",
  })}
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  text-align: center;
  max-width: 1000px;
  ${Mobile({
    fontSize: "18px",
  })}
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  border-radius: 4px 0 0 4px;
  ${Mobile({
    width: "80%",
  })}
`;
const Input = styled.input`
  flex-grow: 1;
  border: none;
  padding-left: 20px;
  border-radius: inherit;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  outline: none;
  background-color: teal;
  color: white;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
`;
