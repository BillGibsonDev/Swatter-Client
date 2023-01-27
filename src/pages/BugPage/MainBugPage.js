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

// sections
import BugPage from "./sections/BugPage/BugPage.js";
import { EditBugPage } from "./sections/EditBugPage/EditBugPage.js";

export const MainBugPage = () => {
  const { projectId, bugId } = useParams();
  const [ bug, setBug ] = useState([]);
  const [ isLoading, setLoading ] = useState(true);
  const [ editing, setEditing ] = useState(false);
  const [ images, setImages ] = useState([]);

  useEffect(() => {
    const getBug = (projectId, bugId) => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_GET_BUG_URL}/${projectId}/${bugId}`)
      .then((response) => {
        setBug(response.data.bugs[0]);
        setImages(response.data.bugs[0].images);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    };
    getBug(projectId, bugId);
  }, [ projectId, bugId, isLoading, editing ]);

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
    width: 90%;
  }
  @media (max-width: 428px) {
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