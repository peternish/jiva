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

    .preview-url {
        display: flex;
        justify-content: space-between;
        align-items: center;
        column-gap: 1em;
        border: 1px solid rgba(0, 0, 0, 0.23);
        border-radius: 4px;
        padding: 0.5em 1em;
        margin-top: 1em;
        min-width: 30%;
        max-width: fit-content;
    }
`;

export default CSS;