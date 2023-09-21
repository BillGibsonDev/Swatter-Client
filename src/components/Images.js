// styled
import styled from "styled-components";
import * as palette from "../styled/ThemeVariables.js";
import { StyledButton } from "../styled/StyledButton.js";

// functions
import { handleImages } from "../functions/handleImages.js";

export const Images = ({images, setImages}) => {

  const handleAddFields = () => {
    const values = [...images];
    values.push({ caption: "", image: "" });
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
    } else if (event.target.id === "caption") {
      values[index].caption = event.target.value;
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
              <div className='input-container'>
                <label>Image
                  <input
                      type='file'
                      id='image'
                      name='image'
                      placeholder={image.image}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                </label>
                <label>Caption
                  <input
                    type='text'
                    id='caption'
                    name='caption'
                    defaultValue={image.caption}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </label>
                <StyledButton id='delete' onClick={() => { handleRemoveFields(index);}}>Remove Image</StyledButton>
              </div>
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
    margin-bottom: 20px;
    border: 1px solid ${palette.helperGrey};
    padding: 6px;
    img {
      width: 90%;
      height: 100%;
      max-width: 400px;
      margin: 0 auto;
    }
    .input-container {
      width: 100%;
      max-width: 500px;
      margin: 20px auto;
      label {
        color: white;
        margin: 10px 0;
        font-size: ${palette.labelSize};
        input {
          width: 100%;
          height: 30px;
          padding: 2px;
          background: ${palette.helperGrey};
          color: black;
        }
      }
      #delete {
        width: 100%;
        border: 2px solid red;
        margin: 10px auto 0 auto;
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