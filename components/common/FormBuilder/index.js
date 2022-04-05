import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const fb = useRef();
  useEffect(() => {
    loadPackages();
  }, []);

  useEffect(() => {
    $(fb.current).empty();
    $(fb.current).formBuilder({ ...options, formData: schema?.fields || [] });
  }, [schema]);

  const saveSchema = async () => {
    setIsSubmitting(true)
    const updatedFields = $(fb.current).formBuilder("getData");
    const updatedSchema = {
      ...schema,
      fields: updatedFields,
    };
    onSave(updatedSchema, setIsSubmitting);
  };

  const resetSchema = () => {
    setIsResetting(true)
    $(fb.current).empty();
    $(fb.current).formBuilder({ ...options, formData: schema?.fields || [] });
    setIsResetting(false)
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
        <div id="left">
          <Button variant="outlined" onClick={handlePreview}>Pratinjau</Button>
        </div>
        <div id="right">
          <LoadingButton 
            loading={isResetting} 
            variant="outlined" 
            onClick={resetSchema}
          >
            Reset
          </LoadingButton>
          <LoadingButton
            loading={isSubmitting}
            variant="contained" 
            onClick={saveSchema}
          >
            Simpan
          </LoadingButton>
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
