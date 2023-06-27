import classes from "./SmBtnWrapper.module.css";

export default function SmBtnWrapper(props) {
  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
