import { useRef } from "react";
import { marked } from "marked";

// styled
import styled from "styled-components";
import * as palette from "../../../styled/ThemeVariables";

// images
import Menu from "../../../assets/icons/dotMenu.png";

// redux
import { connect } from "react-redux";

// functions
import { handleDeleteAlert } from "../../../functions/handleDeleteAlert";
import { toggleRef } from "../../../functions/toggleRef";
import { handleDate } from "../../../functions/handleDates";

const Comment = ({ comment, user, setCommentId, DeleteAlertRef }) => {

  const DropDownRef = useRef();

  const handleCommentAuthor = (author) => {
    if(author === user.username){
      return { margin: "10px 10px 10px auto", background: `${palette.accentColor}`, color: 'white'};
    } else {
      return { margin: "10px auto 10px 10px", background: "white" };
    }
  }

  return (
    <StyledComment style={handleCommentAuthor(comment.user)}>
      <div className='comment-wrapper'>
        <div className='comment-title-container'>
          <h3 id={comment.user}>{comment.user}<span>{handleDate(comment.date)}</span></h3>
          <div className='dropdown'>
            <button className='drop-down-btn' onClick={() => { toggleRef(DropDownRef)}}><img src={Menu} alt='Menu' /></button>
            <div className='dropdown-content' ref={DropDownRef} style={{display: 'none'}}>
              <button onClick={() => { setCommentId(comment._id); handleDeleteAlert(DeleteAlertRef); toggleRef(DropDownRef)}}>Delete</button>
            </div>
          </div>
        </div>
        <div className="comment-text-container" dangerouslySetInnerHTML={{  __html: marked(comment.comment)}}></div>
      </div>
    </StyledComment>
  );
}

const StyledComment = styled.div`
  display: flex;
  max-width: 60%;
  width: auto;
  height: auto;
  margin: 10px auto;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 3px 3px 3px #5252528d;
  position: relative;
  justify-content: space-around;
  @media (max-width: 728px) {
    max-width: 80%;
  }
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
        span {
          margin-left: 10px;
          font-size: .8em;
          color: #dadada;
        }
      }
      .dropdown {
        position: relative;
        display: inline-block;
        .drop-down-btn {
          color: white;
          font-size: 16px;
          border: none;
          background: none;
          cursor: pointer;
          padding: 0;
          height: 25px;
          width: 25px;
          img {
            height: 25px;
            width: 25px;
          }
        }
        .dropdown-content {
          position: absolute;
          right: 10%;
          top: 99%;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
          background: ${palette.helperGrey};
          border-radius: 4px;
          button {
            color: #ff0000;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            border: 1px solid black;
            background: none;
            cursor: pointer;
            &:hover {
              background: white;
            }
          }
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