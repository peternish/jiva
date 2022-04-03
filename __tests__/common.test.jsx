import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TextInput from "@components/common/TextInput";
import { Formik } from "formik";
import PageHeader from "@components/Layout/PageHeader";
import * as nextRouter from 'next/router';

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

describe("<PageHeader/>", () => {
  beforeEach(() => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ 
      back: () => {},
    }));

    render(<PageHeader>Title</PageHeader>)
  })

  it("renders a heading", () => {
    expect(screen.getByRole("heading")).toBeInTheDocument()
  })

  it("renders a clickable back button", () => {
    const backButton = screen.getByTestId('ArrowBackIcon')
    fireEvent.click(backButton)
    
    expect(backButton).toBeInTheDocument()
  })
})