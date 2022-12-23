// External dependencies
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Local dependencies
import CenterBox from "../components/centerBox";
import errorImage from "../asset/error.png";

const Risk = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/carousel"), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CenterBox>
      <Box sx={{ textAlign: "center" }}>
        <img width="100px" src={errorImage} />
        <h2>Sorry, you are not eligible for refinance</h2>
      </Box>
    </CenterBox>
  );
};

export default Risk;
