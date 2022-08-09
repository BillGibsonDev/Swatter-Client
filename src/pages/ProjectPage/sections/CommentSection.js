import { useEffect, useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../../../styled/ThemeVariables.js'

// functions
import { unauthorized } from '../../../functions/unauthorized.js';

// components
import Comment from '../components/Comment';

// router
import { useParams } from 'react-router-dom';

export default function CommentSection({user, role, toggleComments, commentSectionRef}) {

    const { projectId, bugId } = useParams();

    const [ comments, setComments ] = useState([]);
    const [ addComment, setAddComment] = useState('');
    const [ addAuthor, setAuthor] = useState(user);
    const [ isLoading, setLoading ] = useState(false);

    useEffect(() =>{
        const getProject = () => {
            axios.get(`${process.env.REACT_APP_GET_PROJECT_URL}/${projectId}`)
            .then(function (response){
                setComments(response.data.comments)
            })
            .catch(function (error) {
                throw error;
            });
        }
        getProject(projectId);
        setAuthor(user);
    }, [ projectId, bugId, user, isLoading ]);

    const sendComment = () => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_SEND_COMMENT_URL}/${projectId}/comments`, {
            projectId: projectId,
            comment: addComment,
            author: addAuthor,
        })
        .then(function(response) {
            if(response.data !== "Comment Created"){
                setLoading(false);
                alert("Server Error - Comment not created!");
            } else {
                setLoading(false);
                document.getElementById("comment").value = "";
                let container =  document.getElementById("comment-container");
                setTimeout(function(){
                    container.scrollTo(0, document.body.scrollHeight);
                }, 1000);
            }
        })
    }

    return (
        <StyledCommentSection ref={commentSectionRef} style={{display: "none" }}>
            <div className="comment-section-wrapper">
                <div className="title-container">
                    <h1>Comments</h1>
                    <button id="exit-btn" onClick={() => {toggleComments()}}>&times;<span className="tooltiptext">Close</span></button>
                </div>
                { 
                    comments.length === 0 || comments === []
                    ? <h1 style={{color: "white", textAlign: 'center', fontSize: '20px'}}>No comments yet..</h1>
                    : <div className="comment-container" id='comment-container'>
                        {
                            comments.map((comment, key) => {
                                return (
                                    <Comment
                                        date={comment.date}
                                        author={comment.author}
                                        comments={comment.comment}
                                        commentId={comment._id}
                                        user={user}
                                        projectId={projectId}
                                        key={key}
                                        role={role}
                                        setLoading={setLoading}
                                    />
                                )
                            })
                        }
                    </div>
                }
                <div className="comment-maker">
                    <textarea 
                        placeholder='Add a comment'
                        name="comment" 
                        id="comment" 
                        required
                        onChange={(event) => {
                            setAddComment(event.target.value);
                        }}

                    />
                    {
                        role !== process.env.REACT_APP_ADMIN_SECRET || process.env.REACT_APP_USER_SECRET
                        ? <button onClick={()=> { sendComment();}}>Send</button>
                        : <button onClick={()=> { unauthorized();}}>Send</button>
                    }
                </div>
            </div>
        </StyledCommentSection>
    )
}

const StyledCommentSection = styled.div`
    display: none;
    width: 100%;
    margin: 0 auto;
    height: 100%;
    min-height: 30vh;
    border: 2px white solid;
    position: absolute;
    background: #0000007d;
    z-index: 100;
    border-radius: 12px;
    left: -50px;
    justify-content: center;
    align-items: center;
    @media (max-width: 1440px){
        width: 100%;
        left: -15px;
    }
    @media (max-width: 834px){
        top: 0;
        left: -80px;
        margin: 0;
        width: 100vw;
        height: 100%;
        border-radius: 0;
    }
    @media (max-width: 428px){
        left: -60px;
        padding: 10px;
    }
    .comment-section-wrapper {
        display: flex;
        width: 60%;
        border-radius: 12px;
        flex-direction: column;
        justify-content: center;
        background: ${pallette.accentColor};
        @media (max-width:834px){
            width: 80%;
            height: 50%;
            justify-content: flex-start;
        }
        @media (max-width: 428px){
            width: 100%;
            height: 100%;
        }
        .title-container {
            display: flex;
            width: 95%;
            justify-content: space-between;
            align-items: center;
            margin: 10px auto 20px auto;
            h1 {
                color: #ffffff;
            }
            #exit-btn {
                background: none;
                border: none;
                font-size: 40px;
                color: white;
                position: relative;
                cursor: pointer;
                    #exit-btn-icon {
                        width: 30px;
                        height: 30px;
                        cursor: pointer;
                    }
                    .tooltiptext {
                        visibility: hidden;
                        width: 100%;
                        min-width: 160px;
                        background-color: black;
                        color: #fff;
                        text-align: center;
                        border-radius: 6px;
                        padding: 5px 0;
                        position: absolute;
                        z-index: 1000;
                        top: 25%;
                        right: 105%;
                        font-size: 20px;
                    }
                }
            #exit-btn:hover .tooltiptext, #exit-btn:active .tooltiptext {
                visibility: visible;
                transition-delay: 1s;
            }
        }
        .comment-maker {
            margin: 20px auto;
            display: flex;
            justify-content: center;
            @media (max-width: 428px){
                position: absolute;
                bottom: 0;
                left: 10%;
            }
            textarea {
                border-radius: 4px 0 0 4px;
                background: #d6d6d6;
                padding: 6px;
                min-height: 20px;
                height: auto;
                width: 500px;
                max-height: 50px;
                font-size: 12px;
                @media (max-width: 834px){
                    width: 300px;
                }
                @media (max-width: 428px){
                    width: 250px;
                    height: 30px;
                }
            }
            button {
                margin: 0;
                width: 100px;
                cursor: pointer;
                color: #0f4d92;
                background: white;
                border: none;
                border-radius:0 4px 4px 0;
                font-size: 14px;
                font-weight: 700;
                transition: 0.2s;
                &:hover {
                    background: #000000;
                    color: white;
                }
            }
        }
        .comment-container {
            max-height: 65vh;
            overflow-y: auto;
            @media (max-width: 428px){
                max-height: 80%;
            }
        }
    }
`;