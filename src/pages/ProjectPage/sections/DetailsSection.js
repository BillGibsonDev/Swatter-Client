// styled
import styled from 'styled-components';
import * as pallette from '../../../styled/ThemeVariables.js';

// images
import X from '../../../assets/icons/whiteX.png';
import Edit from "../../../assets/icons/editIconWhite.png";
// router
import { Link } from 'react-router-dom';

export default function DetailsSection({user, role, project, toggleDetails, detailsSection}) {

    console.log(project)

    return (
        <StyledDetails ref={detailsSection}>
            <div className="links-wrapper">
                <div className="breadcrumbs">
                    <Link to={`/`}>Home</Link><span>/</span>
                    <Link to={`/`}>{project.projectTitle}</Link><span>/</span>
                    <p>Details</p>
                </div>
                <button className="exit-btn" id="exit-btn" onClick={() => {toggleDetails()}}><img id="exit-btn-icon" src={X} alt="Exit" /><span className="tooltiptext">Close</span></button>
            </div>
            <div className="title-container">
                <h1>{project.projectTitle}</h1>
                <Link id="edit-btn" to={`/EditProject/${project._id}`}><img id="edit-btn-icon" src={Edit} alt="" /><span className="tooltiptext">Edit Project</span></Link>
            </div>
        </StyledDetails>
    ) 
}

const StyledDetails = styled.div`
    display: none;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    position: absolute;
    z-index: 1000;
    background: ${pallette.accentColor};
    border-radius: 12px;
    padding: 2%;
    left: -50px;
    z-index: 3;
    @media (max-width: 1440px){
        width: 100%;
        left: -15px;
    }
    @media (max-width: 834px){
        top: 0;
        left: -80px;
        margin: 0;
        width: 100vw;
        height: 100%;
        border-radius: 0;
    }
    @media (max-width: 428px){
        left: -60px;
        padding: 10px;
    }
    .exit-btn {
        background: none;
        border: none;
        width: 30px;
        height: 30px;
        position: absolute;
        top: 10px;
        right: 10px;
        #exit-btn-icon {
            width: 30px;
            height: 30px;
            cursor: pointer;
        }
        .tooltiptext {
            visibility: hidden;
            width: 100%;
            min-width: 160px;
            background-color: black;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 5px 0;
            position: absolute;
            z-index: 1000;
            top: 0;
            right: 105%;
        }
    }
    #exit-btn:hover .tooltiptext, #exit-btn:active .tooltiptext {
        visibility: visible;
        transition-delay: 1s;
    }
    .breadcrumbs {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        @media (max-width: 428px){
            display: none;
        }
        a, button {
            border: none;
            background: none;
            font-size: 16px;
            color: ${pallette.helperGrey};
            cursor: pointer;
            @media (max-width: 450px){
                font-size: 12px;
            }
            &:hover {
                color: white;
            }
        }
        p {
            font-size: 16px;
            color: ${pallette.helperGrey};
            @media (max-width: 450px){
                font-size: 12px;
            }
        }
        span {
            margin: 0 10px;
            color: white;
        }
    }
    .title-container {
        display: flex;
        width: 300px;
        justify-content: space-between;
        align-items: center;
        h1 {
            color: white;
            font-size: 30px;
        }
        #edit-btn {
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
                margin-left: 6px;
                @media (max-width: 450px){
                    left: 30%;
                }
            }
            #edit-btn-icon {
                width: 100%;
                height: 100%;
                cursor: pointer;
                &:hover {
                    transform: scale(1.05);
                    transition: 0.2s;
                }
            }
        }
        #edit-btn:hover .tooltiptext, #edit-btn:active .tooltiptext, #edit-btn:focus .tooltiptext {
            visibility: visible;
            transition-delay: 1s;
        }
    }
`;