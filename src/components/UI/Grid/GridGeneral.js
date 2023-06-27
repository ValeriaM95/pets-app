import classes from "./GridGeneral.module.css";

export default function GridGeneral({ content }) {
  return (
    <div className={classes.gridContainer}>
      {content.length !== 0 &&
        content.map((i) => {
          return (
            <div key={i.id}>
              <img src={i.url} alt="dog" className={classes.breed_image} />
            </div>
          );
        })}
    </div>
  );
}
