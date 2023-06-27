import classes from "./GridBreeds.module.css";
import { Link } from "react-router-dom";

export default function GridBreeds({ breedsInfo, limit }) {
  return (
    <div className={classes.displayImages}>
      {breedsInfo &&
        breedsInfo.slice(0, !limit ? 5 : limit > 15 ? 15 : limit).map((i) => {
          return (
            <div key={i.id} className={classes.image_container}>
              <div className={classes.overlay}></div>
              <img
                src={i.image.url}
                className={classes.breed_image}
                alt="dog"
              />

              <button className={classes.breed_btn}>
                <Link to={`/breed/${i.id}`}>{i.name}</Link>
              </button>
            </div>
          );
        })}
    </div>
  );
}
