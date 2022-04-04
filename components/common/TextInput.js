import styled from "styled-components";

// component imports
import { Field } from "formik";

// utils
import constants from "@utils/constants";

const CSS = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;

  label {
    font-weight: bold;
    margin-bottom: 0.2em;
  }

  input {
    padding: 1em 0.75em;
    width: 40em;
    box-shadow: ${(props) =>
      props.isError ? `0px 0px 2px ${constants.COLORS.ERROR}` : "none"};
    border: 1px solid
      ${(props) => (props.isError ? constants.COLORS.ERROR : "grey")};
  }

  .error-message {
    color: ${constants.COLORS.ERROR};
  }

  @media (max-width: 768px) {
    &,
    input {
      width: 100%;
    }
  }
`;

const TextInput = ({ label, name, type = "text", placeholder = "", disabled = false, error, as="", children }) => {
  return (
    <CSS isError={!!error}>
      <label htmlFor={name}>{label}</label>
      <Field type={type} placeholder={placeholder} name={name} id={name} disabled={disabled} as={as}>{children}</Field>
      {error ? <small className="error-message">{error}</small> : null}
    </CSS>
  );
};

export default TextInput;
