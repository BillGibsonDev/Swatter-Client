// styled
import styled from 'styled-components';
import * as palette from '../styled/ThemeVariables.js';

// images
import BugImage from '../assets/icons/bugYaleBlue.png';

export default function LoginLoader() {

    const loadingPhrases = () => {
        const phrases = [ 
            'Signing In..',
            'Yes, Still Signing In..', 
            'Free Servers are slow :)', 
            'I believe!', 
            'Wow, you have the patiences..',
            'Still Signing In..'
        ];
        
        for(let i = 0; phrases.length > i; i++){
            setTimeout(() => {
                if(document.getElementById("phrase") === null){
                    return;
                } else {
                    document.getElementById("phrase").innerHTML = `${[phrases[i]]}`;
                }
            }, 1000 * 7 * i)
        }
    }

    return (
        <StyledLoader>
            <div className="loading-container">
                <img src={BugImage} alt="Loading" />
            </div>
            <h3 id="phrase">{loadingPhrases()}</h3>
        </StyledLoader>
    )
}

const StyledLoader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30vh;
    position: relative;
    flex-direction: column;
    .loading-container {
        opacity: 80%;
        border: 16px dashed #000000;
        border-radius: 50%;
        width: 250px;
        height: 250px;
        animation: spin 4s linear infinite;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 80%;
            height: 80%;
        }
    }
    h3 {
        position: relative;
        margin-top: 20px;
        color: ${palette.accentColor};
        animation: fadeInOut 3s infinite;
    }
    @keyframes spin {
        0%  { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    @keyframes fadeInOut {
        0%  { opacity: .3; }
        50% { opacity: 1; }
        100%  { opacity: .3; }
    }
`;