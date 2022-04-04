import "@testing-library/jest-dom";
import TextInput from "@components/common/TextInput";
import FormBuilder from "@components/common/FormBuilder";
import FormRender from "@components/common/FormRender";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { Formik } from "formik";
import PageHeader from "@components/Layout/PageHeader";
import * as nextRouter from 'next/router';
import URLPreview from "@components/common/URLPreview";
import PreviewModal from "@components/common/FormRender/PreviewModal";

const SAMPLE_FORM_JSON = [
  {
    type: "text",
    required: true,
    label: "Field 1",
    className: "form-control",
    name: "text-1648102772033-0",
    access: false,
    subtype: "text",
  },

  {
    "type": "autocomplete",
    "required": false,
    "label": "Autocomplete",
    "className": "form-control",
    "name": "autocomplete-1649043265015-0",
    "access": false,
    "requireValidOption": false,
    "values": [
      {
        "label": "Option 1",
        "value": "option-1",
        "selected": true
      },
      {
        "label": "Option 2",
        "value": "option-2",
        "selected": false
      },
      {
        "label": "Option 3",
        "value": "option-3",
        "selected": false
      }
    ]
  },
  {
    "type": "checkbox-group",
    "required": false,
    "label": "Checkbox Group",
    "toggle": false,
    "inline": false,
    "name": "checkbox-group-1649043265997-0",
    "access": false,
    "other": false,
    "values": [
      {
        "label": "Option 1",
        "value": "option-1",
        "selected": true
      }
    ]
  },
  {
    "type": "date",
    "required": false,
    "label": "Date Field",
    "className": "form-control",
    "name": "date-1649043266930-0",
    "access": false
  },
  {
    "type": "file",
    "required": false,
    "label": "File Upload",
    "className": "form-control",
    "name": "file-1649043267713-0",
    "access": false,
    "subtype": "file",
    "multiple": false
  },
  {
    "type": "header",
    "subtype": "h1",
    "label": "Header",
    "access": false
  },
  {
    "type": "paragraph",
    "subtype": "p",
    "label": "Paragraph",
    "access": false
  },
  {
    "type": "radio-group",
    "required": false,
    "label": "Radio Group",
    "inline": false,
    "name": "radio-group-1649043271464-0",
    "access": false,
    "other": false,
    "values": [
      {
        "label": "Option 1",
        "value": "option-1",
        "selected": false
      },
      {
        "label": "Option 2",
        "value": "option-2",
        "selected": false
      },
      {
        "label": "Option 3",
        "value": "option-3",
        "selected": false
      }
    ]
  },
  {
    "type": "select",
    "required": false,
    "label": "Select",
    "className": "form-control",
    "name": "select-1649043272413-0",
    "access": false,
    "multiple": false,
    "values": [
      {
        "label": "Option 1",
        "value": "option-1",
        "selected": true
      },
      {
        "label": "Option 2",
        "value": "option-2",
        "selected": false
      },
      {
        "label": "Option 3",
        "value": "option-3",
        "selected": false
      }
    ]
  },
  {
    "type": "text",
    "required": false,
    "label": "Text Field",
    "className": "form-control",
    "name": "text-1649043273546-0",
    "access": false,
    "subtype": "text"
  },
  {
    "type": "textarea",
    "required": false,
    "label": "Text Area",
    "className": "form-control",
    "name": "textarea-1649043274597-0",
    "access": false,
    "subtype": "textarea"
  },
  {
    "type": "number",
    "required": false,
    "label": "Number",
    "className": "form-control",
    "name": "number-1649043269564-0",
    "access": false
  }
]

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
    render(<FormBuilder onSave={() => { }} />);
  });

  it("renders the input options", () => {
    expect(screen.getByText("Simpan")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Pratinjau")).toBeInTheDocument();
  });

  it("ensure the clear button works", async () => {
    const clearButton = screen.getByText("Reset");
    expect(() => fireEvent.click(clearButton)).not.toThrowError();
  });

  it("ensure the save button works", async () => {
    const saveButton = screen.getByText("Simpan");
    expect(() => fireEvent.click(saveButton)).not.toThrowError();
  });
});

describe("<FormRender/>", () => {
  it("renders the buttons", () => {
    render(<FormRender schema={[]} submit={() => { }} />);
    expect(screen.getByText("Simpan")).toBeInTheDocument();
  });

  it("ensure the save button doesn't throw an error", async () => {
    render(<FormRender schema={[]} submit={() => { }} />);
    const submitButton = screen.getByText("Simpan");
    expect(() => fireEvent.click(submitButton)).not.toThrowError();
  });

  it("renders input with schema", async () => {
    render(
      <FormRender
        submit={() => { }}
        schema={SAMPLE_FORM_JSON}
      />
    );
    expect(screen.getByText("Field 1")).toBeInTheDocument();
  });

  it("shows required form", async () => {
    render(
      <FormRender
        submit={() => { }}
        schema={SAMPLE_FORM_JSON}
      />
    );

    const submitButton = screen.getByText("Simpan");

    await act(async () => {
      await fireEvent.click(submitButton);
      await fireEvent.click(submitButton);
    });
    // expect the required warning is shown
    expect(
      screen.getByText("text-1648102772033-0 is required")
    ).toBeInTheDocument();
  });

  it("doesn't render input because schema is empty", async () => {
    render(<FormRender schema={[]} submit={() => { }} />);

    // negative: ensure field is no longer rendered
    expect(screen.queryByRole("input")).not.toBeInTheDocument();
  });
});
describe("<PageHeader/>", () => {
  beforeEach(() => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({
      back: () => { },
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

describe("<URLPreview/>", () => {
  beforeEach(() => {
    render(<URLPreview URL={"testURl"} />);
  });

  it("renders the text box", () => {
    expect(screen.getByTestId("URLPreview")).toBeInTheDocument();
  })

  it("renders the copy button url button ", () => {
    expect(screen.getByTestId("ContentCopyIcon")).toBeInTheDocument();
  });
})

describe("<PreviewModal/>", () => {
  beforeEach(() => {
    render(
      <PreviewModal
        schema={[]}
        onClose={() => { }}
        open={true}
      />)
  })

  it('renders a modal', () => {
    expect(screen.getByTestId("PreviewModal")).toBeInTheDocument();
  })

  it("renders the close modal button", () => {
    expect(screen.getByTestId("CloseIcon")).toBeInTheDocument();
  });

})