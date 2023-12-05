import { useState, useEffect } from "react";

// styles
import styled from "styled-components";
import * as palette from '../styled/ThemeVariables.js';

// router
import { useNavigate } from "react-router-dom";

// redux
import { connect } from 'react-redux';

const UnknownPath = ({ isLoggedIn, user}) => {

    const navigate = useNavigate();

    const [ counter, setCounter ] = useState(5); 

    useEffect(() => {
        const countdown = setInterval(() => {
            setCounter((prevCounter) => prevCounter - 1); 
        }, 1000);
        return () => {
            clearInterval(countdown);
        };
    }, []);

    useEffect(() => {
        if (counter === 0) {
            if(!isLoggedIn || !user){
                navigate('/login');
            } else {
                navigate('/home');
            }
        }
    }, [ counter, navigate, isLoggedIn, user ]);
    

  return (
    <StyledPage>
        <h1>404 Page Not Found</h1>
        <h2>It appears you are lost. You will be redirected in {counter} seconds..</h2>
    </StyledPage>
  )
}

const StyledPage = styled.section`
    width: 100%;
    h1, h2 {
        width: 100%;
        text-align: center;
        color: white;
    }
    h1 {
        font-size: 2em;
        margin-top: 10vh;
    }
    h2 {
        font-size: 1.2em;
        max-width: 70vh;
        margin: 20px auto;
        color: ${palette.helperGrey}
    }
`;

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.user.token,
    user: state.user,
  };
};

export default connect(mapStateToProps)(UnknownPath);