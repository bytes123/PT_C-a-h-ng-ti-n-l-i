import React, { useState, useEffect } from "react";

export default function useUploadImage(avatar) {
  const [imagePreview, setImagePreview] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [imgData, setImgData] = useState({
    file: null,
    name: "",
    imagePreviewUrl:
      avatar ?? "http://localhost:8000/resources/avatar/default.jpg",
  });

  useEffect(() => {
    if (imagePreview) {
      setImgData({
        ...imgData,
        file: selectedFile,
        imagePreviewUrl: imagePreview,
      });
    }
  }, [imagePreview]);

  useEffect(() => {
    if (!selectedFile) {
      setImagePreview(undefined);
      return;
    }
    console.log(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const clearImage = () => {
    if (imagePreview) {
      setImgData({
        file: null,
        name: "",
        imagePreviewUrl: "http://localhost:8000/resources/avatar/default.jpg",
      });
      URL.revokeObjectURL(imagePreview);
    }
  };
  return { imagePreview, selectedFile, setSelectedFile, imgData, clearImage };
}
