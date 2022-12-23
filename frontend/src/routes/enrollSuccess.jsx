// External dependencies
import React, { useEffect } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Local dependencies
import CenterBox from "../components/centerBox";
import GapStack from "../components/gapStack";

const EnrollSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/home"), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CenterBox>
      <GapStack>
        <Alert>
          <AlertTitle>thanks for choosing your payment plan</AlertTitle>
          you will receive a confirmation shortly
        </Alert>
      </GapStack>
    </CenterBox>
  );
};

export default EnrollSuccess;
