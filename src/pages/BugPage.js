import { useEffect, useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../styled/ThemeVariables.js';

// components
import BugPageLoader from '../loaders/BugPageLoader';

// router
import { Link, useParams } from 'react-router-dom';

// images
import EditIcon from '../assets/icons/editIconWhite.png';

export default function BugPage({
    user, 
    role,
}) {

    const { projectId, bugId } = useParams();
    const [ bug, setBug ] = useState([]);
    const [ isLoading, setLoading ] = useState(true);
    const [ images, setImages ] = useState([]);

    useEffect(() => {
        const getBug = (projectId, bugId) => {
            axios.get(`${process.env.REACT_APP_GET_BUG_URL}/${projectId}/${bugId}`)
            .then(function (response){
                setBug(response.data[0].bugs[0]);
                setImages(response.data[0].bugs[0].images);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        getBug(projectId, bugId);
    }, [ projectId, bugId, isLoading ]);

    const handleModal = (index) => {
        let modal = document.getElementById(index);
        if(modal.style.display === "block"){
            modal.style.display = "none";
        } else {
            modal.style.display = "block";
        }
    }

    return (
        <StyledBugSection>
            <div className="breadcrumbs">
                <Link to={`/`}>Home</Link><span>/</span>
                <Link to={`/projects/${projectId}`}>Project</Link><span>/</span>
                {
                    bug === undefined
                    ? <></>
                    : <p>{bug.title}</p>
                }
            </div>
            {
                isLoading === true 
                ? <BugPageLoader />
                :<div className="bug-wrapper">
                    <div className="title-container">
                        <h1>{bug.title}</h1>
                        <Link to={`/${projectId}/${bugId}/edit`}><img src={EditIcon} alt="edit bug link" />Edit</Link>
                    </div>
                    <div className="info-wrapper">
                        <div className="info-container">
                            <h3><span>Tag: </span> {bug.tag}</h3>
                            <h3 className={bug.priority}><span>Priority: </span> {bug.priority}</h3>
                            <h3><span>Status: </span> {bug.status}</h3>
                            <h3><span>Sprint: </span> 
                                {
                                    bug.sprint === undefined || bug.sprint === ""
                                    ? <>None</>
                                    : <>{bug.sprint}</>
                                }
                            </h3>
                        </div>
                        <div className="info-container">
                            <h2><span>Creator: </span>{bug.author}</h2>
                            <h2><span>Created: </span>{bug.date}</h2>
                            <h2><span>Updated: </span>{bug.lastUpdate}</h2>
                        </div>
                    </div>
                    <p><span>Description: </span> {bug.description}</p>
                    <img src={bug.thumbnail} alt=""/>
                </div>
            }
            <h2>Images:</h2>
            {
                images === undefined || images.length === 0
                ? <><h2 style={{color: "white", marginTop: '6px'}}>None</h2></>
                : <div className="images-wrapper">
                    { 
                        images.map((image, index) => {
                            return (
                                <div key={index}>
                                    <div className="image-container">
                                        <img src={image.image} onClick={() => { handleModal(index)}} alt={image.caption}/>
                                        {
                                            image.caption.length > 50 
                                            ? <p>{image.caption.slice(0, 50)}...</p>
                                            : <p>{image.caption}</p>
                                        }
                                    </div>
                                    <div className="modal" id={index}>
                                        <button className="close-button" onClick={() => {handleModal(index)}}>&times;</button>
                                        <img className="modal-image" src={image.image} alt={image.caption} />
                                        <p id="caption">{image.caption}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </StyledBugSection >
    )
}

const StyledBugSection = styled.div`
    height: 100%;
    width: 70%;
    margin: 30px auto auto auto;
    @media (max-width: 834px){
        width: 90%;
        margin: 30px 0 auto auto;
    }
    @media (max-width: 428px){
        width: 85%;
        padding: 10px;
        margin: 0 0 auto auto;
    }
    .breadcrumbs {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        @media (max-width: 428px){
            display: none;
        }
        a {
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
    .bug-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: auto;
        .title-container {
            display: flex;
            align-items: center;
            h1 {
                color: white;
                font-size: 30px;
                margin: 10px 0;
                @media (max-width: 450px){
                    font-size: 20px;
                }
            }
            a {
                display: flex;
                align-items: center;
                cursor: pointer;
                color: white;
                font-size: 20px;
                padding: 4px 10px;
                border-radius: 8px;
                margin-left: 20px;
                img {
                    margin-right: 4px;
                    height: 20px;
                    width: 20px;
                }
                &:hover {
                    background: black;
                }
            }
        }
        .info-wrapper {
            display: flex;
            .info-container, .selector-container {
                width: 50%;
                margin: 10px 0;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                h2, h3 {
                    color: white;
                    font-size: 14px;
                    display: flex;
                    flex-direction: column;
                    width: 90%;
                    margin: 4px 0;
                    font-weight: 400;
                    @media (max-width: 450px){
                        font-size: 12px;
                    }
                    span {
                        color: #cecece;
                        font-weight: 400;
                        font-size: 12px;
                        @media (max-width: 450px){
                            font-size: 12px;
                        }
                    }
                }
                h3 {
                    flex-direction: row;
                    span {
                        margin-right: 6px;
                    }
                }
                .Standard {
                    color: lightgreen;
                }
                .Medium {
                    color: yellow;
                }
                .High {
                    color: red;
                }
            }
        }
        p {
            color: white;
            font-size: 16px;
            display: flex;
            flex-direction: column;
            margin: 30px 0;
            @media (max-width: 450px){
                font-size: 12px;
            }
            span {
                color: ${pallette.helperGrey}
            }
        }
    }
    h2 {
        color: ${pallette.helperGrey};
        font-size: 16px;
        font-weight: 400;
        margin-top: 20px;
    }
    .images-wrapper {
        display: flex;
        grid-gap: 20px;
        margin: 0 0 20px 0;
        width: 70%;
        height: auto;
        overflow-x: auto;
        @media (max-width: 850px){
            width: 90%;
        }
        .image-container {
            display: flex;
            flex-direction: column;
            width: 300px;
            height: 300px;
            img {
                cursor: pointer;
                width: 100%;
                height: 80%;
            }
            p {
                min-height: 20%;
                font-size: 12px;
                text-align: center;
                color: white;
                background: #2c272771;
            }
        }
        .modal {
            display: none; 
            position: fixed; 
            z-index: 1; 
            padding-top: 100px; 
            left: 0;
            top: 0;
            width: 100%; 
            height: 100%; 
            overflow: auto; 
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0,0.9); 
            .modal-image {
                margin: auto;
                display: block;
                width: 80%;
                max-width: 700px;
                }
            #caption {
                margin: auto;
                display: block;
                width: 80%;
                max-width: 700px;
                text-align: center;
                color: ${pallette.helperGrey};
                padding: 10px 0;
                height: 150px;
            }
            .close-button {
                position: absolute;
                top: 15px;
                right: 35px;
                color: #f1f1f1;
                font-size: 40px;
                font-weight: bold;
                cursor: pointer;
                background: none;
                border: none;
            }
        }
    }
`;