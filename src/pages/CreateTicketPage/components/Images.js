// styled
import styled from "styled-components";
import * as palette from "../../../styled/ThemeVariables.js";
import { StyledButton } from "../../../styled/StyledButton.js";

// icons
import TrashCan from '../../../assets/icons/trashcanRed.png';

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

  if(images.length === 0){
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
            <div className="image-container" key={index}>
              <img className='preview-image' id='image' src={image.image} alt={image.image}/>
              <label>
                <input
                    type='file'
                    id='image'
                    name='image'
                    placeholder={image.image}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                  <button id='delete' onClick={() => { handleRemoveFields(index);}}><img src={TrashCan} alt="Remove" /></button>
              </label>
            </div>
          );
        })
      }
      <StyledButton id="add-btn" onClick={() => { handleAddFields(); }}>Add Another Image</StyledButton>
    </StyledImageSection>
  );
}

const StyledImageSection = styled.article`
  margin: 20px 0;
  max-width: 500px;
  .image-container {
    width: 100%;
    padding: 6px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      border: 1px solid ${palette.helperGrey};
    }
    label {
      display: flex;
      align-items: center;
      flex-direction: row;
      background: ${palette.helperGrey};
      padding: 4px;
      input {
        color: black;
        width: 100%;
      }
      #delete {
        border: none;
        margin-right: 2px;
        img {
          width: 24px;
        }
      }
    }
  }
  #add-btn {
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    background: #7e7e7e;
    color: #ffffff;
  }
`;