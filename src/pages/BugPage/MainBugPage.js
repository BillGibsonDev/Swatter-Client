import { useEffect, useState } from "react";
import axios from "axios";

// styled
import styled from "styled-components";

// loaders
import BugPageLoader from "../../loaders/BugPageLoader.js";

// router
import { useParams } from "react-router-dom";

// components
import { BreadCrumbs } from "../../components/Breadcrumbs.js";

// redux
import { connect } from "react-redux";
// sections
import BugPage from "./sections/BugPage/BugPage.js";
import EditBugPage from "./sections/EditBugPage/EditBugPage.js";

const MainBugPage = ({ user }) => {
  const { projectId, bugId } = useParams();
  const [ bug, setBug ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);
  const [ editing, setEditing ] = useState(false);
  const [ images, setImages ] = useState([]);

  useEffect(() => {
    const getBug = (projectId, bugId) => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/bugs/${bugId}`, {
        headers: {
          Authorization: user.token,
        }
      })
      .then((response) => {
        console.log(response)
        setBug(response.data);
        setImages(response.data.images);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    };
    getBug(projectId, bugId);
  }, [ projectId, bugId, isLoading, editing, user ]);

  return (
    <StyledBugPage>
      <BreadCrumbs 
        projectId={projectId}
        projectTitle={"Project"} 
        title={bug.title}
      />
      {
        isLoading ? <BugPageLoader />
        : !editing ? <BugPage 
          setEditing={setEditing} 
          bug={bug} 
          images={images}
          bugId={bugId}
          projectId={projectId}
          setLoading={setLoading}
        /> 
        : <EditBugPage 
            setEditing={setEditing} 
            bug={bug}
            bugId={bugId}
            projectId={projectId}
            user={user}
          />
      }
    </StyledBugPage>
  );
}

const StyledBugPage = styled.div`
  height: 100%;
  width: 70%;
  margin: 20px auto;
  @media (max-width: 834px) {
    width: 80%;
    padding: 0;
    margin: 0 5% 0 15%;
  }
  #toggle-edit-button {
    width: 20px;
    height: 20px;
    border: none;
    background: none;
    cursor: pointer;
    margin-left: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(MainBugPage);