
// images
import BugImage from '../images/bugYaleBlue.png'

// styled
import styled from 'styled-components';

export default function ProjectsPageLoader() {

    return (
        <StyledLoader>
            <div className="skelton-header"></div>
            <div className="loader"><img src={BugImage} alt="" /></div>
            <h2>Loading...</h2>
            <div className="skelton-bug"></div>
            <div className="skelton-bug"></div>
            <div className="skelton-bug"></div>
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
display: flex;
flex-direction: column;
width: 100%;
height: 80vh;
align-items: center;
position: relative;
    .skelton-header {
        background: #3f3f3f2f;
        border-radius: 12px 12px 0 0;
        margin: 0 auto;
        width: 100%;
        min-height: 10vh;
        justify-content: space-around;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .skelton-bug {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 99%;
        max-height: 250px;
        min-height: 50px;
        margin: 1% auto;
        background: #2525251c;
        box-shadow: 3px 3px 3px #5252528d;
        border-radius: 12px;
    }
    .loader {
        opacity: 80%;
        border: 16px dashed #0f4d92;
        border-radius: 50%;
        width: 250px;
        height: 250px;
        position: absolute;
        top: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: spin 2s linear infinite;
        img {
            width: 100px;
        }
    }
    h2 {
        position: absolute;
        top: 55%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @keyframes spin {
        0%  { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;