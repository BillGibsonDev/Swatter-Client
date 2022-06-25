import { useEffect, useState } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// components
import Comment from '../components/Comment';

// images
import X from '../../../assets/icons/whiteX.png';

// router
import { useParams } from 'react-router-dom';

// loader asset
import Loader from '../../../loaders/Loader';

export default function ProjectsPage({user, role, handleShowComments, commentSection}) {

    const { projectId, bugId } = useParams();

    const [ comments, setComments ] = useState([]);
    const [ addComment, setAddComment] = useState('');
    const [ addAuthor, setAuthor] = useState(user);
    const [ isLoading, setLoading ] = useState(false);

    useEffect(() =>{
        function getProject(){
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

    function sendComment() {
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
            }
        })
    }

    function unauthorized(){
        alert("You do not have permissions to do that!")
    }

    return (
        <StyledCommentSection ref={commentSection} style={{display: "none"}}>
            <div className="title-container">
                <h1>Comments</h1>
                <img src={X} alt="Exit" onClick={() => {handleShowComments()}} />
            </div>
            
            { 
                comments === [] 
                ? <div className="undefined">
                    <h1>You've havent entered any comments</h1>
                  </div>
                : <div className="comment-container">
                    {
                        comments.slice().reverse().map((comment, key) => {
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
            {
                isLoading === true ? <Loader />               
                : <div className="comment-maker">
                    <textarea 
                        name="comment" 
                        id="comment" 
                        required
                        onChange={(event) => {
                            setAddComment(event.target.value);
                        }}  
                    />
                    {
                        role === process.env.REACT_APP_GUEST_SECRET 
                        ? <button onClick={()=> { unauthorized();}}>Send</button>
                        : <button onClick={()=> { sendComment();}}>Send</button>
                    }
                </div>
            }
        </StyledCommentSection>
    )
}

const StyledCommentSection = styled.div`
    display: none;
    width: 79vw;
    margin: 0 auto;
    min-height: 100vh;
    border: 2px white solid;
    animation-name: slideLeft;
    animation-duration: .5s;
    position: absolute;
    background: grey;
    z-index: 100;
    border-radius: 12px;
    left: -50px;
    @media (max-width: 1440px){
        width: 100%;
        left: -15px;
    }
    @media (max-width: 810px){
        top: 0;
        left: -120px;
        margin: 0;
        width: 100vw;
        height: 100%;
        border-radius: 0;
    }
    @media (max-width: 428px){
        left: -65px;
        animation-name: slideLeft390;
        animation-duration: .5s;
    }
    .undefined {
        width: 98%;
    }
    .title-container {
        display: flex;
        width: 95%;
        justify-content: space-between;
        align-items: center;
        margin: 20px auto;
        h1 {
            color: #ffffff;
        
        }
        img {
            width: 30px;
            height: 30px;
            cursor: pointer;
        }
    }
    .comment-maker {
        width: 60%;
        margin: 10px auto;
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        left: 20%;
        @media (max-width: 750px){
            width: 90%;
            left: 5%;
        }
        textarea {
            border-radius: 4px;
            background: #d6d6d6;
            padding: 10px;
            min-height: 10vh;
        }
        button {
            margin: 20px auto 0 auto ;
            width: 150px;
            cursor: pointer;
            color: #0f4d92;
            background: white;
            border: none;
            border-radius: 4px;
            font-size: 1.2em;
            font-weight: 700;
            @media (max-width: 750px){
                font-size: 1.5em;
            }
            &:hover {
                transform: scale(1.05);
                transition: 0.2s;
                background: #d1d1d1;
                color: black;
            }
        }
    }
    .comment-container {
        max-height: 65vh;
        overflow-y: scroll;
    }
`;