import { marked } from "marked";

// styled
import styled from "styled-components";
import * as palette from "../../../../../styled/ThemeVariables";

// functions
import { handleDeleteAlert } from "../../../../../functions/handleDeleteAlert";
import { handleDate } from "../../../../../functions/handleDates";

// images
import * as icon from '../../../../../assets/IconImports.js'

// redux
import { connect } from "react-redux";

const Comment = ({ comment, DeleteAlertRef, user, setCommentId }) => {

  const handleCommentAuthor = (author) => {
    if(author === user.username){
      return { margin: "10px 0 10px auto"};
    } else {
      return { margin: "10px auto 10px 0"};
    }
  }
  
  return (
    <StyledComment style={handleCommentAuthor(comment.user)}>
      <div className='comment-wrapper'>
        <div className='comment-title-container'>
          <h3 id={comment.user}>{comment.user}<span>{handleDate(comment.date)}</span></h3>
          {
            user.username !== comment.user ? <></>
            : <button onClick={() => { setCommentId(comment._id); handleDeleteAlert(DeleteAlertRef); }}><img src={icon.Trash} alt="Delete" /></button>
          }
        </div>
        <div className="comment-text-container" dangerouslySetInnerHTML={{  __html: marked(comment.comment)}}></div>
      </div>
    </StyledComment>
  );
}

const StyledComment = styled.div`
  display: flex;
  max-width: 90%;
  max-width: 400px;
  width: auto;
  height: auto;
  margin: 10px auto;
  background: #000000b3;
  border-radius: 4px;
  box-shadow: 2px 2px 4px #5252528d;
  position: relative;
  justify-content: space-around;
  .comment-wrapper {
    width: 95%;
    margin: 10px auto;
    .comment-title-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 20px;
      align-items: center;
      margin-bottom: 10px;
      h3 {
        font-size: .8em;
        display: flex;
        align-items: center;
        color: white;
        span {
          margin-left: 10px;
          font-size: .8em;
          color: ${palette.helperGrey};
        }
      }
      button {
        color: #ff0000;
        padding: 2px;
        border: none;
        background: none;
        cursor: pointer;
        &:hover {
          background: white;
        }
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
    .comment-text-container {
      p {
        margin-bottom: 12px;
      }
    }
    p {
      font-size: .8em;
      font-weight: 400;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Comment);