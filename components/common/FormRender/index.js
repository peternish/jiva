import React, { useEffect, useRef } from "react";

const FormRender = ({ schema }) => {
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
        $("form")
          .serializeArray()
          .forEach(({ name, value }) => (values[name] = value));
        $("[data-custom-required='true']").each(function () {
          if (!values[$(this).attr("name")]) {
            $(this).after(`<small>${$(this).attr("name")} is required</small>`);
          }
        });
      }}
    >
      <div id="fb-render" ref={fr}></div>
      <button type="submit">Submit</button>
    </form>
  );
};

/**
 * Usage Example:
 * Obtain the form schmea from the <FormBuilder/> component
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
