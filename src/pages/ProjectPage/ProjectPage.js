import { useEffect, useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../../styled/ThemeVariables';

// components
import Bug from './components/Bug.js';
import CommentSection from './components/CommentSection';
import ProjectPageLoader from '../../loaders/ProjectPageLoader';

// router
import { Link, useParams } from 'react-router-dom';

export default function ProjectPage({ user, role }) {

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
        getProject(projectId);
    }, [ projectId, bugId ]);


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
                    <div className="title-wrapper">
                        <div className="left-container">
                            <h2>Project: <span>{project.projectTitle}</span></h2>
                            <h2>Started: <span>{project.startDate}</span></h2>
                        </div>
                        <div className="right-container">
                            <a href={project.projectLink} target="_blank" rel="noreferrer">Project Link</a>
                            <Link id="add-bug" to={`/${projectId}/AddBugPage`}>Add Bug</Link>
                        </div>
                    </div>
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
                                                    projectTitle={project.projectTitle}
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
    width: 90%;
    max-width: 1000px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
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
    .title-wrapper {
        margin: 10px auto;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
            @media (max-width: 750px){
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
            }
            .left-container, .right-container {
                h2 {
                    color: #bbbbbb;
                    font-size: 18px;
                    @media (max-width: 750px){
                        display: flex;
                        flex-direction: column;
                    }
                    span {
                        color: #ffffff;
                        font-size: ${pallette.subtitleSize};
                        @media (max-width: 750px){
                            font-size: 20px;
                        }
                    }
                }
                h2:last-child {
                    margin-top: 20px;
                }
                a {
                    font-weight: 700;
                    font-size: ${pallette.subtitleSize};
                    color: #ffffff;
                    @media (max-width: 750px){
                        margin-top: 40px;
                        font-size: 20px;
                    }
                    &:hover{
                        cursor: pointer;
                        text-decoration: underline;
                        text-underline-position: under;
                    }
                }
                #add-bug {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #ffffff;
                    padding: 4px 10px;
                    border-radius: 4px;
                    font-size: ${pallette.subtitleSize};
                    font-weight: 700;
                    color: ${pallette.accentColor};
                    width: 200px;
                    margin-left: auto;
                    margin-top: 20px;
                    &:hover{
                        color: #ffffff;
                        cursor: pointer;
                        background: #000000;
                        transition: 0.2s;
                        text-decoration: none;
                    }
                    @media (max-width: 750px){
                        font-size: 20px;
                    }
                }
            }
            .right-container {
                @media (max-width: 750px){
                    margin-top: 20px;
                }
            }
        }
    }
    .active-wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        margin-top: 16px;
        flex-direction: column;
        align-items: center;
        .status-filter-container {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;
            margin: 10px auto;
            @media (max-width: 800px){
                flex-direction: column;
                justify-content: left;
                text-align: left;
                align-items: normal;
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
        width: 100%;
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