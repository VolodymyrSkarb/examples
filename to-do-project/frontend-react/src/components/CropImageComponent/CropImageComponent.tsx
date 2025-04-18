import React, { ChangeEvent, useState } from 'react';
import Avatar from 'react-avatar-edit';
import { Button } from '@mui/material';

const CropImageComponent = ({uploadImage}: {uploadImage: any})=> {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [uploadFile, setUploadFile] = useState<any>();

  const createImageFromBuffer = (buffer: string): File => {
    const base64String = buffer;
    const binaryString = atob(base64String.split(',')[1]);
    const binaryLength = binaryString.length;
    const uint8Array = new Uint8Array(binaryLength);

    for (let i = 0; i < binaryLength; i++) {
      uint8Array[i] = binaryString.charCodeAt(i); // fill Uint8Array with binary data
    }

    const blob = new Blob([uint8Array], { type: 'image/png' }); // create Blob object
    const file = new File([blob], 'avatar.png', { type: 'image/png' }); // create File object

    return file;
  };

  const onClose = () => {
    setHeight(0);
    setWidth(0);
  };

  const onCrop = (preview: string) => {
    if (!preview) return;
    setUploadFile(createImageFromBuffer(preview));
  };

  const onBeforeFileLoad = (elem: ChangeEvent<HTMLInputElement>) => {
    setSizeEditor(elem);

    // if(elem.target.files[0].size > 71680) {
    //   alert("File is too big!");
    //   elem.target.value = "";
    // }
  };

  const setSizeEditor = (elem: ChangeEvent<HTMLInputElement>) => {
    if (!elem.target.files) return;
    const file = elem.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const [width, height] = calculateDimensions(img);
        setWidth(width);
        setHeight(height);
      };

      if (typeof reader.result === 'string') {
        img.src = reader.result;
      }
    };

    reader.readAsDataURL(file);
  };

  const calculateDimensions = (img: HTMLImageElement) => {
    const MAX_HEIGHT_SIZE = 436;
    const { naturalWidth, naturalHeight } = img;

    if (naturalWidth <= MAX_HEIGHT_SIZE && naturalHeight <= MAX_HEIGHT_SIZE) {
      return [naturalWidth, naturalHeight];
    }

    const ratio = MAX_HEIGHT_SIZE /naturalWidth;

    return [MAX_HEIGHT_SIZE, naturalHeight * ratio];
  };

  return (
    <div className="avatar-editor">
      {
        <Avatar
          width={width ? width : 436}
          height={height ? height : 300}
          closeIconColor="white"
          backgroundColor="transparent"
          exportQuality={1.0}
          onCrop={onCrop}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
          src={''}
        />
      }
      <Button variant="contained" component="label" disabled={!uploadFile} onClick={() => uploadImage(uploadFile)}>
        Upload
      </Button>
    </div>
  );
};

export default CropImageComponent;