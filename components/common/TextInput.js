import styled from "styled-components"

// component imports
import { Field } from "formik"

const CSS = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 1em;

label {
  font-weight: bold;
  margin-bottom: .2em;
}

input {
  padding: 1em 0.75em;
  width: 40em;
}

@media(max-width: 768px) {
  &, input {
    width: 100%;
  }
}
`

const TextInput = ({ label, name, type = "text", placeholder = "" }) => {
  return <CSS>
    <label htmlFor={name}>{label}</label>
    <Field type={type} placeholder={placeholder} name={name} id={name}/>
  </CSS>
}

export default TextInput