import classes from "./Card.module.css";
import Like from "../../../assets/icons/Like";
import Dislike from "../../../assets/icons/Dislike";
import Heart from "../../../assets/icons/Heart";
import SmBtnWrapper from "../Button/SmBtnWrapper";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { useCtx } from "../../../context/appContext";

function Card(props) {
  const {
    setSearchTerm,
    searchTerm,
    setDogsList,
    setSearchWord,
    setDogs,
    setWorkingArray,
    setLoading,
  } = useCtx();
  const [onHover, setOnHover] = useState(false);

  const SEARCH_URL = "https://api.thedogapi.com/v1/breeds/search?q=";

  const navigation = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch("https://api.TheDogAPI.com/v1/breeds");
      const data = await resp.json();
      setWorkingArray(data);
    }

    fetchData();
  }, []);

  async function searchForDog() {
    navigation("/search", { state: searchTerm, replace: true });
    setLoading(true);
    if (searchTerm && searchTerm.length > 0) {
      setSearchWord(searchTerm);
      const response = await fetch(SEARCH_URL + searchTerm);
      const data = await response.json();
      if (data.length === 0) {
      }
      setDogsList(data);
      setDogs(
        data.map((i) => {
          return i.id - 1;
        })
      );
    }

    setSearchTerm("");
    setLoading(false);
  }

  function searchHandler(e) {
    e.preventDefault();
    searchForDog();
  }

  return (
    <div className={classes.wrapper_container}>
      <div className={classes.form_container}>
        <form className={classes.search_form} onSubmit={searchHandler}>
          <input
            type="text"
            className={classes.search}
            placeholder={onHover ? "" : "Search for breeds by name"}
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div className={classes.btn_container}>
          <SmBtnWrapper>
            <NavLink
              to="/likes"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <Like />
            </NavLink>
          </SmBtnWrapper>
          <SmBtnWrapper>
            <NavLink
              to="/dislikes"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <Dislike />
            </NavLink>
          </SmBtnWrapper>
          <SmBtnWrapper>
            <NavLink
              to="/favorites"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              <Heart />
            </NavLink>
          </SmBtnWrapper>
        </div>
      </div>
      <section className={classes.card}>{props.children}</section>
    </div>
  );
}

export default Card;
