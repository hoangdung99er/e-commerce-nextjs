import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export default function BackDrop({ data }) {
  return (
    <div>
      <Backdrop
        open={!!data}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
