import Loader from './Loader';

// styled
import styled from 'styled-components';

export default function TicketPageLoader() {

    return (
        <StyledLoader>
            <Loader />
        </StyledLoader>
    )
}

const StyledLoader = styled.div`
    width: 90%;
    height: 70vh;
    margin: 1% auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-direction: column;
    .loader {
        opacity: 80%;
        border: 16px dashed #ffffff;
        border-radius: 50%;
        width: 250px;
        height: 250px;
        animation: spin 2s linear infinite;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 100px;
        }
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