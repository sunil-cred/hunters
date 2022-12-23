// External dependencies
import React, { useState } from "react";

// Local dependencies
import CenterBox from "../components/centerBox";
import ContainedButton from "../components/containedButton";
import FormWidget from "../components/formWidget";
import GapStack from "../components/gapStack";
import InputField from "../components/inputField";

const PersonalDetails = () => {
  const [firstName, setFirstName] = useState("");

  return (
    <CenterBox>
      <h2>let's get to know you</h2>
      <FormWidget>
        <GapStack>
          <InputField
            required
            name="firstName"
            placeholder="enter first name (required)"
            value={firstName}
            onChange={setFirstName}
          />
          <InputField name="lastName" placeholder="enter last name (optional)" />
          <InputField name="email" type="email" placeholder="enter email (optional)" />
          <ContainedButton type="submit" disabled={!firstName}>
            save details
          </ContainedButton>
        </GapStack>
      </FormWidget>
    </CenterBox>
  );
};

export default PersonalDetails;
