import { useEffect, useState } from "react";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import GridBreeds from "../components/UI/Grid/GridBreeds";
import SelectLimit from "../components/UI/Select/SelectLimit";
import SelectBreed from "../components/UI/Select/SelectBreed";
import Card from "../components/UI/Card/Card";
import ArrowBtn from "../components/UI/Button/ArrowBtn";
import classes from "./Breed.module.css";
import Loading from "../components/Loading/Loading";

function Breed() {
  const [breedTitle, setBreedTitle] = useState([]);
  const [breedsInfo, setBreedsInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState("");
  const [reverseItems, setreverseItems] = useState(false);

  async function fetchOptions(reverse = false, num = undefined) {
    setLoading(true);
    const response = await fetch("https://api.TheDogAPI.com/v1/breeds");
    const data = await response.json();
    setBreedTitle(data);
    if (num) {
      const filteredData = data.filter((i, index) => index === num);
      setBreedsInfo(filteredData);
    } else {
      if (reverse === true) {
        setBreedsInfo(data.reverse());
      } else {
        setBreedsInfo(data);
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchOptions();
  }, []);

  function selectDog(e) {
    fetchOptions(false, Number(e.target.value));
  }

  function selectLimit(e) {
    setLimit(Number(e.target.value));
  }

  function sortDogsHandler() {
    setreverseItems((i) => !i);
    fetchOptions(reverseItems);
  }

  return (
    <Card>
      <div className={classes.card_header}>
        <ArrowBtn title="breeds" />
        <SelectBreed breedTitle={breedTitle} onChange={selectDog} />
        <SelectLimit className={classes.select} onChange={selectLimit} />
        <button className={classes.sort} onClick={sortDogsHandler}>
          <HiOutlineArrowsUpDown className={classes.icon} />
        </button>
      </div>
      {loading && <Loading />}
      {!loading && <GridBreeds breedsInfo={breedsInfo} limit={limit} />}
    </Card>
  );
}

export default Breed;
