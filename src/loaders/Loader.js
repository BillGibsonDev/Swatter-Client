
// styled
import styled from 'styled-components';

export default function Loader() {

    return (
        <StyledLoader>
            <div className="loader"></div>
        </StyledLoader>
    )
}

const StyledLoader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    position: relative;
    .loader {
        opacity: 80%;
        border: 16px dashed #000000;
        border-radius: 50%;
        width: 250px;
        height: 250px;
        animation: spin 4s linear infinite;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }
    @keyframes spin {
        0%  { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;