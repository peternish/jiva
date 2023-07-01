import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";
import styles from "@styles/URLPreview.module.css";

export default function URLPreview({ URL }) {
  const [tooltipTitle, setTooltipTitle] = useState("Copy URL");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(URL);
    setTooltipTitle("URL Copied!");
  };

  return (
    <div className={styles.previewURL} data-testid={'URLPreview'}>
      {URL}
      <Tooltip title={tooltipTitle} onClose={() => setTooltipTitle("Copy URL")}>
        <ContentCopyIcon onClick={copyToClipboard} cursor="pointer" />
      </Tooltip>
    </div>
  );
}
