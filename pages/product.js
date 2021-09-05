import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { Header, Announcement, Newletter, Footer } from "../components";
import { Mobile } from "../Reponsive";

function ProductDetail() {
  return (
    <>
      <Announcement />
      <Header />
      <Wrapper>
        <ImgContainer>
          <Image
            src="https://www.transparentpng.com/thumb/clothes/KaU7ZT-blue-women-dress-clothes-hd-image.png"
            alt=""
          />
        </ImgContainer>
        <InfoContainer>
          <Title></Title>
          <Desc>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
            quisquam ea, amet accusamus accusantium distinctio eum debitis autem
            doloribus eius assumenda consequuntur soluta corrupti illo et
            veritatis quis laudantium perspiciatis!
          </Desc>
          <Price>$ 20</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>X</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
                <FilterSizeOption>XXL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove />
              <Amount>1</Amount>
              <Add />
            </AmountContainer>
            <Button>Add to Cart</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newletter />
      <Footer />
    </>
  );
}

export default ProductDetail;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${Mobile({
    padding: "10px",
    flexDirection: "column",
  })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${Mobile({
    height: "50vh",
  })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${Mobile({
    padding: "10px",
  })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  ${Mobile({
    width: "100%",
  })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;

  &:focus {
    border: 1px solid black;
  }
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  ${Mobile({
    width: "100%",
  })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  outline: none;
  font-weight: 500;

  &:hover {
    background-color: lightgray;
  }
`;
