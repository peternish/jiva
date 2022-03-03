import styled from "styled-components"
import BaseDropzone from 'react-dropzone'

// redux
import { useDispatch } from "react-redux"
import { setSikFile } from "@redux/modules/auth"

const getColor = (props) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isFocused) {
      return '#2196f3';
  }
  return '#eeeeee';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

const CSS = styled.div`
  width: 100%;
  label {
    font-weight: bold;
    margin-bottom: .2em;
  }
`

const Dropzone = () => {
  const dispatch = useDispatch()
  return (
    <CSS>
      <label>Surat Izin Klinik</label>
      <Container >
        <BaseDropzone onDrop={acceptedFiles => dispatch(setSikFile(acceptedFiles[0]))}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Unggah File</p>
              </div>
            </section>
          )}
        </BaseDropzone>
      </Container>
    </CSS>
  )
}

export default Dropzone