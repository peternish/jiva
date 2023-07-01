import styled from "styled-components";

const CSS = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  #title {
    font-size: 3em;
  }

  #register-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3em;
    width: max-content;
    box-sizing: border-box;
    height: max-content;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 0.5em;
  }

  .form {
    margin: 2em 0;
    width: 40em;

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .input-container {
      width: 100%;
      min-height: 15em;
      height: max-content;
    }
  }

  #button-container {
    display: flex;
    width: 20em;
    gap: 1em;

    button {
      width: 100%;
    }
  }

  .progress {
    display: flex;
    gap: 0.5em;
    margin: 1em 0;

    .dot {
      width: 0.75em;
      height: 0.75em;
      background: #c4c4c4;
      border-radius: 50%;

      &.active {
        background: #0052d0;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 2em 0;

    #register-card {
      width: 100%;
    }
  }
`;

export default CSS;
