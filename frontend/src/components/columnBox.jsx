import React from "react";
import { Box } from "@mui/material";

const ColumnBox = ({ children }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      {children}
    </Box>
  );
};

export default ColumnBox;
