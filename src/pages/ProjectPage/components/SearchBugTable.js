// styled
import styled from 'styled-components';
import * as pallette from '../../../styled/ThemeVariables';

// components
import { Bug } from './Bug.js';

export default function SearchBugTable({
    project,
    bugSearchPhrase
}) {

    // save me :)
    // Object.keys(bugObject).forEach((key) => {
    //     let string = `${bugObject[key]}`;
    //     string = string.toLowerCase();
    //     if(string.includes(bugSearchPhrase.toLowerCase())){
    //         if(array.findIndex(bug => bug._id === bugObject._id) < 0){
    //             bugArray.push(project.bugs[i])
    //         }
    //     }
    // })

const handleSearch = (status) => {
    let bugArray = [];
    if(bugSearchPhrase){
        let x = project.bugs.length;
        for ( let i = 0; x > i; i++ ){
            let bugObject = project.bugs[i];
            let index = bugArray.findIndex(bug => bug._id === bugObject._id)
            if( index < 0){
                Object.keys(bugObject).forEach((key) => {
                    let string = `${bugObject[key]}`;
                    string = string.toLowerCase();
                    if(string.includes(bugSearchPhrase.toLowerCase())){
                        if(bugArray.findIndex(bug => bug._id === bugObject._id) < 0){
                            bugArray.push(project.bugs[i])
                        }
                    }
                })
            }
        }
        return bugArray;
        } else {
            let array = project.bugs.filter(bug => bug.status === status).slice().reverse()
            return array;
        }
    }

   const filteredBugs = handleSearch();

    return (
        <StyledBugTable>
            { 
                !project.bugs
                ? <div className="undefined">
                    <h1>You've haven't entered any bugs</h1>
                </div>
                : <div className="bugs-container">
                        <h5>Results <span>{filteredBugs.length}</span></h5>
                        {
                            filteredBugs.map((bug, index) => {
                                return (
                                    <Bug
                                        bug={bug}
                                        project={project}
                                        key={index}
                                    />
                                )
                            })
                        }
                </div>
                            
            }
        </StyledBugTable>
    )
}

const StyledBugTable = styled.div`
    display: flex;
    height: 100%;
    max-height: 93vh;
    width: 100%;
    margin-top: 7vh;
    position: relative;
    max-width: 500px;
    .bugs-container {
        width: 100%;
        background: black;
        padding: 10px;
        background: #0b2849;
        border-radius: 12px;
        h5 {
            color: ${pallette.helperGrey};
            padding: 10px;
            font-size: ${pallette.paraSize};
            span {
                font-weight: 400;
            }
        }
        .Open, .Underway, .Reviewing, .Completed {
            display: flex;
            &:hover {
                background: #000000;
                border: 1px #ffffff63 solid;
            }
        }
    }
`;