// styled
import styled from 'styled-components';
import * as palette from '../styled/ThemeVariables.js';

// images
import BugImage from '../assets/icons/bugYaleBlue.png'

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
            <div className="loader-container">
                <div className="loader">
                    <img src={BugImage} alt="Loading Page" />
                </div>
            </div>
            <h3 id="phrase">{loadingPhrases()}</h3>
        </StyledLoader>
    )
}

const StyledLoader = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .loader-container {
        opacity: 80%;
        border: 16px dashed #000000;
        border-radius: 50%;
        width: 300px;
        height: 300px;
        animation: spinOuter 8s linear infinite;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .loader {
            opacity: 80%;
            border: 16px dashed #000000;
            border-radius: 50%;
            width: 90%;
            height: 90%;
            animation: spinInner 8s linear infinite;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 100px;
            }
        }
    }
    h3 {
        position: relative;
        margin-top: 20px;
        color: ${palette.accentColor};
        animation: fadeInOut 3s infinite;
    }
    @keyframes spinInner {
        0%  { transform: rotate(0deg); }
        20%  { transform: rotate(200deg); }
        40%  { transform: rotate(-20deg); }
        60%  { transform: rotate(30deg); }
        80%  { transform: rotate(200deg); }
        100% { transform: rotate(0deg); }
    }

    @keyframes spinOuter {
        0%  { transform: rotate(0deg); }
        25%  { transform: rotate(-180deg); }
        50%  { transform: rotate(120deg); }
        75%  { transform: rotate(-250deg); }
        100% { transform: rotate(0deg); }
    }

    @keyframes fadeInOut {
        0%  { opacity: .3; }
        50% { opacity: 1; }
        100%  { opacity: .3; }
    }
`;