import React, { useEffect, useRef, useState } from "react";

const loadPackages = () => {
  const $ = require("jquery");

  window.jQuery = $;
  window.$ = $;
  require("jquery-ui-sortable");

  require("formBuilder");
  require("formBuilder/dist/form-render.min.js");
};

const options = {
  disabledActionButtons: ["data", "save", "clear"],
  disableHTMLLabels: true,
};

const FormBuilder = () => {
  const [schema, setSchema] = useState([]);

  const fb = useRef();
  useEffect(() => {
    loadPackages();
  }, []);

  useEffect(() => {
    $(fb.current).empty();
    $(fb.current).formBuilder({ ...options, formData: schema });
  }, [schema]);

  return (
    <div>
      <div id="fb-editor" ref={fb} />
      <button
        onClick={() => {
          setSchema($(fb.current).formBuilder("getData"));

          // this outputs the schema, save this in state
          console.log($(fb.current).formBuilder("getData"));
        }}
      >
        Save
      </button>

      <button
        onClick={() => {
          setSchema([]);
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default FormBuilder;
