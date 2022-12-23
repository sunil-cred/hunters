// External dependencies
import React from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

// Local dependencies
// External dependencies
import { Box } from "@mui/system";

// Local dependencies
import ContainedButton from "./components/containedButton";
import CenterBox from "./components/centerBox";
import logo from "./asset/logo.jpg";

const Root = () => {
  return (
    <CenterBox
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Box>
        <h1 style={{ textAlign: "center" }}>Save money on EMIs</h1>
        <img width="100%" src={logo} alt="refin logo" />
      </Box>
      <ContainedButton component={Link} to="/carousel">
        Get Started →
      </ContainedButton>
    </CenterBox>
  );
};

export default Root;
