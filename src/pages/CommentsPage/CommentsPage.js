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

// router
import { useParams } from "react-router-dom";

//redux
import { connect } from "react-redux";

// functions
import { getProject } from "../../functions/getProject.js";

const CommentPage = ({ user }) => {

  const DeleteAlertRef = useRef();
  const CommentContainerRef = useRef();

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

  let container = CommentContainerRef.current;
  if(container){
    container.scrollTo(0, document.body.scrollHeight);
  };

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
      {
        isLoading ? <Loader />
        : <div className='comment-section-wrapper'>
          <div className='title-container'>
            <h1>Comments</h1>
          </div>
          {
            comments.length === 0 || !comments 
            ? <h1 style={{ color: "white", textAlign: "center", fontSize: "1.5em" }}>No comments yet..</h1>
            : <div className='comment-container' ref={CommentContainerRef}>
              {
                comments.map((comment, index) => {
                  return (
                    <Comment
                      comment={comment}
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
            CommentContainerRef={CommentContainerRef}
          />
        </div>
      }
    </StyledPage>
  );
}

const StyledPage = styled.section`
  height: 100%;
  max-height: 80vh;
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  position: relative;
  .comment-section-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: auto;
    padding: 6px;
    .title-container {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin: 10px auto 20px auto;
      h1 {
        color: #ffffff;
        width: 60%;
        border-bottom: ${palette.titleBorder};
      }
    }
    .comment-container {
      min-height: 65vh;
      max-height: 65vh;
      overflow-y: auto;
      @media (max-width: 428px) {
        max-height: 80%;
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