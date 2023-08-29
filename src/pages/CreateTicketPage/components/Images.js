// styled
import styled from "styled-components";
import * as palette from "../../../styled/ThemeVariables.js";

export const Images = ({images, setImages}) => {

  const handleAddFields = () => {
    const values = [...images];
    values.push({ caption: "", image: "" });
    setImages(values);
  };

  const handleRemoveFields = (index) => {
    const result = window.confirm("Are you sure you want to delete?");
    if (result === true) {
      const values = [...images];
      values.splice(index, 1);
      setImages(values);
    }
  };

  const handleInputChange = (index, event) => {
    const values = [...images];
    if (event.target.id === "image") {
      values[index].image = event.target.value;
    } else if (event.target.id === "caption") {
      values[index].caption = event.target.value;
    }
    setImages(values);
  };

  return (
    <StyledImageSection>
      {
        images.length <= 0 ? <></>
        : <>
            {
              images.map((image, index) => {
                return (
                  <div className='image-container' key={index}>
                    <img className='preview-image' id='image' src={image.image} alt={image.image}/>
                    <div className='input-container'>
                      <label>Image
                        <input
                          type='text'
                          id='image'
                          name='image'
                          defaultValue={image.image}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                        </label>
                        <label>
                        Caption
                        <input
                          type='text'
                          id='caption'
                          name='caption'
                          defaultValue={image.caption}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                      </label>
                      <button id='delete' onClick={() => { handleRemoveFields(index);}}>Remove Image</button>
                    </div>
                  </div>
                );
            })
          }
        </>
      }
      <button className='add-images-button' onClick={() => { handleAddFields(); }}>Add Image</button>
    </StyledImageSection>
  );
}

const StyledImageSection = styled.article`
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    .image-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;
      height: 300px;
      width: 100%;
      @media (max-width: 428px) {
        flex-direction: column;
      }
      img {
        width: 40%;
        height: 100%;
        border: 1px solid white;
        @media (max-width: 428px) {
          width: 90%;
        }
      }
      .input-container {
        width: 50%;
        @media (max-width: 428px) {
          width: 100%;
        }
        label {
          display: flex;
          color: white;
          flex-direction: column;
          margin: 10px 0;
          font-size: ${palette.labelSize};
          @media (max-width: 750px) {
            font-size: .8em;
          }
          @media (max-width: 450px) {
            margin: 10px 0;
          }
          input {
            width: 100%;
            height: 30px;
            padding: 2px;
            background: ${palette.helperGrey};
          }
        }
      }
    }
  }
  .add-images-button, #delete {
    background: none;
    border: 2px solid white;
    color: white;
    font-size: 1em;
    cursor: pointer;
    padding: 6px;
    max-width: 500px;

    &:hover {
      background: black;
    }
  }
  #delete {
    width: 100%;
    border: 2px solid red;
  }
`;