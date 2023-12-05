// styled
import styled from "styled-components";
import * as palette from "../../../styled/ThemeVariables";

// router
import { Link } from "react-router-dom";

// images
import PlaceholderImage from "../../../assets/images/imagePlaceholder.png";

// components
import { Timer } from "../../../components/Timer";

export default function Project({ user, project }) {

  return (
    <StyledProject>
      <Link className='project-image-link' to={`/${user.id}/projects/${project._id}`}>
        <img
          className='project-image'
          src={!project.image ? PlaceholderImage : project.image}
          alt={project.title}
        />
      </Link>
      <div className="text-container">
        <Link to={`/${user.id}/projects/${project._id}`}>{project.title}</Link>
        <Timer id="date" date={ project.lastUpdate ? project.lastUpdate : project.date } />
      </div>
    </StyledProject>
  );
}

const StyledProject = styled.article`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 450px;
  position: relative;
  background: #5c5c5c73;
  border-radius: 4px;
  padding: 8px;
  border: 1px solid #0e1a28;
  &:hover {
    border: 1px solid white;
  }
  @media (max-width: 450px) {
    align-items: center;
    padding: 6px;
    width: 100%;
  }
  .project-image-link {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 275px;
    max-height: 275px;
    height: 100%;
    margin-bottom: 8px;
    @media (max-width: 450px) {
      height: 100%;
      width: 100%;
      min-height: 200px;
      max-height: 200px;
    }
    .project-image {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      object-fit: cover;
    }
  }
  .text-container {
    display: flex;
    position: relative;
    justify-content: flex-end;
    flex-direction: column;
    width: 100%;
    height: 100%;
    @media (max-width: 450px){
      justify-content: center;
      margin-left: 8px;
      height: auto;
    }
    a {
      font-size: ${palette.subtitleSize};
      color: white;
      font-weight: 400;
      @media (max-width: 450px){
        font-size: 1em;
        margin-bottom: 0;
      }
    }
    p {
      font-size: .8em;
      color: white;
      font-weight: 200;
      display: flex;
    }
  }
`;
