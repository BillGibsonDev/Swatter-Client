import styled from "styled-components";
import * as palette from '../../styled/ThemeVariables.js';

export const HelpPage = () => {
  return (
    <StyledHelpPage>
      <header className="title-container">
        <h1>Swatter - Project Management</h1>
        <p>Project management is the goal of Swatter. Organizing and paving the way to meet your goals and create better outcomes. </p>
      </header>
      <article>
        <h2>Users</h2>
        <p>Freely login and out of Swatter with their username and password. Passwords are encrypted on the database for security purposes.</p>
      </article>
      <article>
        <h2>Admins</h2>
        <p>This is an elevated role meant for safeguarding projects and users. Admins have more permissions than users, including: creating and deleting projects, starting sprints and more.</p>
      </article>
      <article>
        <h2>Projects</h2>
        <p>The main focus of the Swatter app is project management. Through organization and workflow this tool is meant to assist users in focusing on their goals.</p>
      </article>
      <article>
        <h2>Starting A Project</h2>
        <ul>
          <li>Starting a project is simple. Click on the Create Project icon to navigate to the Create Project Page</li>
          <li>Now we have several data fields.
            <ul style={{paddingLeft: '20px'}}>
              <li>Title - name your project.</li>
              <li>Key - this will be the unique id for the issues in your project used for searching.</li>
              <li>URL - the website for your project, used to create a link to your projects website.</li>
              <li>Repository  - easily access your GitHub repository from the project.</li>
              <li>Lead - the person managing the project.</li>
              <li>Date - the date your started the project.</li>
              <li>Project Type - the type of project you are creating.</li>
              <li>Description - a brief summary of the project.</li>
              <li>Image - an image to help identify your project.</li>
            </ul>
          </li>
          <li>Enter as much data about your project as you wish. <em>The only data required is a 'title'.</em></li>
          <li>Click 'Start' and your project is created!</li>
        </ul>
      </article>
      <article>
        <h2>Getting to Know The Project Page</h2>
        <p></p>
      </article>
      <article>
        <h2>Creating Your First Issue</h2>
        <p>So we're ready to create our first issue for our project.</p>
        <ul>
          <li>Go to 'Create Bug' on the Project Navigation which will navigate you to the Create Bug Page.</li>
          <li>Now we have several data fields.
            <ul style={{paddingLeft: '20px'}}>
              <li>Title - name your issue.</li>
              <li>Created By - this field is auto generated from your username.</li>
              <li>Tag - label the issue as best your can from 'Bug', 'Feature', 'Enhancement', 'Redesign', and 'Task'</li>
              <li>Priority  - how important is this issue currently? 'Standard', 'Medium' or 'High'?</li>
              <li>Status - what part of the process is the issue in? 'Open', 'Underway', 'Reviewing', 'Completed'?</li>
              <li>Sprint - if your project has any sprints you can add this issue to them.</li>
              <li>Description - a brief summary of the issue.</li>
              <li>Images - an image to help identify the issue.</li>
              <li>Caption - add a caption to an image to help users understand the image.</li>
            </ul>
          </li>
          <li>Enter as much data about your project as you wish. <em>The only data required is a 'title' and a 'status'.</em></li>
          <li>Click 'Create' and your issue is started!</li>
        </ul>
      </article>
    </StyledHelpPage>
  )
}

const StyledHelpPage = styled.section`
  width: 70%;
  margin: 20px auto;
  .title-container {
    margin-bottom: 20px;
    h1, p {
      color: white;
    }
  }
  article {
    margin-bottom: 20px;
    h2 {
      color: ${palette.accentColor}
    }
    p, li {
      color: white;
    }
    ul {
      list-style: square; 
      list-style-position: inside;
      li {
        margin: 10px 0;
      }
    }
  }
`;