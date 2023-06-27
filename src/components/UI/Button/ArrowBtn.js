import classes from "./ArrowBtn.module.css";
import { Link } from "react-router-dom";
import arrow from "../../../assets/icons/arrow-left.svg";

export default function ArrowBtn(props) {
  return (
    <div className={classes.section_title}>
      <button className={classes.arrowBtn}>
        <Link to="/">
          <img src={arrow} alt="Arrow icon" />
        </Link>
      </button>
      <span className={props.breedId ? classes.non_active : ""}>
        {props.title}
      </span>
      {props.breedId && <span>{props.breedId}</span>}
    </div>
  );
}
