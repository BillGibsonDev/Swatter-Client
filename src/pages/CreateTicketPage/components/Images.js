// styled
import styled from "styled-components";
import * as palette from "../../../styled/ThemeVariables.js";
import { StyledButton } from '../../../styled/StyledButton.js';

// functions
import { handleImages } from "../../../functions/handleImages.js";

export const Images = ({ images, setImages }) => {

  const handleAddFields = () => {
    const values = [...images];
    values.push({ image: "" });
    setImages(values);
  };

  const handleRemoveFields = (index) => {
    const result = window.confirm("Are you sure you want to delete?");
    if (result) {
      const values = [...images];
      values.splice(index, 1);
      setImages(values);
    }
  };

  const handleInputChange = async (index, event) => {
    const values = [...images];
    if (event.target.id === "image") {
      const imageURL = await handleImages(event.target.files[0])
      values[index].image = imageURL;
    } 
    setImages(values);
  };

  if(!images || images.length <= 0){
    return (
      <StyledImageSection>
        <StyledButton id="add-btn" onClick={() => { handleAddFields(); }}>Add Image</StyledButton>
      </StyledImageSection>
    )
  }

  return (
    <StyledImageSection>
      {
        images.map((image, index) => {
          return (
            <div className='input-container' key={index}>
              <label>Image
                <input
                  type='file'
                  id='image'
                  name='image'
                  onChange={(event) => handleInputChange(index, event)}
                />
              </label>
              <StyledButton id='delete' onClick={() => { handleRemoveFields(index);}}>Remove Image</StyledButton>
            </div>
          );
        })
      }
      <StyledButton id="add-btn" onClick={() => { handleAddFields(); }}>Add Another Image</StyledButton>
    </StyledImageSection>
  );
}

const StyledImageSection = styled.article`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  .input-container {
    width: 100%;
    max-width: 500px;
    margin-bottom: 20px;
    label {
      display: flex;
      color: white;
      flex-direction: column;
      margin: 10px 0;
      font-size: ${palette.labelSize};
      input {
        width: 100%;
        height: 30px;
        padding: 2px;
        background: ${palette.helperGrey};
      }
    }
    #delete {
      width: 100%;
      border: 2px solid red;
      margin: 0 auto;
    }
  }
  #add-btn {
    max-width: 500px;
    width: 100%;
    margin: 0;
  }
`;