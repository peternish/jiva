import styled from "styled-components";
import BaseDropzone from "react-dropzone";

// utils
import constants from "@utils/constants";

export const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  if (props.error) {
    return constants.COLORS.ERROR;
  }
  return "#eeeeee";
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;

  section {
    div {
      display: flex;
      align-items: center;
      height: max-content;
      height: 5em;

      input {
        height: 5em;
        margin: 0;
      }
    }

    p {
      align-self: center;
      text-align: center;
      margin: 0;
    }
  }
`;

const CSS = styled.div`
  &,
  * {
    width: 33.5em;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.2em;
  }

  #error-message {
    color: ${constants.COLORS.ERROR};
  }

  @media (max-width: 768px) {
    &,
    * {
      width: 100%;
    }
  }
`;

const Dropzone = ({ setSipFile, sipFile }) => {
  return (
    <CSS>
      <label>Surat Izin Praktik</label>
      <Container error={!sipFile}>
        <BaseDropzone onDrop={(acceptedFiles) => setSipFile(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} data-testid="input" />
                <p>{sipFile ? sipFile.name : "Unggah File"}</p>
              </div>
            </section>
          )}
        </BaseDropzone>
      </Container>
      {!sipFile ? (
        <small id="error-message">Unggah surat izin praktik</small>
      ) : null}
    </CSS>
  );
};

export default Dropzone;
