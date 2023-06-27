import { Link, NavLink } from "react-router-dom";
import { useThemeCtx } from "../../../context/themeContext";
import NavBtn from "../Button/NavBtn";
import Logo from "../../../assets/Logo";
import classes from "./Header.module.css";
import search from "../../../assets/images-search.svg";
import breed from "../../../assets/pet-breeds.svg";
import vote from "../../../assets/vote-table.svg";

function Header() {
  const { checked, setChecked } = useThemeCtx();

  return (
    <header>
      <nav className={classes.nav}>
        <div className={classes.logo}>
          <Link to="/">
            <Logo />
          </Link>

          <label className={classes.switch}>
            <input
              type="checkbox"
              name="theme"
              onChange={(e) => setChecked(e.target.checked)}
              checked={checked}
            />
            <span className={`${classes.slider} ${classes.round}`}></span>
          </label>
        </div>
        <div className={classes.introduction}>
          <h1>Hello visitor!</h1>
          <p>Welcome to the pets page</p>
        </div>
        <p className={classes.intro}>Lets check out the app</p>
        <ul>
          <li className={classes.gallery}>
            <NavLink to="/gallery">
              <img
                src={search}
                className={classes.galleryImg}
                alt="search icon"
              />
            </NavLink>
            <NavBtn title="gallery" to="/gallery" />
          </li>
          <li className={classes.breeds}>
            <NavLink to="/breed">
              <img src={breed} alt="breeds" />
            </NavLink>
            <NavBtn title="breeds" to="/breed" />
          </li>
          <li className={classes.voting}>
            <NavLink to="/vote">
              <img src={vote} alt="votes icon" />
            </NavLink>
            <NavBtn title="voting" to="/vote" />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
