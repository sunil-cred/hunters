// External dependencies
import { Button } from "@mui/material";
import React from "react";

const ContainedButton = ({ children, sx, ...rest }) => {
  return (
    <Button
      variant="contained"
      sx={{
        fontWeight: "bold",
        backgroundColor: "#0047FF",
        borderRadius: "16px",
        paddingTop: "16px",
        paddingBottom: "16px",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#0047FF",
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ContainedButton;
