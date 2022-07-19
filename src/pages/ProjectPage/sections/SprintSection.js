import { useState, useEffect, useRef } from 'react';

// styled
import styled from 'styled-components';
import * as pallette from '../../../styled/ThemeVariables';

// components
import SprintBugTable from '../components/BugTable.js';
import { Searchbar } from '../forms/Searchbar';
import { SprintForm } from '../forms/SprintForm.js';
import { EditSprintForm } from '../forms/EditSprintForm.js';

// images
import X from '../../../assets/icons/whiteX.png';
import Edit from "../../../assets/icons/editIconWhite.png";

// loaders
import ProjectPageLoader from '../../../loaders/ProjectPageLoader';

export default function SprintSection({ 
    user, 
    role, 
    confirmRole, 
    projectId, 
    sprintSectionRef, 
    toggleBug,
    rerender,
    setRerender,
    bugs,
    openBugs, 
    underwayBugs, 
    reviewBugs, 
    completedBugs,
    bugSectionRef,
    setSectionProjectId,
    setSectionBugId,
    project,
    isLoading,
    toggleSprints
}) {

    const sprintForm = useRef();
    const editSprintForm = useRef();

    const [ searchSprint, setSearchSprint ] = useState(false);
    const [ options, setOptions ] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setOptions(project.sprints);
        }, 1000);
        if(project.sprints){
            handleEndDate(project.sprints[0].endDate);
        }
    }, [project, searchSprint]) 

    const toggleSprintForm = () => {
        let section = sprintForm.current;
        if (section.style.display === "none") {
            section.style.display = "flex";
        } else {
            section.style.display = "none";
        }
    }

    const toggleEditSprintForm = () => {
        let section = editSprintForm.current;
        if (section.style.display === "none") {
            section.style.display = "flex";
        } else {
            section.style.display = "none";
        }
    }

    const handleEndDate = (x) => {
        let newArr = x.split(/[ -]+/);
        return `${newArr[1]}/${newArr[2]}/${newArr[0]}`;
    }

    return (
        <StyledSprintSection ref={sprintSectionRef} style={{display: "none"}}>
            <div className="button-wrapper">
                <button onClick={() => {toggleSprintForm()}}>New Sprint</button>
                { 
                    options === undefined 
                    ? <></>
                    :<select 
                        onChange={(event) => {
                            setSearchSprint(event.target.value);
                            setRerender(!rerender);
                        }}>
                            <option value=""></option>
                        {
                            options.map((sprint, key) => {
                                return(
                                    <option key={key} id={sprint._id} value={`${sprint.title}`}>{sprint.title}</option>
                                )
                            })
                        }
                    </select>
                }
                <button id="exit-btn" onClick={() => { toggleSprints()}}><img id="exit-btn-icon" src={X} alt="Exit" /><span className="tooltiptext">Close</span></button>
            </div>
            <div className="sprint-list-wrapper">
                {
                    project.sprints === undefined 
                    ? <></>
                    : <>
                        { 
                            project.sprints.filter(sprint => sprint.title === searchSprint).map((sprint, key) =>{
                            return (
                                <div className="title-wrapper" key={key}>
                                    <div className="title-container">
                                        <h4>{sprint.title}</h4>
                                        <button onClick={() => {toggleEditSprintForm()}}><img id="edit-button" src={Edit} alt="" /><span className="tooltiptext">Edit Sprint</span></button>
                                    </div>
                                    <div className="info-container">
                                        <h5><span>Updated:</span> {sprint.updated}</h5>
                                        {
                                            sprint.endDate === "" 
                                            ? <></>
                                            : <h5><span>End date: </span>{handleEndDate(sprint.endDate)}</h5>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </>
                }
            </div>
            <SprintForm
                projectId={projectId}
                toggleSprintForm={toggleSprintForm}
                sprintForm={sprintForm}
                setRerender={setRerender}
                rerender={rerender}
                confirmRole={confirmRole}
                role={role}
            />
            {
                searchSprint === undefined &&  project.sprints === undefined
                ? <></>
                : <EditSprintForm
                    projectId={projectId}
                    toggleEditSprintForm={toggleEditSprintForm}
                    editSprintForm={editSprintForm}
                    setRerender={setRerender}
                    rerender={rerender}
                    project={project}
                    searchSprint={searchSprint}
                    confirmRole={confirmRole}
                    role={role}
                />
            }
            {
                isLoading === true 
                ? <ProjectPageLoader />
                : <div className="sprint-bug-table-wrapper">
                    <Searchbar />
                    { 
                        bugs === undefined 
                        ? <div className="undefined">
                            <h1>You've havent entered any bugs</h1>
                        </div>
                        : <>
                            <SprintBugTable
                                setRerender={setRerender}
                                rerender={rerender}
                                user={user}
                                bugs={bugs}
                                openBugs={openBugs.filter(openBugs =>  openBugs.sprint === searchSprint)}
                                underwayBugs={underwayBugs.filter(underwayBugs =>  underwayBugs.sprint === searchSprint)}
                                reviewBugs={reviewBugs.filter(reviewBugs =>  reviewBugs.sprint === searchSprint)}
                                completedBugs={completedBugs.filter(completedBugs =>  completedBugs.sprint === searchSprint)}
                                setSectionProjectId={setSectionProjectId}
                                setSectionBugId={setSectionBugId}
                                projectId={projectId}
                                project={project}
                                toggleBug={toggleBug}
                                bugSectionRef={bugSectionRef}
                                searchSprint={searchSprint}
                            />
                        </>
                    }
                </div>
            }
        </StyledSprintSection>
    )
}

const StyledSprintSection = styled.div`
    display: none;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    position: absolute;
    z-index: 101;
    background: ${pallette.accentColor};
    border-radius: 12px;
    padding: 2%;
    left: -50px;
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
    #exit-btn {
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
    .button-wrapper {
        max-width: 70vw;
        display: flex;
        select, button {
            cursor: pointer;
            height: 30px;
            width: 150px; 
            option {
                font-size: 20px;
            }
        }
    }
    .sprint-list-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 70vw;
        .title-wrapper {
            display: flex;
            align-items: center;
            flex-direction: column;
            height: 10vh;
            @media (max-width: 450px){
                margin-top: 20px;
            }
            .title-container {
                display: flex;
                width: 600px;
                margin-right: auto;
                align-items: center;
                h4 {
                    color: white;
                    font-size: 30px;
                    margin-top: auto;
                    margin-right: 16px;
                }
                button {
                    width: 30px;
                    height: 30px;
                    z-index: 3;
                    background: none;
                    border: none;
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
                        transition: 0.2s;
                        &:hover {
                            transform: scale(1.05);
                        }
                    }
                }
                #edit-link:hover .tooltiptext, #edit-link:active .tooltiptext, #edit-link:focus .tooltiptext {
                    visibility: visible;
                    transition-delay: 1s;
                }
            }
            .info-container {
                display: flex;
                width: 100%;
                justify-content: space-between;
                @media (max-width: 450px){
                   flex-direction: column;
                }
                h5 {
                    color: white;
                    @media (max-width: 450px){
                        margin-bottom: 6px;
                    }
                    span {
                        color: ${pallette.helperGrey};
                    }
                }
            }
        }
    }
    .sprint-bug-table-wrapper {
        overflow: scroll;
        scrollbar-width: none;
        -ms-overflow-style: none;
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        &::-webkit-scrollbar {
            display: none;
            width: none;
        }
    }
`;