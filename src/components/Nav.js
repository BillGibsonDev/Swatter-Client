// styles
import styled from 'styled-components';
import * as palette from '../styled/ThemeVariables';

// router
import { Link } from 'react-router-dom';

// icons
import * as icon from '../assets/IconImports.js';

// redux
import { connect } from 'react-redux';

// components
import { ToggleProjectNav }from './ToggleProjectNav.js';

const Nav = ({ user, projectSideNavRef }) => {

    return (
        <StyledNav>
            <div className="top-container">
                <Link to="/"><img src={icon.Home} alt="Home" /><span className="tooltiptext">Home</span></Link>
                <Link to={`/users/${user.id}/profile`}><img src={icon.Profile} alt="Profile" /><span className="tooltiptext">Profile</span></Link>
                <Link id="add-button" to={`/${user.id}/create-project`}><img src={icon.Add} alt="Create Project"/><span className="tooltiptext">Create Project</span></Link>
                <Link to="/features"><img src={icon.Help} alt="Features" /><span className="tooltiptext">Features</span></Link>
                <ToggleProjectNav projectSideNavRef={projectSideNavRef} />
            </div>
        </StyledNav>
    )
}

const StyledNav = styled.div`
    height: 100vh;
    width: 60px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #000000;
    z-index: 1000;
    position: sticky;
    left: 0;
    top: 0;
    @media (max-width: 450px){
        width: 50px;
    }
    .top-container {
        display: flex;
        height: 88%;
        flex-direction: column;
        align-items: center;
        margin-top: 8px;
        position: relative;
        a {
            margin-bottom: 30px;
            position: relative;
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
                z-index: 2000;
                top: 0;
                left: 105%;
            }
        }
        a:hover .tooltiptext, a:active .tooltiptext {
            visibility: visible;
            transition-delay: 1s;
        }
    }
    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 6px;
        &:hover {
            background: ${palette.accentColor};
        }
    }
    img {
        width: 25px;
        height: 25px;
    }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Nav);