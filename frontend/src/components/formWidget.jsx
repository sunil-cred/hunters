import React from "react";
import { Form } from "react-router-dom";

const FormWidget = ({ method = "POST", encType, children }) => {
  return (
    <Form replace method={method} encType={encType}>
      {children}
    </Form>
  );
};

export default FormWidget;
