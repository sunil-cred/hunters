import { FormHelperText } from "@mui/material";
import React, { useState } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import CenterBox from "../components/centerBox";
import ColumnBox from "../components/columnBox";
import ContainedButton from "../components/containedButton";
import FormWidget from "../components/formWidget";
import GapStack from "../components/gapStack";
import InputField from "../components/inputField";
import formatter from "../lib/formatter";

export async function loader({ params }) {
  return params;
}

export async function action({ request }) {
  const { payType } = Object.fromEntries(await request.formData());

  if (payType === "one") return redirect(`/thanks/true`);
  return redirect(`/enroll/method`);
}

const Enroll = () => {
  const [dueDate, setDueDate] = useState("");
  const { payType } = useLoaderData();

  return (
    <CenterBox>
      <h2>Let's Get You Enrolled →</h2>
      <FormWidget>
        <GapStack>
          <ColumnBox>
            <h4>Total Loan</h4>
            <InputField disabled name="total" defaultValue={formatter.format(42357)} />
          </ColumnBox>
          <ColumnBox>
            <h4>Principal Outstanding</h4>
            <InputField disabled name="principal" defaultValue={formatter.format(34257)} />
          </ColumnBox>
          <ColumnBox>
            <h4>Expected EMI</h4>
            <InputField disabled name="emi" defaultValue={formatter.format(2570)} />
          </ColumnBox>
          <ColumnBox>
            <h4>Rate of Interest</h4>
            <InputField disabled name="interest" defaultValue="5%" />
          </ColumnBox>
          <ColumnBox>
            <h4>Loan Tenure</h4>
            <InputField disabled name="tenure" defaultValue="24 months" />
          </ColumnBox>
          <ColumnBox>
            <h4>ReFin Fee</h4>
            <InputField disabled name="fees" defaultValue={formatter.format(450)} />
          </ColumnBox>
          <ColumnBox>
            <h4>Due Date</h4>
            <InputField
              InputProps={{ sx: { borderRadius: "16px", width: "194px" } }}
              name="due"
              type="date"
              value={dueDate}
              onChange={setDueDate}
            />
          </ColumnBox>
          <FormHelperText sx={{ textAlign: "right", marginTop: "-16px" }}>
            Select a date within 15 days from your due date
          </FormHelperText>
          <ContainedButton type="submit" disabled={!dueDate.length}>
            Enroll Now →
          </ContainedButton>
          <input hidden name="payType" defaultValue={payType} />
        </GapStack>
      </FormWidget>
    </CenterBox>
  );
};

export default Enroll;
