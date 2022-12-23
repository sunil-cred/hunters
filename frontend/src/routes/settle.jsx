// External dependencies
import React, { useState } from "react";
import { Box } from "@mui/system";
import { redirect, useActionData, useLoaderData } from "react-router-dom";

// Local dependencies
import CenterBox from "../components/centerBox";
import ContainedButton from "../components/containedButton";
import FormWidget from "../components/formWidget";
import GapStack from "../components/gapStack";
import InputField from "../components/inputField";
import formatter from "../lib/formatter";
import ColumnBox from "../components/columnBox";

export async function loader({ params }) {
  return params.accountId;
}

export async function action({ request }) {
  const { accountId, amount } = Object.fromEntries(await request.formData());
  console.log(accountId, amount);
  if (accountId === "bedmas") return redirect(`/settle/${accountId}/error`);
  return redirect(`/settle/${accountId}/success`);
}

const Settle = () => {
  const [value, setValue] = useState("");
  const accountId = useLoaderData();

  return (
    <CenterBox>
      <h2>let's settle it</h2>
      <FormWidget>
        <GapStack>
          <ColumnBox>
            <h4>total loan amount</h4>
            <InputField disabled defaultValue={formatter.format(8799)} />
          </ColumnBox>
          <ColumnBox>
            <h4>settlement amount</h4>
            <InputField
              name="amount"
              type="number"
              placeholder="enter amount"
              value={value}
              onChange={setValue}
            />
            <input hidden name="accountId" defaultValue={accountId} />
          </ColumnBox>
          <ContainedButton type="submit" disabled={!value.length}>
            check eligibility
          </ContainedButton>
        </GapStack>
      </FormWidget>
    </CenterBox>
  );
};

export default Settle;
