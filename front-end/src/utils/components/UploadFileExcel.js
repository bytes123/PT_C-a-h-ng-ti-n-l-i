import React, { useState, useRef } from "react";
import { readFile } from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { MdOutlineDone } from "react-icons/md";

export default function UploadFile({ dataCheck }) {
  const ref = useRef();
  var XLSX = require("xlsx");
  const [productList, setProductList] = useState();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [fileError, setFileError] = useState("");

  const handleFile = async (event) => {
    const file = event.target.files[0];

    if (
      file.type !=
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      event.target.value = null;
      setFileError("Vui lòng tải lên một file Excel!");
      return;
    }
    const data = await file.arrayBuffer();
    const workbook = readFile(data);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    if (!jsonData.length) {
      event.target.value = null;
      setFileError("Vui chọn tệp có ít nhất 1 sản phẩm!");
      return;
    }
    const keys = Object.keys(jsonData[0]);
    if (keys.toString() == dataCheck.toString()) {
      setProductList(jsonData);
    } else {
      event.target.value = null;
      setFileError("File có các key không hợp lệ!");
      return;
    }
    setSelectedFileName(event.target.files[0].name);
    setFileError("");
    event.target.value = null;

    // CÒN XỬ LÝ PROGRESS LOAD FILE
  };

  const handleUploadFile = () => {
    console.log(productList);
  };

  const resetFile = () => {
    ref.current.value = "";
    setSelectedFileName("");
    setFileError("");
  };

  return (
    <>
      <div className="upload relative cursor-pointer mx-auto">
        <input
          ref={ref}
          type="file"
          name="file"
          className="absolute left-0 right-0 top-0 bottom-0 opacity-0 cursor-pointer"
          onChange={handleFile}
        />
        <p>
          Kéo file vào đây hoặc <span className="upload__button">Browse</span>
        </p>
      </div>
      {selectedFileName != "" ? (
        <>
          <div className="uploaded uploaded--one p-5 mx-auto">
            <i class="far fa-file-excel text-6xl mr-5"></i>
            <div className="file">
              <div className="file__name">
                <p>{selectedFileName}</p>
                <i className="fas fa-times" onClick={resetFile}></i>
              </div>
              <div class="progress mt-5">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                  role="progressbar"
                  style={{ width: "24%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="progress-done mt-3">
                <MdOutlineDone className="text-4xl text-lime-800" />
              </div>
            </div>
          </div>
          <div className="wrapper text-center">
            <button className="confirm-btn" onClick={handleUploadFile}>
              Upload
            </button>
          </div>
        </>
      ) : (
        ""
      )}
      {fileError ? (
        <p className="error text-3xl ml-5 mt-5 text-center">{fileError}</p>
      ) : (
        ""
      )}
    </>
  );
}
