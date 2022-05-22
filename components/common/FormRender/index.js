import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import constants from "@utils/constants";
import LoadingButton from "@mui/lab/LoadingButton";

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
    background: #FFFFFF;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.23);

    &, * {
      font-family: "Roboto";
    }
  }

  .form-control[data-custom-error='true'] {
    box-shadow: 0px 0px 2px ${constants.COLORS.ERROR};
    border: 1px solid ${constants.COLORS.ERROR}
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
      width: min-content !important;
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
const FormRender = ({ schema, submit, isSubmitting, extraButton, isValid = true }) => {
  const fr = useRef();

  const [isError, setIsError] = useState(false)

  const validateForm = () => {
    const values = {};
    const errs = document.getElementsByClassName("error-message")
    const inputErrors = $("[data-custom-error='true']")
    inputErrors.each(function () {
      $(this).attr("data-custom-error", "false")
    })
    if (errs.length) {
      Array.from(errs).forEach(element => element.remove())
    }
  
    // map field values to key, value pairs
    $("form")
      .serializeArray()
      .forEach(({ name, value }) => (values[name] = value));
  
    // map fields to payload object
    const payload = [];
    schema.forEach(({ type, required, name, label }) => {
      const inputValue = {
        type,
        required,
        name,
        label,
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
    let isErrorTemp = false
    $("[data-custom-required='true']").each(function () {
      if (!values[$(this).attr("name")]) {
        $(this).attr("data-custom-error", "true")
        $(this).after(`<small class="error-message">${$(this).attr("name")} wajib diisi</small>`);
        isErrorTemp = true
      }
    });
    return { values, payload, isErrorTemp }
  }

  const validateFormCallback = useCallback(validateForm, [schema])

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

    $("form").on("change", () => {
      const { isError: isErrorTemp } = validateFormCallback()
      setIsError(isErrorTemp)
    })
  }, [schema, validateFormCallback]);

  return (
    <FormCSS>
      <form
        className="form-container"
        onSubmit={async (event) => {
          event.preventDefault();
          const { payload, isErrorTemp } = validateForm()
          setIsError(isErrorTemp)
          if (!isErrorTemp && isValid) submit(payload);
        }}
      >
        <div id="fb-render" ref={fr}></div>
        <div style={{display: "flex", gap: "1em", width: "100%"}}>
          {extraButton && extraButton()}
          <LoadingButton
            variant="contained"
            type="submit"
            loading={isSubmitting && isValid && !isError}
            disabled={!isValid || isError}
          >Simpan
          </LoadingButton>
        </div>
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
