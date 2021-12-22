import { useEffect, useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// components
import Bug from '../components/Bug.js';
import CommentSection from '../components/CommentSection';
import ProjectPageLoader from '../loaders/ProjectPageLoader';

// router
import { Link, useParams } from 'react-router-dom';

export default function ProjectPage({user, role, lastLogin}) {

    const { projectId, bugId } = useParams();

    const [ bugs, setBugs ] = useState([]);
    const [ project, setProject ] = useState([]);

    // data states
    const [ totalBugs, setTotalBugs ] = useState(0);
    const [ openBugs, setOpenBugs] = useState(0);
    const [ underwayBugs, setUnderwayBugs ] = useState(0);
    const [ reviewBugs, setReviewBugs ] = useState(0);
    const [ completedBugs, setCompletedBugs ] = useState(0);
    const [ isLoading, setLoading ] = useState(true);

    useEffect(() =>{
        getProject();
        // eslint-disable-next-line
    }, [ projectId, bugId ]);

    function getProject(){
        axios.get(`${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
        .then(function (response){
            setProject(response.data)
            setBugs(response.data.bugs)
            setLoading(false)
            setTotalBugs(response.data.bugs.length)
            setOpenBugs(response.data.bugs.filter(bugs => bugs.status === "Open").length)
            setUnderwayBugs(response.data.bugs.filter(bugs => bugs.status === "Underway").length)
            setReviewBugs(response.data.bugs.filter(bugs => bugs.status === "Reviewing").length)
            setCompletedBugs(response.data.bugs.filter(bugs => bugs.status === "Completed").length)
        })
        .catch(function (error) {
            console.log(error)
        });
    }


    const handleFilter = (e) => {
        let value = e.target.value
        let open = document.getElementsByClassName(value)
        let i;
        for (i = 0; i < open.length; i++) {
            if (open[i].style.display === "none"){
                open[i].style.display = "flex";
            } else {
                open[i].style.display = "none";
            }
        }
      };

    return (
        <StyledProjectPage>
            {
                isLoading === true ? (
                    <ProjectPageLoader />
                ) : (
                <>
                    <header>
                        <div className="project-title-container">
                            <div className="info-wrapper">
                                <h2>Project: <span>{project.projectTitle}</span></h2>
                                <h2>Started: <span>{project.startDate}</span></h2>
                                <a href={project.projectLink} target="_blank" rel="noreferrer">Project Link</a>
                            </div>
                            <Link id="add-bug" to={`/${projectId}/AddBugPage`}>Add Bug</Link>
                        </div>
                    </header>
                    { 
                        bugs === undefined ? (
                            <div className="undefined">
                                <h1>You've havent entered any bugs</h1>
                            </div>
                            ) : (
                            <>
                                <div className="active-wrapper">
                                    <div className="status-filter-container">
                                        <label><span>{openBugs}</span> Open
                                            <input 
                                                type="checkbox" 
                                                id="Open"
                                                value="Open"
                                                defaultChecked 
                                                onClick={handleFilter} />
                                        </label>
                                        <label><span>{underwayBugs}</span> Underway
                                            <input 
                                                type="checkbox" 
                                                id="Open" 
                                                value="Underway"
                                                defaultChecked 
                                                onClick={handleFilter}
                                                />
                                        </label>
                                        <label><span>{reviewBugs}</span>Reviewing
                                            <input 
                                                type="checkbox" 
                                                id="inReview" 
                                                value="Reviewing"
                                                defaultChecked 
                                                onClick={handleFilter}
                                                />
                                        </label>
                                        <label><span>{completedBugs}</span> Completed
                                            <input 
                                                type="checkbox" 
                                                id="completed" 
                                                value="Completed"
                                                defaultChecked
                                                onClick={handleFilter}
                                                />
                                        </label>
                                        <h5 id="total"><span>{totalBugs}</span>Total</h5>
                                    </div>
                                <div className="bugs-container">
                                    {
                                        bugs.slice().reverse().map((bug, key) => {
                                            return (
                                                <Bug
                                                    projectId = {projectId}
                                                    bugId={bug._id}
                                                    title={bug.title}
                                                    thumbnail = {bug.thumbnail}
                                                    description = {bug.description}
                                                    priority={bug.priority}
                                                    author={bug.author}
                                                    status={bug.status}
                                                    tag={bug.tag}
                                                    lastUpdate={bug.lastUpdate}
                                                    key={key}
                                                    user={user}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <CommentSection
                                role={role}
                                user={user}
                            />
                        </>
                    )}
                </>
                )
            }
        </StyledProjectPage>
    )
}

const StyledProjectPage = styled.div`
    min-height: 80vh;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    .undefined {
        background: white;
        width: 100%;
        min-height: 80vh;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
    }
    header {
        width: 100%;
        min-height: 10vh;
        justify-content: space-between;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .project-title-container {
        border-radius: 12px;
        margin: 10px auto;
        width: 90%;
        justify-content: space-between;
        display: flex;
        align-items: center;
            @media (max-width: 750px){
                width: 90%;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                margin: 10px auto;
            }
            .info-wrapper {
                h2 {
                    color: #bbbbbb;
                    font-size: 1.2em;
                    span {
                        color: #ffffff;
                        font-size: 1.5em;
                    }
                    @media (max-width: 750px){
                        font-size: 1em;
                        margin: 6px 0;
                    }
                }
                 a {
                    margin-bottom: 10px;
                    font-weight: 700;
                    font-size : 2em;
                    color: #ffffff;
                    &:hover{
                        color: #ffffff;
                        cursor: pointer;
                        background: #99a2ac;
                        transition: 0.2s;
                        transform: scale(1.01);
                    }
                }
            }
                #add-bug {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #ffffff;
                    padding: 0 6px;
                    border-radius: 4px;
                    font-size: 16px;
                    font-weight: bold;
                    color: #0f4d92;
                    @media (max-width: 750px){
                        margin: 10px 0;
                    }
                    &:hover{
                        color: #ffffff;
                        cursor: pointer;
                        background: #000000;
                        transition: 0.2s;
                        transform: scale(1.01);
                    }
                }
            }
    }
    .active-wrapper {
        height: 100%;
        display: flex;
        margin-top: 16px;
        flex-direction: column;
        align-items: center;
        .status-filter-container {
            display: flex;
            width: 90%;
            align-items: center;
            justify-content: space-between;
            margin: 10px auto;
            @media (max-width: 800px){
                width: 100%;
                flex-wrap: wrap;
                justify-content: center;
            }
            label, #total {
                display: flex;
                height: 100%;
                color: #ffffff;
                align-items: center;
                height: 100%;
                font-size: 20px;
                font-weight: 700;
                margin: 0 6px;
                @media (max-width: 750px){
                    font-size: 14px;
                }
                span {
                    color: #d1d1d1;
                    margin-right: 6px;
                }
                input {
                    border-radius: 4px;
                    border: none;
                    margin: 0 6px;
                    color: #000000;
                }
            }
        }
    .bugs-container {
        width: 98%;
        margin: auto;
        .Open, .Underway, .Reviewing, .Completed {
            display: flex;
            &:hover {
                background: #000000;
                border: 1px black solid;
            }
        }
    }
`;