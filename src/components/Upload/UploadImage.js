import { useState, useRef, useEffect } from "react";
import Modal from "../UI/Modal/Modal";
import CloseBtn from "../../assets/icons/CloseBtn";
import classes from "./UploadImage.module.css";
import SmBtnWrapper from "../UI/Button/SmBtnWrapper";
import ErrorIcon from "../../assets/icons/Error";
import Success from "../../assets/icons/Success";
import { useCtx } from "../../context/appContext";

export default function UploadImage(props) {
  const { hideModalHandler } = useCtx();
  const hiddenFileInput = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);

  function handleClick() {
    hiddenFileInput.current.click();
  }

  function handleChange(event) {
    if (!event) {
      setSelectedFile(undefined);
      return;
    } else {
      setSelectedFile(event.target.files[0]);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
  };

  function onUploadBtnClick() {
    setError(null);
    const api_url = "https://api.thedogapi.com/v1/images/upload";
    const api_key =
      "live_e09VsHycp9lSzKVptryA9HrIYqbOOSjwAQbZUqeQ9C76UOly6uPKDIurbmxD4QOL";

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("x-api-key", api_key);

    let formdata = new FormData();
    formdata.append("file", selectedFile, "file");
    formdata.append("sub_id", "");

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(api_url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (!response.ok) {
          throw new Error(result);
        } else {
          setResponse(result);
          selectedFile();
        }
      })
      .catch((error) => setError(error.message));
  }

  return (
    <Modal>
      <div className={classes.modal_header_wrapper}>
        <SmBtnWrapper onClick={hideModalHandler}>
          <CloseBtn />
        </SmBtnWrapper>
        <div className={classes.modal_header}>
          <h1>Upload a .jpg or .png Dog Image</h1>
          <p className={classes.subtitle}>
            Any uploads must comply with the{" "}
            <a href="https://www.thedogapi.com/privacy" target="_blank">
              upload guidelines
            </a>{" "}
            or face deletion.
          </p>
        </div>
      </div>
      <div className={`${classes.drag_area} ${error ? classes.error : ""}`}>
        {!selectedFile && (
          <button onClick={handleClick} className={classes.browse}>
            <strong>Click here</strong> to upload
          </button>
        )}
        {selectedFile && (
          <div>
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Thumb"
              className={classes.imgUpload}
            />
          </div>
        )}
        <form onSubmit={onSubmit}>
          <input
            type="file"
            ref={hiddenFileInput}
            style={{ display: "none" }}
            onChange={handleChange}
          />
        </form>
      </div>
      {!selectedFile && <p className={classes.subtitle}>No files uploaded.</p>}
      <div className={classes.upload_container}>
        {selectedFile && (
          <p className={classes.subtitle}>
            Image FIle Name: {selectedFile.name}
          </p>
        )}
        {selectedFile && (
          <button className={classes.btn} onClick={onUploadBtnClick}>
            Upload
          </button>
        )}
        {!error && response && <p>{response}</p>}
        {error && (
          <div className={classes.info}>
            <ErrorIcon />
            <p>{error}</p>
          </div>
        )}
        {!error && response && (
          <div className={classes.info}>
            <Success />
            <p>Thanks for the Upload - Dog found!</p>
          </div>
        )}
      </div>
    </Modal>
  );
}
