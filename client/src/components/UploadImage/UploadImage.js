import React from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPEG', 'PNG', 'JPG', 'GIF'];

const UploadImage = ({ setFile }) => {
  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
    </div>
  );
};

export default UploadImage;
