// External dependencies
import { Stack } from "@mui/material";
import React, { useState } from "react";
import { redirect } from "react-router-dom";

// Local dependencies
import CenterBox from "../components/centerBox";
import ColumnBox from "../components/columnBox";
import ContainedButton from "../components/containedButton";
import FormWidget from "../components/formWidget";
import GapStack from "../components/gapStack";
import InputField from "../components/inputField";
import formatter from "../lib/formatter";

export async function action() {
  return redirect("/thanks/true");
}

const Mandate = () => {
  const [values, setValues] = useState({});

  return (
    <CenterBox>
      <h2>Setup e-Mandate</h2>
      <FormWidget>
        <GapStack>
          <ColumnBox>
            <h4>Start Date</h4>
            <InputField disabled defaultValue="05/01/2023" />
          </ColumnBox>
          <ColumnBox>
            <h4>Tenure</h4>
            <InputField disabled defaultValue="12 months" />
          </ColumnBox>
          <ColumnBox>
            <h4>EMI Amount</h4>
            <InputField disabled defaultValue={formatter.format(2533)} />
          </ColumnBox>
          <Stack>
            <h4>Account Number</h4>
            <InputField
              name="accountNumber"
              type="number"
              placeholder="Enter account number"
              value={values["accountNumber"] || ""}
              onChange={(value) => setValues({ ...values, accountNumber: value })}
            />
            <h4>IFSC Code</h4>
            <InputField
              name="ifscCode"
              placeholder="Enter IFSC code"
              value={values["ifscCode"] || ""}
              onChange={(value) => setValues({ ...values, ifscCode: value })}
            />
            <h4>Account Holder Name</h4>
            <InputField
              name="holderName"
              placeholder="Enter account holder name"
              value={values["holderName"] || ""}
              onChange={(value) => setValues({ ...values, holderName: value })}
            />
          </Stack>
          <ContainedButton type="submit" disabled={Object.keys(values).length < 3}>
            Setup
          </ContainedButton>
        </GapStack>
      </FormWidget>
    </CenterBox>
  );
};

export default Mandate;
