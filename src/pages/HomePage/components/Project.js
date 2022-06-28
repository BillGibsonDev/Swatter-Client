// styled
import styled from 'styled-components';
import * as pallette from '../../../styled/ThemeVariables';

// router
import { Link } from 'react-router-dom';

// images
import Edit from "../../../assets/icons/editIconWhite.png";
import PlaceholderImage from '../../../assets/images/imagePlaceholder.png';

export default function Project({
    projectId, 
    title, 
    date, 
    projectImage
}) {

    return (
        <StyledProject>
            <Link className='project-image-link' to={`/projects/${projectId}`}><img className="project-image" src={projectImage === "" || undefined ? PlaceholderImage : projectImage} alt="" /></Link>
            <div className="text-container">
                <Link to={`/projects/${projectId}`}>{title}</Link>
                <div className="wrapper">
                    <h2>{date}</h2>
                    <Link className="edit-link" to={`/EditProject/${projectId}`}><img id="edit-button" src={Edit} alt="" /><span className="tooltiptext">Edit Project</span></Link>
                </div>
            </div>
        </StyledProject>
    )
}

const StyledProject = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 400px;
    margin: 10px auto;
    position: relative;
    background: #5c5c5c;
    border-radius: 4px;
    padding: 5%;
    @media (max-width: 450px){
        height: 100px;
        flex-direction: row;
        align-items: center;
        padding: 6px;
    }
    .project-image-link {
        display: flex;
        justify-content: center;
        flex-direction: column;
        min-height: 275px;
        max-height: 275px;
        height: 100%;
        margin-bottom: auto;
        @media (max-width: 450px){
            height: 70px;
            width: 80px;
            min-height: 70px;
            margin-bottom: 0;
        }
        .project-image {
            width: 100%;
            height: 100%;
            border-radius: 4px;
            @media (max-width: 450px){
                max-width: 70px;
                max-height: 70px;
            }
        }
    }
    .text-container {
        display: flex;
        position: relative;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        margin-left: 8px;
        a {
            font-size: ${pallette.subtitleSize};
            color: white;
            font-weight: 700;
            &:hover {
                text-decoration: underline;
                text-underline-position: under;
            }
            @media (max-width: 450px){
                font-size: 16px;
                margin-bottom: 0;
            }
        }
        h2 {
            font-size: ${pallette.subtitleSize};
            color: white;
            font-weight: 400;
            @media (max-width: 450px){
                font-size: 14px;
            }
        }
        .wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .edit-link {
                width: 30px;
                height: 30px;
                z-index: 3;
                @media (max-width: 450px){
                    margin-bottom: 0;
                    width: 24px;
                    height: 24px;
                }
                .tooltiptext {
                    font-size: 16px;
                    visibility: hidden;
                    width: 150px;
                    background-color: black;
                    color: #fff;
                    text-align: center;
                    border-radius: 6px;
                    padding: 5px 0;
                    position: absolute;
                    z-index: 1000;
                    top: 90%;
                    left: 50%;
                    @media (max-width: 450px){
                        left: 30%;
                    }
                }
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
            #edit-link:hover .tooltiptext, #edit-link:active .tooltiptext, #edit-link:focus .tooltiptext {
                visibility: visible;
                transition-delay: 1s;
            }
        }
    }
    
`;