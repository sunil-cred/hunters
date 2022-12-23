// External dependenciess
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

// Local dependencies
import CenterBox from "../components/centerBox";
import logo from "../asset/logoSmall.png";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/home"), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CenterBox>
      <Box sx={{ textAlign: "center" }}>
        <h2>Welcome to</h2>
        <img src={logo} />
      </Box>
    </CenterBox>
  );
};

export default Welcome;
