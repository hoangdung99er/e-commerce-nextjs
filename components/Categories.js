import styled from "styled-components";
import { CategoryItem } from "./";
import { categories } from "../fakeData";
import { Mobile } from "../Reponsive";

function Categories() {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem key={item.id} item={item} />
      ))}
    </Container>
  );
}

export default Categories;

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${Mobile({
    padding: "0",
    flexDirection: "column",
    marginTop: "1.5rem",
  })}
`;
