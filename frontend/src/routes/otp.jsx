// External dependencies
import React, { useState } from "react";
import { redirect, useActionData, useLoaderData, useNavigation } from "react-router-dom";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import axios from "axios";

// Local dependencies
import CenterBox from "../components/centerBox";
import ContainedButton from "../components/containedButton";
import InputField from "../components/inputField";
import GapStack from "../components/gapStack";
import FormWidget from "../components/formWidget";

export async function loader({ params: { mobile } }) {
  return mobile;
}

export async function action({ request }) {
  const { otp, mobile } = Object.fromEntries(await request.formData());

  try {
    const {
      data: { success, data },
    } = await axios.post("http://admins-macbook-pro-2.local:8003/hunters/users/verify-otp", {
      mobile,
      otp: parseInt(otp),
    });

    if (success) {
      localStorage.setItem("mobile", JSON.stringify(mobile));
      const userId = data.user_id;

      try {
        const {
          data: { success },
        } = await axios.get("http://admins-macbook-pro-2.local:8003/hunters/users/check-risk", {
          params: { user_id: userId },
        });

        if (success) return redirect(`/documents/${userId}`);
      } catch (error) {
        return redirect("/risk");
      }
    }
  } catch (error) {
    return true;
  }
}

const OTP = () => {
  const [value, setValue] = useState("");
  const mobile = useLoaderData();
  const { state } = useNavigation();
  const error = useActionData();

  const isSubmitting = state !== "idle";

  return (
    <>
      <CenterBox
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2>How about that OTP you got?</h2>
        <FormWidget>
          <GapStack>
            <InputField
              name="otp"
              type="number"
              placeholder="Enter 5-digit otp"
              value={value}
              error={error}
              onChange={setValue}
            />
            <ContainedButton type="submit" disabled={value.length !== 5 || isSubmitting}>
              {isSubmitting ? "Verifying..." : "Verify"}
            </ContainedButton>
            <input hidden name="mobile" defaultValue={mobile} />
          </GapStack>
        </FormWidget>
      </CenterBox>
      {isSubmitting && (
        <Backdrop open={isSubmitting} sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <CircularProgress sx={{ marginBottom: "16px" }} color="inherit" />
            <span>Crunching numbers...</span>
          </Box>
        </Backdrop>
      )}
    </>
  );
};

export default OTP;
