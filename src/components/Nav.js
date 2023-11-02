import { useEffect, useRef } from 'react';

// styles
import styled from 'styled-components';
import * as palette from '../styled/ThemeVariables';

// router
import { Link, useLocation } from 'react-router-dom';

// icons
import * as icon from '../assets/IconImports.js';

// redux
import { connect } from 'react-redux';

// components
import { ToggleProjectNavButton }from './ToggleProjectNavButton.js';

const Nav = ({ user, projectSideNavRef }) => {

    const location = useLocation();
    const CreateProjectRef = useRef()

    useEffect(() => {
        const handleLocation = () => {
            let urlCheck = location.pathname.includes('/home');
            let link = CreateProjectRef.current;
            if(!urlCheck){ link.style.display = 'none'};
            if(urlCheck){ link.style.display = 'flex'};
        }
        handleLocation();
    }, [ location ]);

    return (
        <StyledNav>
            <Link to="/home"><img src={icon.Home} alt="Home" /><span className="tooltiptext">Home</span></Link>
            <Link to={`/users/${user.id}/profile`}><img src={icon.Profile} alt="Profile" /><span className="tooltiptext">Profile</span></Link>
            <Link to="/guide"><img src={icon.Help} alt="Guide" /><span className="tooltiptext">Guide</span></Link>
            <Link ref={CreateProjectRef} id="add-button" to={`/${user.id}/create-project`}><img src={icon.Add} alt="Create Project"/><span className="tooltiptext">Create Project</span></Link>
            <ToggleProjectNavButton projectSideNavRef={projectSideNavRef} />
        </StyledNav>
    )
}

const StyledNav = styled.nav`
    height: 100vh;
    width: 40px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #000000;
    z-index: 1000;
    position: sticky;
    left: 0;
    top: 0;
    a {
        margin-bottom: 20px;
        padding: 6px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .tooltiptext {
            display: flex;
            justify-content: center;
            align-items: center;
            visibility: hidden;
            width: 100%;
            height: 100%;
            min-width: 160px;
            background-color: black;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 5px 0;
            position: absolute;
            z-index: 2000;
            left: 105%;
        }
        &:hover {
            background: ${palette.accentColor};
        }
    }
    a:hover .tooltiptext, a:active .tooltiptext {
        visibility: visible;
        transition-delay: 1s;
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