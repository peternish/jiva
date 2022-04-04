import styled from "styled-components";

const Form_Calender = styled.div`
  width: 23.3em;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  overflow-y: scoll;

  form {
    background: #EAF5FD;
    padding: 5em 2.5em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    min-height: 100%;
    height: max-content;
  }

  #time-range {
    #inputs {
      display: flex;
      gap: .5em;
    }    
    label {
      font-weight: bold;
      margin-bottom: 0.2em;
    }

    input {
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
  }
`;

export default Form_Calender;