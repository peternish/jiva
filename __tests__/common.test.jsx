import "@testing-library/jest-dom";
import TextInput from "@components/common/TextInput";
import FormBuilder from "@components/common/FormBuilder";
import FormRender from "@components/common/FormRender";

import { render, screen, act, fireEvent } from "@testing-library/react";
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

describe("<FormBuilder/>", () => {
  beforeEach(() => {
    render(<FormBuilder />);
  });

  it("renders the input options", () => {
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  it("ensure the clear button works", async () => {
    const clearButton = screen.getByText("Clear");
    expect(() => fireEvent.click(clearButton)).not.toThrowError();
  });

  it("ensure the save button works", async () => {
    const saveButton = screen.getByText("Save");
    expect(() => fireEvent.click(saveButton)).not.toThrowError();
  });
});

describe("<FormRender/>", () => {
  it("renders the buttons", () => {
    render(<FormRender schema={[]} submit={() => {}} />);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("ensure the save button doesn't throw an error", async () => {
    render(<FormRender schema={[]} submit={() => {}} />);
    const submitButton = screen.getByText("Submit");
    expect(() => fireEvent.click(submitButton)).not.toThrowError();
  });

  it("renders input with schema", async () => {
    render(
      <FormRender
        submit={() => {}}
        schema={[
          {
            type: "text",
            required: true,
            label: "Field 1",
            className: "form-control",
            name: "text-1648102772033-0",
            access: false,
            subtype: "text",
          },
        ]}
      />
    );
    expect(screen.getByText("Field 1")).toBeInTheDocument();
  });

  it("shows required form", async () => {
    render(
      <FormRender
        submit={() => {}}
        schema={[
          {
            type: "text",
            required: true,
            label: "Field 1",
            className: "form-control",
            name: "text-1648102772033-0",
            access: false,
            subtype: "text",
          },
        ]}
      />
    );

    const submitButton = screen.getByText("Submit");

    await act(async () => {
      await fireEvent.click(submitButton);
    });
    // expect the required warning is shown
    expect(
      screen.getByText("text-1648102772033-0 is required")
    ).toBeInTheDocument();
  });

  it("doesn't render input because schema is empty", async () => {
    render(<FormRender schema={[]} submit={() => {}} />);

    // negative: ensure field is no longer rendered
    expect(screen.queryByRole("input")).not.toBeInTheDocument();
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
