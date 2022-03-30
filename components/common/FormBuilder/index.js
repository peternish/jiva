import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import CSS from "./CSS";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";

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
  disableFields: ["button", "hidden"],
};

const FormBuilder = () => {
  const [schema, setSchema] = useState([]);
  const [previewURL, setPreviewURL] = useState("http://jiva.com/pendaftaran/klinik/1234");
  const [tooltipTitle, setTooltipTitle] = useState("Copy URL");

  const fb = useRef();
  useEffect(() => {
    loadPackages();
  }, []);

  useEffect(() => {
    $(fb.current).empty();
    $(fb.current).formBuilder({ ...options, formData: schema });
  }, [schema]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(previewURL);
    setTooltipTitle("URL Copied!");
  };

  const saveSchema = () => {
    setSchema($(fb.current).formBuilder("getData"));

    // this outputs the schema, save this in state
    console.log($(fb.current).formBuilder("getData"));
  };

  const clearSchema = () => {
    setSchema([]);
  };

  return (
    <CSS>
      <div id="fb-editor" ref={fb} />

      <span className="preview-url">
        {previewURL}
        <Tooltip
          title={tooltipTitle}
          onClose={() => setTooltipTitle("Copy URL")}
        >
          <ContentCopyIcon onClick={copyToClipboard} cursor="pointer" />
        </Tooltip>
      </span>

      <div className="buttons-fb">
        <div>
          <Button variant="outlined">Pratinjau</Button>
        </div>
        <div>
          <Button variant="outlined" onClick={clearSchema}>
            Clear
          </Button>
          <Button variant="contained" onClick={saveSchema}>
            Save
          </Button>
        </div>
      </div>
    </CSS>
  );
};

export default FormBuilder;
