// External dependencies
import React, { useState } from "react";
import { redirect, useActionData, useNavigation } from "react-router-dom";
import axios from "axios";

// Local dependencies
import CenterBox from "../components/centerBox";
import ContainedButton from "../components/containedButton";
import InputField from "../components/inputField";
import GapStack from "../components/gapStack";
import FormWidget from "../components/formWidget";
import { FormHelperText } from "@mui/material";

export async function action({ request }) {
  const { number } = Object.fromEntries(await request.formData());
  try {
    const {
      data: { success },
    } = await axios.post("http://admins-macbook-pro-2.local:8003/hunters/users/generate-otp", {
      mobile: number,
    });

    if (success) return redirect(`/otp/${number}`);
  } catch (error) {
    return true;
  }
}

const Login = () => {
  const [value, setValue] = useState("");
  const { state } = useNavigation();
  const error = useActionData();

  const isSubmitting = state !== "idle";

  return (
    <CenterBox>
      <h2>What's your mobile number?</h2>
      <FormWidget>
        <GapStack>
          <InputField
            name="number"
            type="number"
            placeholder="Enter 10-digit mobile number"
            value={value}
            error={error}
            onChange={setValue}
          />
          <ContainedButton type="submit" disabled={value.length !== 10 || isSubmitting}>
            {isSubmitting ? "Sending..." : "Send OTP"}
          </ContainedButton>
        </GapStack>
      </FormWidget>
    </CenterBox>
  );
};

export default Login;
