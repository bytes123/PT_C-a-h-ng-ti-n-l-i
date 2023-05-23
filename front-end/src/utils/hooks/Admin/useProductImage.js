import React, { useState, useEffect } from "react";

export default function useProductImage(
  newImageList,
  setNewImageList,
  newValues,
  setNewValues,
  isUpdate = false
) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (isUpdate) {
      setImages([undefined, undefined, undefined]);
    }
  }, [isUpdate]);

  const onChange = (imageList, addUpdateIndex) => {
    if (isUpdate) {
      const newList = newImageList.map((item, index) =>
        index == addUpdateIndex
          ? {
              ...imageList[addUpdateIndex],
              file_name: item.file_name,
              isDelete: true,
            }
          : item
      );

      if (!newValues?.images) {
        setNewValues({
          ...newValues,
          images: imageList.map((item) => item?.file),
          old_images: newList,
        });
      } else {
        setNewValues({
          ...newValues,
          images: newValues.images.map((item, index) =>
            index == addUpdateIndex ? imageList[addUpdateIndex]?.file : item
          ),
          old_images: newList,
        });
      }
      setImages(imageList);
      setNewImageList(newList);
    } else {
      setImages(imageList);
    }
  };

  return { images, onChange, setImages };
}
