import styled from "styled-components";

const CSS = styled.div`
  height: 100%;
  display: flex;
  align-items: left;

  #title {
    font-size: 3em;
  }

  @media (max-width: 768px) {
    padding: 2em 0;

    #register-card {
      width: 100%;
    }
  }
`;

export default CSS;