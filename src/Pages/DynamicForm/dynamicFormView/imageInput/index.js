import React, { useRef, useState } from "react";
import "./imageInput.css";

const ImageInput = (props) => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target ? e.target.files[0]: e;
    if (selectedFile) {
      props.onImageChange(selectedFile);
      setSelectedFiles(selectedFile);

      // Create a URL for the selected file
      const previewURL = URL.createObjectURL(selectedFile);
      setImagePreview(previewURL);

      console.log("Selected file:", selectedFile);
    } else {
      // Handle the case when the user cancels the selection
      props.onImageChange(null);
      setSelectedFiles(null);
      setImagePreview(null);

      console.log("Image selection cancelled");
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-center">
      {imagePreview && (
         <div className="position-relative">
         <img src={imagePreview} alt="Selected" className="imageinput_preview" />
         {/* <button className="imageInput_button" onClick={()=>fileInputRef.current.click()}>
           Edit
         </button>
         <input type="file" ref={fileInputRef} style={{display: "none"}} onChange={handleFileChange} /> */}
       </div>
      )}
      {!imagePreview && <div
        className="imageinput_container"
        role="button"
        onClick={handleImageSelect}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="37"
          height="36"
          viewBox="0 0 37 36"
          fill="none"
        >
          <path
            d="M13.2496 26V16M13.2496 16L9.75 19.3333M13.2496 16L16.7491 19.3333"
            stroke="#5599FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M35.9955 14.3333V22.6667C35.9955 31 32.496 34.3333 23.7471 34.3333H13.2484C4.49955 34.3333 1 31 1 22.6667V12.6667C1 4.33333 4.49955 1 13.2484 1H21.9973"
            stroke="#5599FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M35.9982 14.3333H28.9991C23.7498 14.3333 22 12.6667 22 7.66667V1L35.9982 14.3333Z"
            stroke="#5599FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="imageinput_uploadImage">Upload Image</p>
        <p className="imageinput_pixels">200px by 200px</p>
      </div>}
    </div>
  );
};

export default ImageInput;
