import styled from "styled-components";

const Jadwal_Tenaga_Medis = styled.div`
  height: 100%;
  display: flex;
  align-items: left;
  overflow: hidden;

  .rbc-time-view {
    width: auto;
  }

  .rbc-events-container {

  }

  .rbc-event {
    background-color: #83D2FF;
    color: black;
  }

  @media(max-width: 1366px) {
    width: calc(100vw - 30em);
  }

  .rbc-toolbar {
    display: none;
  }
`;

export default Jadwal_Tenaga_Medis;