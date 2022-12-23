import React from "react";
import { ListItemButton, ListItemText } from "@mui/material";

const UploadButton = ({ name, primaryText, secondaryText, onChange }) => {
  return (
    <ListItemButton
      sx={{ border: "1px dashed rgba(18, 3, 58, 0.1)", borderRadius: "16px", marginBottom: "10px" }}
      component="label"
    >
      <ListItemText
        sx={{ color: "rgba(18, 3, 58, 0.8)" }}
        primary={primaryText}
        secondary={secondaryText}
      />
      <input
        hidden
        name={name}
        type="file"
        accept="image/jpeg,image/png,application/pdf"
        onChange={onChange}
      />
    </ListItemButton>
  );
};

export default UploadButton;
