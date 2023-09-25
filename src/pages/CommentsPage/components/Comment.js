import { useRef } from 'react';
import { marked } from "marked";
import axios from 'axios';

// components
import { DeleteAlert }from '../../../components/DeleteAlert.js';

// styled
import styled from "styled-components";
import * as palette from "../../../styled/ThemeVariables";

// functions
import { handleDeleteAlert } from "../../../functions/handleDeleteAlert";
import { handleElapsedTime } from "../../../functions/handleDates";

// redux
import { connect } from "react-redux";

const Comment = ({ comment, user, projectId, setComments, setLoading }) => {
  
  const DeleteAlertRef = useRef();

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
        setComments(response.data);
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
  };

  return (
    <StyledComment>
      <DeleteAlert
        DeleteAlertRef={DeleteAlertRef}
        deleteFunction={deleteComment}
        title={'comment'}
        id={comment._id}
      />
      <div className='comment-wrapper'>
        <div className="info-container">
          {
            comment.userAvatar ? <img src={comment.userAvatar} alt="" />
            :<></>
          }
          <h3>{comment.user}<span>{handleElapsedTime(comment.date)}</span><span>{comment.edited ? 'Edited' : null}</span></h3>
        </div>
        <div className="comment-text-container" dangerouslySetInnerHTML={{  __html: marked(comment.comment)}}></div>
        <div className="link-container">
          <button disabled={user.username !== comment.user} onClick={() => { handleDeleteAlert(DeleteAlertRef);}}>Delete</button>
        </div>
      </div>
    </StyledComment>
  );
}

const StyledComment = styled.article`
  display: flex;
  width: auto;
  height: auto;
  justify-content: space-around;
  border: ${palette.accentBorder1px};
  border-radius: ${palette.borderRadius};
  &:not(:first-child){
    margin: 4px auto;
  }
  .comment-wrapper {
    width: 95%;
    margin: 6px auto;
    .info-container {
      display: flex;
      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 4px;
      }
      h3 {
        font-size: .8em;
        display: flex;
        align-items: center;
        font-weight: 700;
        span {
          margin-left: 10px;
          font-size: .8em;
          color: ${palette.accentColor};
        }
      }
    }
    .comment-text-container {
      margin-top: 4px;
      p {
        font-size: .8em;
        font-weight: 400;
        margin-bottom: 12px;
        word-wrap: break-word;
      }
    }
    .link-container {
      width: 100px;
      display: flex;
      justify-content: space-between;
      button {
        font-size: .7em;
        border: none;
        background: none;
        cursor: pointer;
        color: ${palette.helperGrey};
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Comment);