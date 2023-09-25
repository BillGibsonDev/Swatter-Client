import { useEffect, useState, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as palette from '../../styled/ThemeVariables.js';

// components
import Comment from "./components/Comment.js";
import CommentInput from "./components/CommentInput.js";
import { DeleteAlert } from "../../components/DeleteAlert.js";
import Loader from "../../loaders/Loader.js";
import BreadCrumbs from '../../components/Breadcrumbs.js';
import { TitleContainer } from "../../components/TitleContainer.js";

// router
import { useParams } from "react-router-dom";

//redux
import { connect } from "react-redux";

// functions
import { getProject } from "../../functions/getProject.js";

const CommentPage = ({ user }) => {

  const DeleteAlertRef = useRef();

  const { projectId } = useParams();

  const [ comments, setComments ] = useState([]);
  const [ isLoading, setLoading ] = useState(false);
  const [ commentId, setCommentId ] = useState();
  const [ project, setProject ] = useState({});

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getProject(user, projectId);
        setProject(projectData);
        setComments(projectData.comments.reverse());
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProject();
  }, [ projectId, user ]);

  const deleteComment = (commentId) => {
    setLoading(true);
    axios.post(`${process.env.REACT_APP_BASE_URL}/${user.id}/projects/${projectId}/comments/${commentId}/delete`, {},
      {
        headers: {
          Authorization: user.token
        }
      }
    )
    .then((response) => {
      if (response.status === 200) {
        setLoading(false);
        setComments(response.data)
      }
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    })
  };

  if(isLoading){
    return <Loader />
  }

  return (
    <StyledPage>
      <BreadCrumbs
        projectId={projectId}
        projectTitle={project.title}
        title={'Comments'}
      />
      <DeleteAlert
        DeleteAlertRef={DeleteAlertRef}
        deleteFunction={deleteComment}
        title={'comment'}
        commentId={commentId}
      />
      <div className='comment-section-wrapper'>
        <TitleContainer title={'Comments'} samePage={false} />
        {
          comments.length === 0 || !comments 
          ? <></>
          : <div className='comment-container'>
            {
              comments.map((comment, index) => {
                return (
                  <Comment
                    comment={comment}
                    setComments={setComments}
                    projectId={projectId}
                    key={index}
                    setLoading={setLoading}
                    setCommentId={setCommentId}
                    DeleteAlertRef={DeleteAlertRef}
                  />
                );
              })
            }
          </div>
        }
        <CommentInput
          setLoading={setLoading}
          setComments={setComments}
          projectId={projectId}
        />
      </div>
    </StyledPage>
  );
}

const StyledPage = styled.section`
  color: white;
  font-size: 1em;
  margin: 0 auto;
  padding: 2px;
  width: 90%;
  .comment-section-wrapper {
    width: 100%;
    height: 100%;
    min-height: 30vh;
    h3 {
      color: ${palette.helperGrey};
      font-size: 1em;
      font-weight: 400;
      margin-right: auto;
    }
    .comment-container {
      width: 100%;
      max-height: 300px;
      overflow-y: auto;
      border: ${palette.greyBorder};
      border-radius: ${palette.borderRadius};
      ::-webkit-scrollbar {
        width: 8px; 
      }
      ::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 4px;
      }
      scrollbar-width: thin;
      scrollbar-color: #888 transparent;
      @media (max-width: 428px) {
        max-height: 40vh;
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(CommentPage);