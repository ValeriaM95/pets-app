import { NavLink } from "react-router-dom";
import classes from "./NavBtn.module.css";
function NavBtn(props) {
  return (
    <button className={classes.navBtn}>
      <NavLink
        to={props.to}
        className={({ isActive }) => (isActive ? classes.active : "")}
      >
        {props.title}
      </NavLink>
    </button>
  );
}

export default NavBtn;
