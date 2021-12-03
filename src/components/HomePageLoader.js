// images
import BugImage from '../images/bugYaleBlue.png'

// styled
import styled from 'styled-components';

export default function HomePageLoader() {

    return (
        <StyledLoader>
            <div className="loader"><img src={BugImage} alt="" /></div>
            <div className="skelton-bug"></div>
            <div className="skelton-bug"></div>
            <div className="skelton-bug"></div>
            <div className="skelton-bug"></div>
            <div className="skelton-bug"></div>
            <div className="skelton-bug"></div>
        </StyledLoader>
    )
}

const StyledLoader = styled.div`
width: 90%;
margin: 1% auto;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-column-gap: 2%;
grid-row-gap: 2%;
position: relative;
    .skelton-bug {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 300px;
        margin: 10px auto;
        position: relative;
        background: #3b3b3b1a;
        box-shadow: 6px 6px 6px #5252528d;
        border-radius: 12px;
    }
    .loader {
        opacity: 80%;
        border: 16px solid #f3f3f3;
        border: 16px dashed #0f4d92;
        border-radius: 50%;
        width: 250px;
        height: 250px;
        animation: spin 2s linear infinite;
        position: absolute;
        top: 25%;
        right: 35%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 100px;
        }
    }

    @keyframes spin {
        0%  { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;