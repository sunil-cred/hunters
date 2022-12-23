import React from "react";
import { Stack } from "@mui/material";

const GapStack = ({ children }) => {
  return <Stack sx={{ gap: "16px" }}>{children}</Stack>;
};

export default GapStack;
