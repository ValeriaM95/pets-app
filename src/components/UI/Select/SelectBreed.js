import classes from "./SelectBreed.module.css";

export default function SelectBreed({ breedTitle, onChange }) {
  return (
    <select className={classes.breeds} onChange={onChange}>
      <option>All Breeds</option>
      {breedTitle.map((breed) => {
        return (
          <option key={breed.id} value={breed.id}>
            {breed.name}
          </option>
        );
      })}
    </select>
  );
}
