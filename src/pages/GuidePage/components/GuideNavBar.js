import styled from "styled-components";
import * as palette from '../../../styled/ThemeVariables.js';

export const MainNavbar = () => {

  return (
    <StyledNav>
        <div className="dropdown-wrapper">
            <a href="#Introduction">Introduction</a>
        </div>
        <div className="dropdown-wrapper">
            <a href="#Getting-Started">Getting Started</a>
            <div className="dropdown-container">
                <a href="#Creating-A-Profile">Creating A Profile</a>
                <a href="#Quick-Creating-A-Project">Creating A Project</a>
                <a href="#Quick-Creatie-Tickets">Create Tickets</a>
                <a href="#Quick-Adding-Members">Adding Members</a>
            </div>
        </div>
        <div className="dropdown-wrapper">
            <a href="#Projects">Projects</a>
            <div className="dropdown-container">
                <a href="#Create-A-Project">Creating A Project</a>
                <a href="#Project-Menu">Project Side Menu</a>
                <a href="#Project-Pages">Project Pages</a>
                <a href="#Editing-A-Project">Editing A Project</a>
                <a href="#Adding-Members">Adding Members</a>
            </div>
        </div>
        <div className="dropdown-wrapper">
            <a href="#Tickets">Tickets</a>
            <div className="dropdown-container">
                <a href="#Creating-Tickets">Creating Tickets</a>
                <a href="#Editing-Tickets">Editing Tickets</a>
                <a href="#Comments-For-Tickets">Comments for Tickets</a>
            </div>
        </div>
    </ StyledNav>
  )
}

const StyledNav = styled.nav`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
    height: 90vh;
    max-width: 200px;
    top: 5vh;
    overflow: auto;
    position: sticky;
    .dropdown-wrapper {
        display: flex;
        flex-direction: column;
        margin-left: 10%;
        margin-bottom: 20px;
        a {
            color: white;
            font-size: 1.2em;
            margin-bottom: 8px;
            transition: 0.2s ease-in-out;
            &:hover {
                color: ${palette.accentColor};
            }
        }
        .dropdown-container {
            display: flex;
            flex-direction: column;
            a {
                margin-bottom: 8px;
                color: ${palette.helperGrey};
                font-size: 1em;
                transition: 0.2s ease-in-out;
                &:hover {
                    color: ${palette.accentColor};
                }
            }
        }
    }
`;