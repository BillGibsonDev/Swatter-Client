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

    console.log(options)

    const [ status, setStatus ] = useState(bug.status);
    const [ description, setDescription ] = useState(bug.description);
    const [ priority, setPriority ] = useState(bug.priority);
    const [ tag, setTag ] = useState(bug.tag);
    const [ sprint, setSprint ] = useState(bug.sprint);

    const updateBug = () => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_UPDATE_BUG_URL}/${projectId}/${bugId}`, {
            description: description,
            status: status,
            tag: tag,
            priority: priority,
            projectId: projectId,
            bugId: bug._id,
            sprint: sprint,
            images: images,
        })
        .then(function(response) {
            if(response.data !== "Bug Updated"){
                setLoading(false);
                alert("Server Error - Bug not updated")
            } else {
                setLoading(false);
                alert('Bug Updated!');
                setRerender(!rerender);
            }
        })
    }

    const deleteBug = () => {
        const result = window.confirm("Are you sure you want to delete?");
        if(result === true){
            setLoading(true);
            axios.post(`${process.env.REACT_APP_DELETE_BUG_URL}/${projectId}/${bugId}`)
            .then(function(response) {
                if(response.data !== "Bug Deleted"){
                    setLoading(false);
                    alert("Server Error - Bug not deleted")
                } else {
                    setLoading(false);
                    alert('Bug Deleted');
                    setRerender(!rerender);
                }
            })
        }
    }

    const unauthorized = () => {
        alert("You do not have permissions to do that!")
    }

    const removeImage = ( imageId ) => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_UPDATE_BUG_URL}/${projectId}/${bugId}/${imageId}`)
        .then(function(response) {
            if(response.data !== "Image Deleted"){
                setLoading(false);
                alert("Server Error - Image not updated")
            } else {
                setLoading(false);
                alert('Image Deleted');
                setRerender(!rerender);
            }
        })
    }

    const handleAddFields = () => {
        const values = [...images];
        values.push({ caption: '', image: ''});
        setImages(values);
    };

    const handleRemoveFields = index => {
        const result = window.confirm("Are you sure you want to delete?");
        if(result === true){
        const values = [...images];
        values.splice(index, 1);
        setImages(values);
    }};

  const handleInputChange = (index, event) => {
    const values = [...images];
    if (event.target.id === "image") {
      values[index].image = event.target.value;
    } else if(event.target.id === "caption") {
      values[index].caption = event.target.value;
    }
    setImages(values);
  };

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
                :<div className="bug-container">
                    <h1>{bug.title}</h1>
                    <div className="info-wrapper">
                        <div className="info-container">
                            <h2><span>Creator: </span>{bug.author}</h2>
                            <h2><span>Created: </span>{bug.date}</h2>
                            <h2><span>Updated: </span>{bug.lastUpdate}</h2>
                        </div>
                        <div className="selector-container">
                            <label>Tag:
                                <select 
                                    id="tag"
                                    defaultValue={bug.tag}
                                    onChange={(event) => {
                                        setTag(event.target.value);
                                    }}>
                                    <option value={bug.tag}>{bug.tag}</option>
                                    <option value="Bug">Bug</option>
                                    <option value="Feature">Feature</option>
                                    <option value="Enhancement">Enhancement</option>
                                    <option value="Task">Task</option>
                                </select>
                            </label>
                            <label>Priority:
                                <select
                                    id="priority"
                                    defaultValue={bug.priority}
                                    onChange={(event) => {
                                        setPriority(event.target.value);
                                }}>
                                    <option value={bug.priority}>{bug.priority}</option>
                                    <option value="Standard">Standard</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </label>
                            <label>Status:
                                <select
                                    id="status"
                                    defaultValue={bug.status}
                                    onChange={(event) => {
                                        setStatus(event.target.value);
                                    }}>
                                    <option value={bug.status}>{bug.status}</option>
                                    <option value="Open">Open</option>
                                    <option value="Underway">Underway</option>
                                    <option value="Reviewing">Reviewing</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </label>
                            <label>Sprint:
                                <select
                                    id="sprint"
                                    defaultValue={bug.sprint}
                                    onChange={(event) => {
                                        setSprint(event.target.value);
                                    }}>
                                    <option value={bug.sprint}>{bug.sprint}</option>
                                    {
                                        options.map((sprint, key) => {
                                            return(
                                                <option key={key} value={`${sprint.title}`}>{sprint.title}</option>
                                            )
                                        })
                                    }
                                    <option value="">None</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <label>Description
                        <textarea 
                            name="description" 
                            id="description"
                            key={bug.description}
                            defaultValue={bug.description} 
                            cols="30" 
                            rows="10"
                            onChange={(event) => {
                                setDescription(event.target.value);
                            }} 
                        />
                    </label>
                    <img src={bug.thumbnail} alt=""/>
                </div>
            }
                {
                    images === undefined 
                    ? <>
                        <h1>No Images Yet</h1>
                    </>
                    : <>
                        { 
                   images.map((image, index) => {
                        return (
                            <div id="paragraph-section" key={index}>
                                <div className="info-container">
                                    <div className="input-container">
                                        <img className="preview-image" id="image" src={image.image} alt="" />
                                        <label>Image
                                            <input
                                                type="text"
                                                id="image"
                                                name="image"
                                                defaultValue={image.image}
                                                onChange={event => handleInputChange(index, event)}
                                        /></label>
                                        <label>Caption
                                            <input
                                                type="text"
                                                id="caption"
                                                name="caption"
                                                defaultValue={image.caption}
                                                onChange={event => handleInputChange(index, event)}
                                        /></label>
                                    </div>
                                </div>
                                <button  id="delete" onClick={(e) => { removeImage(image._id); handleRemoveFields(); }}>Remove</button>
                            </div>
                        )
                    })
                }
                    </>
                }
                <button onClick={handleAddFields}>Add Image</button>
            <div className="button-container">
                {
                    author === user || role === process.env.REACT_APP_ADMIN_SECRET 
                    ? <>
                        <button onClick={() => {updateBug(); setRerender(!rerender)}}>Save</button>
                        <button  id="delete" onClick={() => { deleteBug();}}>Delete</button>
                    </>
                    : <>
                        <button onClick={unauthorized}>Save</button>
                        <button id="delete" onClick={unauthorized}>Delete</button>
                    </>
                }
            </div>
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
    .bug-container {
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
        .info-container, .selector-container {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            width: 100%;
            margin: 10px 0 10px 0;
            @media (max-width: 700px){
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }
            h2 {
                color: white;
                font-size: 16px;
                display: flex;
                flex-direction: column;
                width: 90%;
                margin: 10px 0;
                font-weight: 400;
                span {
                    color: #cecece;
                    font-weight: 400;
                    font-size: 16px;
                    @media (max-width: 450px){
                        font-size: 12px;
                    }
                }
            }
            label {
                display: flex;
                flex-direction: column;
                color: white;
                margin: 10px 0;
                font-weight: 400;
                font-size: ${pallette.labelSize};
                @media (max-width: 750px){
                    font-size: 14px;
                }
                @media (max-width: 450px){
                    margin: 10px 0;
                }
                select {
                    cursor: pointer;
                    width: 90%;
                    font-size: 16px;
                    background: ${pallette.helperGrey};
                    font-weight: 400;
                    @media (max-width: 450px){
                        font-size: 14px;
                    }
                }
            }
        }
        img {
            width: 300px;
        }
    }
    label {
        display: flex;
        color: white;
        flex-direction: column;
        margin: 10px 0;
        font-size: ${pallette.labelSize};
        @media (max-width: 750px){
            font-size: 14px;
        }
        @media (max-width: 450px){
            margin: 10px 0;
        }
        input, select {
            width: 100%;
            height: 30px;
            padding: 2px;
            background: ${pallette.helperGrey};
        }
        textarea {
            padding: 10px;
            background: ${pallette.helperGrey};
        }
    }
    .button-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 30px;
        button {
            width: 200px;
            height: 40px;
            cursor: pointer;
            border: none;
            border-radius: 6px;
            font-weight: 700;
            font-size: 18px;
            transition: 0.2s;
            @media (max-width: 1050px){
                margin: 10px 0;
                width: 150px;
            }
            @media (max-width: 450px){
                font-size: 16px;
                width: 100px;
                margin-bottom: 0;
            }
            &:hover {
                color: #ffffff;
                background: #000000;
                transform: scale(1.05);
            }
        }
    }
    .preview-image {
        height: 200px;
        width: 200px;
    }
`;