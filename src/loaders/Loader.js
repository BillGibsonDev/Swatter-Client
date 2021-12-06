
// styled
import styled from 'styled-components';

export default function Loader() {

    return (
        <StyledLoader>
            <div className="loader"></div>
            <h2>Standby...</h2>
        </StyledLoader>
    )
}

const StyledLoader = styled.div`
width: 100%;
max-height: 70vh;
margin: 1% auto;
display: flex;
justify-content: center;
align-items: center;
position: relative;
flex-direction: column;
z-index: 99;
background: white;
    .loader {
        opacity: 80%;
        border: 16px dashed #0f4d92;
        border-radius: 50%;
        width: 250px;
        height: 250px;
        animation: spin 2s linear infinite;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    h2 {
        position: relative;
        margin-top: 50px;
    }

    @keyframes spin {
        0%  { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;