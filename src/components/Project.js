// styled
import styled from 'styled-components';

// router
import { Link } from 'react-router-dom';

// images
import Edit from "../images/editIconWhite.png";

export default function Project({
    projectId, 
    title, 
    date, 
    projectImage
}) {

    return (
        <StyledProject>
            <Link to={`/projects/${projectId}`} id="background-color">
                <div className="info-container">
                    <img id="projectImage" src={projectImage} alt="" />
                    <h2 id="title">{title}<span>{date}</span></h2>
                </div>
            </Link>
            <Link id="edit-link" to={`/EditProject/${projectId}`}><img id="edit-button" src={Edit} alt="" /></Link>
        </StyledProject>
    )
}

const StyledProject = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 300px;
    margin: 10px auto;
    position: relative;
    background: #1673dd;
    border-radius: 4px;
    &:hover{
        transition: 0.2s;
        transform: scale(1.01);
        background: #a7a7a7;
    }
    a {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 16px;
        height: 100%;
        width: 100%;
        .info-container {
            display: flex;
            justify-content: center;
            flex-direction: column;
            width: 90%;
            margin: auto;
            #projectImage {
                width: 150px;
                margin-bottom: 10px;
                @media (max-width: 750px){
                    width: 100px;
                }
            }
            h2 {
                font-size: 1.2em;
                color: #ffffff;
                display: flex;
                flex-direction: column;
                span {
                    margin-top: 10px;
                }
                @media (max-width: 750px){
                    font-size : 2em;
                }
            }
        }
        .data-container {
            width: 90%;
            margin: auto;
        }
    }
    #edit-link {
        width: 30px;
        #edit-button {
            width: 30px;
            position: absolute;
            top: 85%;
            right: 5%;
            z-index: 3;
            cursor: pointer;
            &:hover {
                transform: scale(1.2);
                transition: 0.2s;
            }
        }
    }
`;