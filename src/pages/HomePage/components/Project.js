// styled
import styled from 'styled-components';
import * as pallette from '../../../styled/ThemeVariables';

// router
import { Link } from 'react-router-dom';

// images
import Edit from "../../../assets/icons/editIconWhite.png";

export default function Project({
    projectId, 
    title, 
    date, 
    projectImage
}) {

    return (
        <StyledProject>
            <Link id="image-link" to={`/projects/${projectId}`}><img id="projectImage" src={projectImage} alt="" /></Link>
                <div className="text-container">
                    <div className="info-container">
                        <Link to={`/projects/${projectId}`}>{title}</Link>
                        <h2>{date}</h2>
                    </div>
                    <Link id="edit-link" to={`/EditProject/${projectId}`}><img id="edit-button" src={Edit} alt="" /></Link>
                </div>
            
        </StyledProject>
    )
}

const StyledProject = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 300px;
    margin: 10px auto;
    position: relative;
    background: ${pallette.accentColor};
    border-radius: 4px;
    padding: 5%;
    @media (max-width: 550px){
        height: 400px;
    }
    #image-link {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
        width: 100%;
            #projectImage {
                width: 100%;
                height: 150px;
                margin-bottom: 10px;
                border-radius: 4px;
                @media (max-width: 550px){
                    height: 60%;
                }
            }
        }
    .text-container {
        display: flex;
        width: 100%;
        position: relative;
        .info-container {
            display: flex;
            justify-content: center;
            flex-direction: column;
            width: 100%;
            height: 100%;
            a {
                font-size: ${pallette.subtitleSize};
                color: white;
                font-weight: 700;
                &:hover {
                    text-decoration: underline;
                    text-underline-position: under;
                }
            }
            h2 {
                font-size: ${pallette.subtitleSize};
                color: white;
                font-weight: 400;
            }
        }
        #edit-link {
            width: 30px;
            height: 30px;
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: 3;
            #edit-button {
                width: 100%;
                height: 100%;
                cursor: pointer;
                &:hover {
                    transform: scale(1.05);
                    transition: 0.2s;
                }
            }
        }
    }
`;