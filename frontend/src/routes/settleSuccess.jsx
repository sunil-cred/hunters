import { Alert, AlertTitle } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import CenterBox from "../components/centerBox";
import ContainedButton from "../components/containedButton";
import GapStack from "../components/gapStack";

const SettleSuccess = () => {
  return (
    <CenterBox>
      <GapStack>
        <Alert>
          <AlertTitle>congratulations!</AlertTitle>
          your settlement has been approved. you will shortly receive a settlement letter from your
          bank, and an sms with payment link.
        </Alert>
        <ContainedButton component={Link} to="/home">
          go back home
        </ContainedButton>
      </GapStack>
    </CenterBox>
  );
};

export default SettleSuccess;
