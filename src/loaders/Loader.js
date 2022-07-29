
// styled
import styled from 'styled-components';

export default function Loader() {

    return (
        <StyledLoader>
            <div className="loader"></div>
            <h2>Loading...</h2>
        </StyledLoader>
    )
}

const StyledLoader = styled.div`
    opacity: 80%;
    border: 16px dashed #000000;
    border-radius: 50%;
    width: 250px;
    height: 250px;
    animation: spin 4s linear infinite;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 200px;
    left: 30%;
    @media (max-width: 834px){
        left: 40%;
    }
    @media (max-width: 428px){
        left: 15%;
    }
    h2 {
        position: relative;
        margin-top: 20px;
        color: white;
    }

    @keyframes spin {
        0%  { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;