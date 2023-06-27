import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { useCtx } from "../../../context/appContext";

const Backdrop = (props) => {
  const { hideModalHandler } = useCtx();
  return <div className={classes.backdrop} onClick={hideModalHandler} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
