import React from "react";
import { Box } from "@mui/material";

// Local dependencies
import qrImage from "../asset/qr.png";
import CenterBox from "../components/centerBox";
import { useNavigate } from "react-router-dom";
import PaddedBox from "../components/paddedBox";

const QR = () => {
  const navigate = useNavigate();

  return (
    <>
      <PaddedBox sx={{ cursor: "pointer" }}>
        <span onClick={() => navigate("/home")}>← Go Back</span>
      </PaddedBox>
      <CenterBox>
        <Box sx={{ width: "300px", margin: "0 auto", boxShadow: "0 0 20px black" }}>
          <img width="300px" src={qrImage} />
        </Box>
        <h2 style={{ textAlign: "center" }}>Scan to Pay</h2>
      </CenterBox>
    </>
  );
};

export default QR;
