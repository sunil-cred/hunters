// External dependencies
import React, { useEffect } from "react";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

// Local dependencies
import CenterBox from "../components/centerBox";
import successImage from "../asset/success.png";

export async function loader({ params: { skip } }) {
  return skip === "true";
}

const Thanks = () => {
  const skip = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate(skip ? "/home" : "/welcome"), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CenterBox>
      <Box sx={{ textAlign: "center" }}>
        <img width="100px" src={successImage} />
        <h2>Thanks for your submission</h2>
        <h4>We will get back to you shortly.</h4>
      </Box>
    </CenterBox>
  );
};

export default Thanks;
