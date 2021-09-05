import styled from "styled-components";

function Announcement() {
  return (
    <Container>
      Super Deal!Sell 50% discount of the first time paying.
    </Container>
  );
}

export default Announcement;

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 14px;
  width: 100%;
`;
