import TextInput from "@components/common/TextInput";
import { render, screen } from "@testing-library/react";
import { Formik } from "formik";
import "@testing-library/jest-dom";

describe("<TextInput/>", () => {
  it("renders a input", () => {
    const props = {
      label: "label",
      name: "name",
      type: "text",
      placeholder: "placeholder",
      error: "error",
    };

    render(<Formik>{() => <TextInput {...props} />}</Formik>);

    expect(screen.getByLabelText(props.label)).toBeInTheDocument();
    expect(screen.getByText(props.error)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(props.placeholder)).toBeInTheDocument();
  });
});
