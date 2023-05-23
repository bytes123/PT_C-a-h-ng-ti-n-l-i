import React, { useState } from "react";

export default function Avatar({ imgData, handleChangeAvatar }) {
  return (
    <>
      <label htmlFor="photo-upload" className="custom-file-upload fas">
        <div className="img-wrap img-upload">
          <img for="photo-upload" src={imgData} />
        </div>
        <input
          className="hidden"
          id="photo-upload"
          type="file"
          onChange={handleChangeAvatar}
        />
      </label>
      <h4 className="text-xl font-bold m-5">Ảnh đại diện</h4>
    </>
  );
}
