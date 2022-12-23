// External dependencies
import { FormHelperText, List, ListSubheader } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { redirect, useActionData, useLoaderData, useNavigation } from "react-router-dom";

// Local dependencies
import CenterBox from "../components/centerBox";
import ContainedButton from "../components/containedButton";
import FormWidget from "../components/formWidget";
import GapStack from "../components/gapStack";
import UploadButton from "../components/uploadButton";

export async function loader({ params: { userId } }) {
  return userId;
}

export async function action({ request }) {
  const formData = await request.formData();

  try {
    const {
      data: { success },
    } = await axios.post(
      "http://admins-macbook-pro-2.local:8003/hunters/documents/upload",
      formData
    );

    if (success) return redirect(`/reason/${formData.get("user_id")}`);
  } catch (error) {
    return true;
  }
}

const Documents = () => {
  const [files, setFiles] = useState({});
  const userId = useLoaderData();
  const { state } = useNavigation();
  const error = useActionData();

  const isSubmitting = state !== "idle";

  const handleFileChange = (name, file) => {
    setFiles({ ...files, [name]: file.name });
  };

  return (
    <CenterBox>
      <h2>Got Docs?</h2>
      <FormWidget encType="multipart/form-data">
        <GapStack>
          <List subheader={<ListSubheader>KYC Docs</ListSubheader>}>
            <UploadButton
              name="aadhaar"
              primaryText="Upload Aadhaar *"
              secondaryText={files["aadhaar"] ? `${files["aadhaar"]}` : "image/pdf"}
              onChange={({ target: { files } }) => handleFileChange("aadhaar", files[0])}
            />
            <UploadButton
              name="pan"
              primaryText="Upload PAN *"
              secondaryText={files["pan"] ? `${files["pan"]}` : "image/pdf"}
              onChange={({ target: { files } }) => handleFileChange("pan", files[0])}
            />
          </List>
          <List subheader={<ListSubheader>Income Docs</ListSubheader>}>
            <UploadButton
              name="salary"
              primaryText="Upload Last 6 Months Salary Slips *"
              secondaryText={files["salary"] ? `${files["salary"]}` : "image/pdf"}
              onChange={({ target: { files } }) => handleFileChange("salary", files[0])}
            />
            <UploadButton
              name="cheque"
              primaryText="Upload Cancelled Cheque *"
              secondaryText={files["cheque"] ? `${files["cheque"]}` : "image/pdf"}
              onChange={({ target: { files } }) => handleFileChange("cheque", files[0])}
            />
          </List>
          {error && (
            <FormHelperText error={error}>Something went wrong. Please try again.</FormHelperText>
          )}
          <ContainedButton type="submit" disabled={Object.keys(files).length < 4 || isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Docs"}
          </ContainedButton>
          <input hidden name="user_id" defaultValue={userId} />
        </GapStack>
      </FormWidget>
    </CenterBox>
  );
};

export default Documents;
