import styled from "styled-components";

const List_Pasien = styled.div`

ul {
    padding: 1em 0.75em;
    box-shadow: ${(props) =>
      props.isError ? `0px 0px 2px ${constants.COLORS.ERROR}` : "none"};
    border: 1px solid
      ${(props) => (props.isError ? constants.COLORS.ERROR : "rgba(0, 0, 0, 0.23)")};

    
    box-sizing: border-box;
    border-radius: 4px;
    background: #FFFFFF;

    &, * {
      font-family: "Roboto";
    }
  }

h4 {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
}

`

export default List_Pasien;

