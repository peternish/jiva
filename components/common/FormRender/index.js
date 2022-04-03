import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import constants from "@utils/constants";
import Button from "@mui/material/Button";

const FormCSS = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 1em;
width: 100%;

.form-container {
  margin: 2em 0 0 0;
}

.rendered-form {
  label {
    font-weight: bold;
    margin-bottom: 0.2em;
  }

  .form-control {
    padding: 1em 0.75em;
    width: 100%;
    border-radius: 0;
    box-shadow: ${(props) =>
    props.isError ? `0px 0px 2px ${constants.COLORS.ERROR}` : "none"};
    border: 1px solid
      ${(props) => (props.isError ? constants.COLORS.ERROR : "grey")};
  }

  input[type='file'] {
    border: none;
    padding: 0;
  }

  .error-message {
    color: ${constants.COLORS.ERROR};
  }

  .formbuilder-checkbox, .formbuilder-radio {
    input {
      width: min-content;
    }

    label {
      font-weight: normal;
    }
  }
}

@media (max-width: 768px) {
  &,
  input {
    width: 100%;
  }
}
`;

const excludedFields = ["header", "paragraph"];
const FormRender = ({ schema, submit }) => {
  const fr = useRef();

  useEffect(() => {
    const $ = require("jquery");
    window.jQuery = $;
    window.$ = $;
    require("formBuilder/dist/form-render.min.js");
  }, []);

  useEffect(() => {
    $(fr.current).formRender({
      dataType: "json",
      formData: schema,
    });

    $("[required='required']").each(function () {
      $(this).attr("data-custom-required", true);
      $(this).removeAttr("required");
    });
  }, [schema]);

  return (
    <FormCSS>
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          const values = {};
          const errs = document.getElementsByClassName("error-message")
          if (errs.length) {
            Array.from(errs).forEach(e => e.remove())
          }

          // map field values to key, value pairs
          $("form")
            .serializeArray()
            .forEach(({ name, value }) => (values[name] = value));

          // map fields to payload object
          const payload = [];
          schema.forEach(({ type, required, name }) => {
            const inputValue = {
              type,
              required,
              name,
              value: values[name],
            };
            if (type === "file") {
              const file = document.querySelector(`[name=${name}]`).files[0];
              inputValue.value = file;
            } else if (type === "checkbox-group") {
              const options = document.getElementsByName(`${name}[]`);
              const checkedVals = [];
              options.forEach((el) => {
                if (el.checked) checkedVals.push(el.value);
              });
              inputValue.value = checkedVals.join(",");
            }
            if (!excludedFields.includes(type)) {
              payload.push(inputValue);
            }
          });
          $("[data-custom-required='true']").each(function () {
            if (!values[$(this).attr("name")]) {
              $(this).after(`<small class="error-message">${$(this).attr("name")} is required</small>`);
            }
          });
          submit(payload);
        }}
      >
        <div id="fb-render" ref={fr}></div>
        <Button variant="contained" type="submit">Simpan</Button>
      </form>
    </FormCSS>
  );
};

/**
 * Usage Example:
 * Obtain the form schema from the <FormBuilder/> component
 * <FormRender
      schema={[
        {
          type: "text",
          required: false,
          label: "Field 1",
          className: "form-control",
          name: "text-1648102772033-0",
          access: false,
          subtype: "text",
        },
        {
          type: "text",
          required: true,
          label: "Field 2",
          className: "form-control",
          name: "text-1648102772980-0",
          access: false,
          subtype: "text",
        },
      ]}
    />
 */

export default FormRender;
