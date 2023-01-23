import { useState, useRef } from "react";
import axios from "axios";

// styled
import styled from "styled-components";
import * as pallette from "../styled/ThemeVariables.js";

// redux
import { connect } from "react-redux";

// components
import { Alert } from "../components/Alert.js";

// functions
import { handleAlert } from "../functions/handleAlert.js";
import { handleAdminAuth } from "../functions/handleAdminAuth.js";

const RegisterUserPage = ({ user }) => {

  const AlertRef = useRef();

  const [ message, setMessage ] = useState('')
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirm, setConfirm ] = useState("");

  const registerUser = () => {
    if (password !== confirm) {
      setMessage("Passwords Do Not Match!");
      handleAlert(AlertRef);
    } else {
      axios.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_REGISTER_URL}`,
        {
          username: username,
          password: password,
          role: user.role,
          userRole: `${process.env.REACT_APP_GUEST_SECRET}`,
        }
      )
      .then((response) => {
        if (response.data !== "USER REGISTERED") {
          setMessage("Server Error - User Not Created");
          handleAlert(AlertRef);
        } else {
          setMessage("User Created!");
          handleAlert(AlertRef);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage("Server Error - User Not Created");
        handleAlert(AlertRef);
      })
    }
  };
  
  return (
    <StyledRegister>
      <Alert
        message={message}
        handleAlert={handleAlert}
        AlertRef={AlertRef}
      />
      <h1>Register User</h1>
      <div className='form-wrapper'>
        <label>
          Username
          <input type='text' onChange={(event) => { setUsername(event.target.value); }} />
        </label>
        <label>
          Password
          <input type='text' onChange={(event) => { setPassword(event.target.value); }} />
        </label>
        <label>
          Retype Password
          <input type='text' onChange={(event) => { setConfirm(event.target.value); }} />
        </label>
        {
          handleAdminAuth(user)
          ? <button type='submit' onClick={() => { registerUser(); }}>Create User</button>
          : <button>Create User</button>
        }
      </div>
    </StyledRegister>
  );
}

const StyledRegister = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 50vh;
  width: 100%;
  max-width: 1000px;
  margin: 50px auto;
  @media (max-width: 750px) {
    margin: 20px auto;
  }
  h1 {
    font-size: 40px;
    color: #ffffff;
    margin-bottom: 20px;
  }
  .form-wrapper {
    display: flex;
    width: 90%;
    flex-direction: column;
    align-items: center;
    @media (max-width: 1150px) {
      font-size: 1.2em;
    }
    label {
      display: flex;
      color: white;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 20px 0;
      font-size: ${pallette.subtitleSize};
      @media (max-width: 750px) {
        font-size: ${pallette.paraSize};
      }
      input {
        width: 300px;
        height: 40px;
        border-radius: 4px;
        font-size: 18px;
        padding: 6px;
        background: ${pallette.helperGrey};
      }
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 40px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      font-size: ${pallette.subtitleSize};
      font-weight: 700;
      background: #ffffff;
      color: ${pallette.accentColor};
      margin-top: 20px;
      &:hover {
        color: #ffffff;
        cursor: pointer;
        background: #000000;
        transition: 0.2s;
        transform: scale(1.01);
      }
      @media (max-width: 750px) {
        font-size: ${pallette.paraSize};
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(RegisterUserPage);