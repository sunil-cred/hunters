// External dependencies
import React from "react";

// Local dependencies
import PaddedBox from "./paddedBox";

const CenterBox = ({ children }) => {
  return (
    <PaddedBox
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {children}
    </PaddedBox>
  );
};

export default CenterBox;
