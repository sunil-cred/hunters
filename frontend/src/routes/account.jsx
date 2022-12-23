// External dependencies
import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

// Local dependencies
import CenterBox from "../components/centerBox";
import ContainedButton from "../components/containedButton";
import GapStack from "../components/gapStack";

export async function loader({ params: { accountId } }) {
  const response = { accountId };
  if (accountId === "pemdas") return { ...response, disabled: true };
  return { ...response, disabled: false };
}

const Account = () => {
  const { accountId, disabled } = useLoaderData();
  const navigate = useNavigate();

  return (
    <CenterBox>
      <GapStack>
        <h2>Choose a Plan →</h2>
        <ContainedButton disabled={disabled} onClick={() => navigate("/qr")}>
          Early Pay
        </ContainedButton>
        <ContainedButton component={Link} to={`/enroll/${accountId}/one`}>
          One Time ReFin Plan
        </ContainedButton>
        <ContainedButton component={Link} to={`/enroll/${accountId}/recurring`}>
          Recurring ReFin Plan
        </ContainedButton>
        <ContainedButton component={Link} to={`/settle/${accountId}`}>
          ReFin Settlement Plan
        </ContainedButton>
      </GapStack>
    </CenterBox>
  );
};

export default Account;
