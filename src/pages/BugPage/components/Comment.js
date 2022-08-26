import { useState, useEffect } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as pallette from "../../../styled/ThemeVariables";

// functions
import { unauthorized } from "../../../functions/unauthorized.js";

// images
import Menu from "../../../assets/icons/dotMenu.png";

export default function Comment({
  comments,
  author,
  date,
  user,
  commentId,
  projectId,
  role,
  setLoading,
  bugId,
}) {
  const [compareDate, setCompareDate] = useState("");

  useEffect(() => {
    const handleDate = () => {
      const currentDate = new Date();
      setCompareDate(
        currentDate.toLocaleString("en-US", { timeZone: "America/New_York" })
      );
    };
    handleDate();
  }, []);

  const [currentDate] = compareDate.split(",");
  const [commentDate, commentTime] = date.split(",");

  const deleteComment = () => {
    setLoading(true);
    const result = window.confirm("Are you sure you want to delete?");
    if (result) {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_DELETE_BUG_COMMENT_URL}/${projectId}/${bugId}/${commentId}`
        )
        .then(function (response) {
          if (response.data !== "Comment Deleted!") {
            setLoading(false);
            alert("Server Error - Comment not deleted");
          } else {
            setLoading(false);
            alert("Comment Deleted!");
          }
        });
    }
  };

  return (
    <StyledComment
      style={
        author === user
          ? {
              margin: "10px 5% 10px auto",
              background: `${pallette.helperGrey}`,
            }
          : { margin: "10px auto 10px 5%", background: "white" }
      }
    >
      <div className='comment-wrapper'>
        <div className='comment-title-container'>
          <h3 id={author}>
            {author}
            <span>{currentDate === commentDate ? commentTime : date}</span>
          </h3>
          {author === user || role === process.env.REACT_APP_ADMIN_SECRET ? (
            <div className='dropdown'>
              <button className='dropbtn'>
                <img src={Menu} alt='' />
              </button>
              <div className='dropdown-content'>
                {author === user ||
                role === process.env.REACT_APP_ADMIN_SECRET ? (
                  <button
                    onClick={() => {
                      deleteComment();
                    }}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      unauthorized();
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <p>{comments}</p>
      </div>
    </StyledComment>
  );
}

const StyledComment = styled.div`
  display: flex;
  max-width: 80%;
  width: auto;
  height: auto;
  margin: 10px auto;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 3px 3px 3px #5252528d;
  position: relative;
  justify-content: space-around;
  @media (max-width: 450px) {
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
        font-size: 12px;
        display: flex;
        align-items: center;
        span {
          margin-left: 10px;
          font-size: 10px;
          color: #575757;
        }
      }
      .dropdown {
        position: relative;
        display: inline-block;
        .dropbtn {
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
          display: none;
          position: absolute;
          right: 90%;
          top: 0;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
          background: ${pallette.helperGrey};
          button {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            border: none;
            background: none;
            cursor: pointer;
            &:hover {
              background: white;
            }
          }
        }
      }
      .dropdown:hover .dropdown-content,
      .dropdown:active .dropdown-content,
      .dropdown:focus .dropdown-content {
        display: block;
      }
      .dropdown:hover .dropbtn,
      .dropdown:active .dropdown-content,
      .dropdown:focus .dropdown-content {
        background-color: ${pallette.helperGrey};
      }
    }
    #Gibby {
      color: #008ee0;
    }
    #Moose {
      color: #0dbe7a;
    }
    p {
      font-size: 12px;
      font-weight: 400;
    }
  }
`;
