import { useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// router
import { Link } from 'react-router-dom';

// images
import X from "../images/whiteX.png";
import Edit from "../images/editIconWhite.png";

// components
import Loader from '../loaders/Loader';

export default function Project({
    projectId, 
    title, 
    date, 
    author,
    user,
    role,
    confirmRole,
    projectImage
}) {

    const [ isLoading, setLoading ] = useState(false);


    function deleteProject(){
        const result = window.confirm("Are you sure you want to delete?");
        if(result === true){
            setLoading(true);
            axios.delete(`${process.env.REACT_APP_DELETE_PROJECT_URL}/${projectId}`)
            .then(function(response){
                if(response.data !== "Project Deleted"){
                    setLoading(false);
                    alert("Server Error - Project not updated")
                } else {
                    setLoading(false);
                    alert('Project Deleted!');
                    window.location.reload();
                }
            })
        }
    }

    function unauthorized(){
        alert("You do not have permission to do that!")
    }

    return (
        <StyledProject>
            {
                isLoading === true ? (
                    <Loader />
            ) : (
                <>
            <Link to={`/projects/${projectId}`} id="background-color">
                <div className="info-container">
                    <img id="projectImage" src={projectImage} alt="" />
                    <h2 id="title">{title}<span>{date}</span></h2>
                </div>
            </Link>
            {
                author === user || role === process.env.REACT_APP_ADMIN ? (
                    <img id="delete" src={X} onClick={()=>{confirmRole(); deleteProject();}} alt="" />
                ) : (
                    <img id="delete" src={X} onClick={()=>{unauthorized();}} alt="" />
                )
            }
            <Link id="edit-link" to={`/EditProject/${projectId}`}><img id="edit-button" src={Edit} alt="" /></Link>
            </>
            )}
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
    #delete {
        width: 20px;
        position: absolute;
        top: 2%;
        right: 5%;
        z-index: 3;
        cursor: pointer;
        &:hover {
            transform: scale(1.2);
            transition: 0.2s;
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