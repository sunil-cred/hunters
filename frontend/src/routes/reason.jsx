// External dependencies
import axios from "axios";
import React from "react";
import { redirect, useActionData, useLoaderData, useNavigation } from "react-router-dom";

// Local dependencies
import CenterBox from "../components/centerBox";
import ContainedButton from "../components/containedButton";
import FormWidget from "../components/formWidget";
import GapStack from "../components/gapStack";
import InputField from "../components/inputField";

export async function loader({ params: { userId } }) {
  return userId;
}

export async function action({ request }) {
  const { userId, reason } = Object.fromEntries(await request.formData());

  try {
    const {
      data: { success },
    } = await axios.post("http://admins-macbook-pro-2.local:8003/hunters/users/reason", {
      user_id: userId,
      reason,
    });

    if (success) return redirect("/thanks/false");
  } catch (error) {
    return true;
  }
}

const ReasonPage = () => {
  const userId = useLoaderData();
  const { state } = useNavigation();
  const error = useActionData();

  const isSubmitting = state !== "idle";

  return (
    <CenterBox>
      <h2>Would you like to tell us the reason for your non-payments?</h2>
      <FormWidget>
        <GapStack>
          <InputField name="reason" placeholder="Write your heart out (optional)" error={error} />
          <ContainedButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Please Wait..." : "Let's Go"}
          </ContainedButton>
        </GapStack>
        <input hidden name="userId" defaultValue={userId} />
      </FormWidget>
    </CenterBox>
  );
};

export default ReasonPage;
