import React, { useEffect, useRef } from "react";

const excludedFields = ["header", "paragraph"];

const FormRender = ({ schema, submit }) => {
  const fr = useRef();

  useEffect(() => {
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const values = {};

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
            $(this).after(`<small>${$(this).attr("name")} is required</small>`);
          }
        });
        submit(payload);
      }}
    >
      <div id="fb-render" ref={fr}></div>
      <button type="submit">Submit</button>
    </form>
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
