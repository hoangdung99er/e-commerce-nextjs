import React from "react";
import { Button } from "@mui/material";
import styled from "styled-components";
import { useRouter } from "next/router";

function Success() {
  const router = useRouter();
  return (
    <SuccessContainer>
      <SuccessTitle>
        Congratulation! Your order to be successful, we will contact you later.
      </SuccessTitle>
      <Button
        variant="contain"
        color="success"
        onClick={() => router.push("/")}
      >
        Back to Home
      </Button>
    </SuccessContainer>
  );
}

export default Success;

const SuccessTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

const SuccessContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
`;
