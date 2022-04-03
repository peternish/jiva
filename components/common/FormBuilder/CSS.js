import styled from "styled-components";

const CSS = styled.div`
    // root
    display: flex;
    flex-direction: column;

    .buttons-fb {
        display: flex;
        justify-content: space-between;
        padding-top: 2em;
    }

    .buttons-fb div {
        display: flex;
        column-gap: 1em;
        padding-bottom: 2em
    }

    button {
        min-width: 11em
    }
`;

export default CSS;