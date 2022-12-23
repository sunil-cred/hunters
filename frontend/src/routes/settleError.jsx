// External dependencies
import { Alert, AlertTitle } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

// Local dependencies
import CenterBox from "../components/centerBox";
import ContainedButton from "../components/containedButton";
import GapStack from "../components/gapStack";

const SettleError = () => {
  return (
    <CenterBox>
      <GapStack>
        <Alert severity="error">
          <AlertTitle>sorry, your account could not be settled</AlertTitle>
          your bank will contact you shortly
        </Alert>
        <ContainedButton component={Link} to="/home">
          go back home
        </ContainedButton>
      </GapStack>
    </CenterBox>
  );
};

export default SettleError;
