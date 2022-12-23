import React from "react";
import { Link } from "react-router-dom";
import CenterBox from "../components/centerBox";
import ContainedButton from "../components/containedButton";
import GapStack from "../components/gapStack";

const EnrollMethod = () => {
  return (
    <CenterBox>
      <GapStack>
        <h2>Choose Your Payment Method →</h2>
        <ContainedButton component={Link} to="/thanks/true">
          Manual
        </ContainedButton>
        <ContainedButton component={Link} to="/enroll/mandate">
          e-Mandate
        </ContainedButton>
      </GapStack>
    </CenterBox>
  );
};

export default EnrollMethod;
