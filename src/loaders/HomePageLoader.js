import Loader from './Loader.js';

// styled
import styled from 'styled-components';

export default function HomePageLoader() {

    return (
        <StyledLoader>
            <div className="loading-wrapper">
                <Loader />
            </div>
            <div className="skelton-ticket"></div>
            <div className="skelton-ticket"></div>
            <div className="skelton-ticket"></div>
            <div className="skelton-ticket"></div>
            <div className="skelton-ticket"></div>
            <div className="skelton-ticket"></div>
        </StyledLoader>
    )
}

const StyledLoader = styled.div`
    width: 90%;
    margin: 1% auto;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .skelton-ticket {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 300px;
        height: 300px;
        margin: 10px auto;
        position: relative;
        background: #3b3b3b1a;
        box-shadow: 6px 6px 6px #5252528d;
        border-radius: 12px;
    }
    .loading-wrapper {
        display: flex;
        position: absolute;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 70vh;
        .loader {
            opacity: 80%;
            border: 16px dashed #ffffff;
            border-radius: 50%;
            width: 250px;
            height: 250px;
            animation: spin 2s linear infinite;
            position: absolute;
            top: 20%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 100px;
            }
        }
        h2 {
                position: absolute;
                top: 60%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

    }
    @keyframes spin {
        0%  { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;