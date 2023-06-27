import Card from "../components/UI/Card/Card";
import classes from "./Vote.module.css";
import ArrowBtn from "../components/UI/Button/ArrowBtn";
import { useState, useEffect } from "react";
import Like from "../assets/icons/Like";
import Dislike from "../assets/icons/Dislike";
import Heart from "../assets/icons/Heart";

function Vote() {
  const [randomDog, setRandomDog] = useState("");
  const [like, setLike] = useState(false);
  const [removelike, setRemovelike] = useState();
  const [fav, setFav] = useState(false);
  const LOAD_RAND_IMG_URL =
    "https://api.thedogapi.com/v1/images/search?format=json";

  async function loadRandomImage() {
    const response = await fetch(LOAD_RAND_IMG_URL);
    const data = await response.json();
    setRandomDog(data);
    setLike(false);
    setFav(false);
    setRemovelike(false);
  }

  async function addToDatabase(value) {
    await fetch(
      `https://dogs-api-e2089-default-rtdb.firebaseio.com/${value}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          id: randomDog[0].id,
          url: randomDog[0].url,
        }),
      }
    );
  }

  useEffect(() => {
    loadRandomImage();
  }, []);

  function addToLikes() {
    addToDatabase("likes");
    setLike(true);
    setTimeout(() => {
      loadRandomImage();
    }, 2000);
  }

  function addToFav() {
    addToDatabase("favorites");
    setFav(true);
  }

  function removeLike() {
    addToDatabase("dislikes");
    setRemovelike(true);
    setTimeout(() => {
      loadRandomImage();
    }, 2000);
  }

  return (
    <Card>
      <ArrowBtn title="voting" />
      <section className={classes.voting_section_wrapper}>
        <div className={classes.image_container}>
          {randomDog && <img src={randomDog[0].url} alt="Dog Image" />}
        </div>
        <div className={classes.btn_group}>
          <button
            className={classes.left}
            onClick={addToLikes}
            disabled={removelike || like}
          >
            <Like />
          </button>
          <button className={classes.middle} onClick={addToFav} disabled={fav}>
            <Heart />
          </button>
          <button
            className={classes.right}
            onClick={removeLike}
            disabled={removelike || like}
          >
            <Dislike />
          </button>
        </div>
        {like && (
          <div className={classes.info}>
            <p>
              Image ID: <strong>{randomDog[0].id}</strong> was added to Likes
            </p>
            <Like className={classes.like} />
          </div>
        )}
        {fav && (
          <div className={classes.info}>
            <p>
              Image ID: <strong>{randomDog[0].id}</strong> was added to
              Favorites
            </p>
            <Heart />
          </div>
        )}

        {removelike && (
          <div className={classes.info}>
            <p>
              Image ID: <strong>{randomDog[0].id}</strong> was added to Dislikes
            </p>
            <Dislike />
          </div>
        )}
      </section>
    </Card>
  );
}

export default Vote;
