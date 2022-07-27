import { useEffect, useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../styled/ThemeVariables.js';

// components
import BugPageLoader from '../loaders/BugPageLoader';

// router
import { Link, useParams } from 'react-router-dom';

export default function BugPage({
    user, 
    role, 
    rerender,
    setRerender,
    project
}) {

    const { projectId, bugId } = useParams();

    const [ author , setAuthor ] = useState("");
    const [ bug, setBug ] = useState([]);
    const [ isLoading, setLoading ] = useState(true);
    const [ options, setOptions ] = useState([]);
    const [ images, setImages ] = useState([]);

    useEffect(() => {
        const getSprints = () => {
            axios.get(`${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
            .then(function (response){
                setOptions(response.data.sprints);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        const getBug = (projectId, bugId) => {
            axios.get(`${process.env.REACT_APP_GET_BUG_URL}/${projectId}/${bugId}`)
            .then(function (response){
                setBug(response.data[0].bugs[0]);
                setOptions(response.data);
                setAuthor(response.data[0].bugs[0].author);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        setImages(bug.images);
        getSprints(projectId);
        getBug(projectId, bugId);
    }, [ projectId, bugId, project, isLoading, rerender ]);

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
                    <h1>{bug.title}</h1>
                    <div className="bug-container">
                        <div className="info-container">
                            <h2><span>Creator: </span>{bug.author}</h2>
                            <h2><span>Created: </span>{bug.date}</h2>
                            <h2><span>Updated: </span>{bug.lastUpdate}</h2>
                        </div>
                        <div className="info-container">
                            <h3><span>Tag: </span> {bug.tag}</h3>
                            <h3><span>Priority: </span> {bug.priority}</h3>
                            <h3><span>Status: </span> {bug.status}</h3>
                            <h3><span>Sprint: </span> 
                                {
                                    bug.sprint === undefined || bug.sprint === ""
                                    ? <>None</>
                                    : <>{bug.sprint}</>
                                }
                            </h3>
                        </div>
                    </div>
                    <p><span>Description: </span> {bug.description}</p>
                    <img src={bug.thumbnail} alt=""/>
                </div>
            }
                {
                    images === undefined || images.length === 0
                    ? <>
                        <h1>No Images Yet</h1>
                    </>
                    : <div className="images-wrapper">
                        { 
                            images.map((image, index) => {
                                return (
                                    <>
                                        <img src={image.image} alt="" key={index}/>
                                        <div id="modal">
                                            <span className="close-btn">&times;</span>
                                            <img className="modal-image" src={image.image} alt={image.caption} />
                                            <p id="caption">{image.caption}</p>
                                        </div>
                                    </>
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
        top: 0;
        left: -80px;
        width: 100%;
    }
    @media (max-width: 428px){
        padding: 10px;
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
        h1 {
            color: white;
            font-size: 30px;
            margin: 10px 0;
            @media (max-width: 450px){
                font-size: 20px;
            }
        }
        .bug-container {
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
                    margin: 10px 0;
                    font-weight: 400;
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
            }
        }
        p {
            color: white;
            font-size: 16px;
            display: flex;
            flex-direction: column;
            margin: 30px 0;
            span {
                color: ${pallette.helperGrey}
            }
        }
    }
    .images-wrapper {
        display: flex;
        justify-content: space-between;
        flex-grow: 1;
            img {
                width: 100%;
                height: 100%;
                border-radius: 12px 12px 0 0;
            }
        /* The Modal (background) */
        #modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            padding-top: 100px; /* Location of the box */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.9); /* Black w/ opacity */


        /* Modal Content (Image) */
        .modal-image {
            margin: auto;
            display: block;
            width: 80%;
            max-width: 700px;
        }

        /* Caption of Modal Image (Image Text) - Same Width as the Image */
        #caption {
        margin: auto;
        display: block;
        width: 80%;
        max-width: 700px;
        text-align: center;
        color: #ccc;
        padding: 10px 0;
        height: 150px;
        }
    }
}
        
`;