import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import CSS from "./CSS";
import PreviewModal from "@components/common/FormRender/PreviewModal";

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

const FormBuilder = ({ schema, onSave, children }) => {
  const [modalOpen, setmodalOpen] = useState(false)
  const [previewSchema, setpreviewSchema] = useState(schema?.fields || [])

  const fb = useRef();
  useEffect(() => {
    loadPackages();
  }, []);

  useEffect(() => {
    $(fb.current).empty();
    $(fb.current).formBuilder({ ...options, formData: schema?.fields || [] });
  }, [schema]);

  const saveSchema = () => {
    const updatedFields = $(fb.current).formBuilder("getData");
    const updatedSchema = {
      ...schema,
      fields: updatedFields,
    };
    onSave(updatedSchema);
  };

  const resetSchema = () => {
    $(fb.current).empty();
    $(fb.current).formBuilder({ ...options, formData: schema?.fields || [] });
  };

  const handlePreview = () => {
    setpreviewSchema($(fb.current).formBuilder("getData"))
    setmodalOpen(true)
  }

  return (
    <CSS>
      <div id="fb-editor" ref={fb} />

      {children}

      <div className="buttons-fb">
        <div>
          <Button variant="outlined" onClick={handlePreview}>Pratinjau</Button>
        </div>
        <div>
          <Button variant="outlined" onClick={resetSchema}> Reset </Button>
          <Button variant="contained" onClick={saveSchema}> Simpan </Button>
        </div>
      </div>
      <PreviewModal 
        schema={previewSchema} 
        onClose={() => setmodalOpen(false)} 
        open={modalOpen} 
      />
    </CSS>
  );
};

export default FormBuilder;
