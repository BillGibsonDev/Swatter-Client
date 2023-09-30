import styled from "styled-components";
import * as palette from '../../../styled/ThemeVariables.js';

export const MainNavbar = () => {

  return (
    <StyledNav>
        <div className="dropdown-wrapper">
            <a href="#Introduction">Introduction</a>
            <div className="dropdown-container">
                <a href="#About">About</a>
                <a href="#Features">Features</a>
            </div>
        </div>
        <div className="dropdown-wrapper">
            <a href="#Getting-Started">Getting Started</a>
            <div className="dropdown-container">
                <a href="#Creating-A-Profile">Creating A Profile</a>
                <a href="#Quick-Creating-A-Project">Creating A Project</a>
                <a href="#Quick-Adding-Members">Adding Members</a>
            </div>
        </div>
        <div className="dropdown-wrapper">
            <a href="#Profile">Profile</a>
            <div className="dropdown-container">
                <a href="#Updating-Email">Updating Email</a>
                <a href="#Updating-Username">Updating Username</a>
                <a href="#Updating-Password">Updating Password</a>
                <a href="#Updating-Avatar">Updating Avatar</a>
                <a href="#Deleting-Account">Deleting Account</a>
            </div>
        </div>
        <div className="dropdown-wrapper">
            <a href="#Projects">Projects</a>
            <div className="dropdown-container">
                <a href="#Project-Side-Menu">Project Side Menu</a>
                <a href="#Creating-A-Project">Creating A Project</a>
                <a href="#Editing-A-Project">Editing A Project</a>
                <a href="#Adding-Members">Adding Members</a>
                <a href="#Pages">Pages</a>
            </div>
        </div>
        <div className="dropdown-wrapper">
            <a href="#Tickets">Tickets</a>
            <div className="dropdown-container">
                <a href="#Creating-Tickets">Creating Tickets</a>
                <a href="#Editing-Tickets">Editing Tickets</a>
                <a href="#Comments-for-Tickets">Comments for Tickets</a>
            </div>
        </div>
        <div className="dropdown-wrapper">
            <a href="#Sprints">Sprints</a>
            <div className="dropdown-container">
                <a href="#Creating-Sprints">Creating Sprints</a>
                <a href="#The-Sprint-Table">The Sprint Table</a>
                <a href="#Editing-Sprints">Editing Sprints</a>
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
    max-width: 200px;
    padding-top: 50px;
    overflow-y: scroll;
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