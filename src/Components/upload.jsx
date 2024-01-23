import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      fetch("https://contact-management-server-sl06.onrender.com/contact", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Upload successful:", data);
          // Handle success, if needed
          setUploadSuccess(true);
          setFile(null); // Clear the file input after successful upload
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          // Handle error, if needed
        });
    } else {
      console.warn("Please select a file before uploading.");
      // You may want to display a message to the user in the UI
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadSuccess && <p>Upload successful! File cleared.</p>}
    </div>
  );
};

export default FileUpload;
