import styled from "styled-components";
import * as palette from '../../../styled/ThemeVariables.js';

export const ProjectSection = () => {
  return (
    <StyledProjectSection>
      <article>
        <h2>Projects</h2>
        <p>The main focus of the Swatter app is project management. Through organization and workflow this tool is meant to assist users in focusing on their goals.</p>
      </article>
      <article>
        <h2>Starting A Project</h2>
        <ul>
          <li>Starting a project is simple. Click on the Create Project icon to navigate to the Create Project Page</li>
          <li>Now we have several data fields.
            <ul>
              <li><span>Title</span> - name your project.</li>
              <li><span>Key</span> - this will be the unique id for the issues in your project used for searching.</li>
              <li><span>URL</span> - the website for your project, used to create a link to your projects website.</li>
              <li><span>Repository</span>  - easily access your GitHub repository from the project.</li>
              <li><span>Lead</span> - the person managing the project.</li>
              <li><span>Date</span> - the date your started the project.</li>
              <li><span>Project Type</span> - the type of project you are creating.</li>
              <li><span>Description</span> - a brief summary of the project.</li>
              <li><span>Image</span> - an image to help identify your project.</li>
            </ul>
          </li>
          <li>Enter as much data about your project as you wish. <strong>The only data required is a 'title'.</strong></li>
          <li>Click 'Start' and your project is created!</li>
        </ul>
      </article>
      <article>
        <h2>Getting to Know The Project Page</h2>
        <p>Let's take a look at the important features of the project page.</p>
        <h3>Project Navigation</h3>
        <div className="container">
            <img src="" alt="" />
            <div className="text-container">
                <h4>Project Info</h4>
            </div>
        </div>
        <div className="container">
            <img src="" alt="" />
            <div className="text-container">
                <h4>Repository</h4>
            </div>
        </div>
        <div className="container">
            <img src="" alt="" />
            <div className="text-container">
                <h4>Website</h4>
            </div>
        </div>
        <div className="container">
            <img src="" alt="" />
            <div className="text-container">
                <h4>Comments</h4>
            </div>
        </div>
        <div className="container">
            <img src="" alt="" />
            <div className="text-container">
                <h4>Sprints</h4>
            </div>
        </div>
        <div className="container">
            <img src="" alt="" />
            <div className="text-container">
                <h4>Sprints</h4>
            </div>
        </div>
        <div className="container">
            <img src="" alt="" />
            <div className="text-container">
                <h4>Details</h4>
            </div>
        </div>
        <div className="container">
            <img src="" alt="" />
            <div className="text-container">
                <h4>Archive</h4>
            </div>
        </div>
      </article>
      <article>
        <h2>Creating Your First Issue</h2>
        <p>So we're ready to create our first issue for our project.</p>
        <ul>
          <li>Go to 'Create Bug' on the Project Navigation which will navigate you to the Create Bug Page.</li>
          <li>Now we have several data fields.
            <ul>
              <li><span>Title</span> - name your issue.</li>
              <li><span>Created By</span> - this field is auto generated from your username.</li>
              <li><span>Tag</span> - label the issue as best your can from 'Bug', 'Feature', 'Enhancement', 'Redesign', and 'Task'</li>
              <li><span>Priority</span>  - how important is this issue currently? 'Standard', 'Medium' or 'High'?</li>
              <li><span>Status</span>- what part of the process is the issue in? 'Open', 'Underway', 'Reviewing', 'Completed'?</li>
              <li><span>Sprint</span> - if your project has any sprints you can add this issue to them.</li>
              <li><span>Description</span> - a brief summary of the issue.</li>
              <li><span>Images</span> - an image to help identify the issue.</li>
              <li><span>Caption</span> - add a caption to an image to help users understand the image.</li>
            </ul>
          </li>
          <li>Enter as much data about your project as you wish. <strong>The only data required is a 'title' and a 'status'.</strong></li>
          <li>Click 'Create' and your issue is started!</li>
        </ul>
      </article>
    </StyledProjectSection>
  )
}

const StyledProjectSection = styled.section`
  article {
    margin-bottom: 20px;
    h2 {
      color: red;
    }
    p, li {
      color: white;
      font-size: .8em;
    }
    ul {
      list-style: square; 
      list-style-position: inside;
      li {
        margin: 10px 0;
        span {
          color: lightcoral;
        }
      }
      ul {
        margin-left: 20px;
      }
    }
    h3 {
      margin: 20px 0;
    }
    .container {
      img {

      }
      .text-container {
        h4 {
          color: lightcoral;
        }
      }
    }
  }
`;