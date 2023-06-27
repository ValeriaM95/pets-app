import Card from "../components/UI/Card/Card";
import ArrowBtn from "../components/UI/Button/ArrowBtn";
import GridBreeds from "../components/UI/Grid/GridBreeds";
import classes from "./Search.module.css";
import { useCtx } from "../context/appContext";
import Loading from "../components/Loading/Loading";

export default function Search() {
  const { dogs, searchWord, workingArray, loading } = useCtx();

  let searchResult = [];

  if (dogs.length > 0 && workingArray.length > 0) {
    searchResult = workingArray.filter((el, i) => dogs.some((j) => i === j));
  }
  return (
    <Card>
      <ArrowBtn title="search" />
      <p className={classes.subtitle}>
        Search results for: <strong>{searchWord}</strong>
      </p>
      {loading && <Loading />}
      {!loading && (
        <GridBreeds breedsInfo={searchResult} limit={searchResult.length} />
      )}
    </Card>
  );
}
