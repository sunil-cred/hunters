// External dependencies
import { Box } from "@mui/material";
import React from "react";

const PaddedBox = ({ sx = {}, children }) => <Box sx={{ padding: "16px", ...sx }}>{children}</Box>;

export default PaddedBox;
