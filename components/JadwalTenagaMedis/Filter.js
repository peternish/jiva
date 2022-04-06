import styled from "styled-components";

const Filter_Tenaga_Medis = styled.div`

input, select, textarea {
    padding: 1em 0.75em;
    box-shadow: ${(props) =>
      props.isError ? `0px 0px 2px ${constants.COLORS.ERROR}` : "none"};
    border: 1px solid
      ${(props) => (props.isError ? constants.COLORS.ERROR : "rgba(0, 0, 0, 0.23)")};
    
    background: #FFFFFF;
    box-sizing: border-box;
    border-radius: 4px;

    &, * {
      font-family: "Roboto";
    }
  }

`

export default Filter_Tenaga_Medis;

