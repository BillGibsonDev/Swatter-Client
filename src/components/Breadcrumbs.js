// styled
import styled from "styled-components";
import * as pallette from "../styled/ThemeVariables.js";

// router
import { Link } from "react-router-dom";

// redux
import { connect } from "react-redux";

const BreadCrumbs = ({ user, projectId, projectTitle, title }) => {

  return (
    <StyledBreadCrumbs>
        <Link to={`/`}>Home</Link>
        <span>/</span>
        {
          projectId ? <Link to={`/${user.id}/projects/${projectId}`}>{projectTitle}</Link>
          : <p>{projectTitle}</p>
        }
        {
          title ?  <> <span>/</span><p>{title}</p></>
          : <></>
        }
    </StyledBreadCrumbs>
  );
}

const StyledBreadCrumbs = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  a {
    border: none;
    background: none;
    font-size: 1em;
    color: ${pallette.helperGrey};
    cursor: pointer;
    &:hover {
      color: white;
    }
  }
  p {
    font-size: 1em;
    color: ${pallette.helperGrey};
  }
  span {
    margin: 0 10px;
    color: white;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(BreadCrumbs);