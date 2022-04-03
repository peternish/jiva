import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";

export default function URLPreview({ URL }) {
  const [tooltipTitle, setTooltipTitle] = useState("Copy URL");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(URL);
    setTooltipTitle("URL Copied!");
  };

  const Style = styled.span`
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 1em;
      border: 1px solid rgba(0, 0, 0, 0.23);
      border-radius: 4px;
      padding: 0.5em 1em;
      margin-top: 1em;
      min-width: 30%;
      max-width: fit-content;
`;

  return (
    <Style data-testid={'URLPreview'}>
      {URL}
      <Tooltip title={tooltipTitle} onClose={() => setTooltipTitle("Copy URL")}>
        <ContentCopyIcon onClick={copyToClipboard} cursor="pointer" />
      </Tooltip>
    </Style>
  );
}
