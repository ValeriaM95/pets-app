import { useState, useEffect } from "react";
import { useCtx } from "../context/appContext";
import SelectBreed from "../components/UI/Select/SelectBreed";
import Card from "../components/UI/Card/Card";
import GridGeneral from "../components/UI/Grid/GridGeneral";
import ArrowBtn from "../components/UI/Button/ArrowBtn";
import classes from "./Gallery.module.css";
import SelectLimit from "../components/UI/Select/SelectLimit";
import UpdateGridItems from "../assets/icons/UpgateGridItems";
import Upload from "../assets/icons/Upload";
import SmBtnWrapper from "../components/UI/Button/SmBtnWrapper";
import Loading from "../components/Loading/Loading";

function Gallery() {
  const {
    displayGallery,
    doggiesNotFound,
    breedTitle,
    breedsInfo,
    updataDogsData,
    displaySelectOptionBreeds,
    showModalHandler,
    loading,
  } = useCtx();
  const [limit, setLimit] = useState("");
  const [order, setOrder] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");

  useEffect(() => {
    displayGallery();
    displaySelectOptionBreeds();
  }, []);

  function selectLimit(e) {
    setLimit(Number(e.target.value));
  }

  function selectDog(e) {
    // fetchOptions(false, true, e.target.value);
  }

  function updateInfoHandler() {
    updataDogsData(type, order, limit, breed);
  }

  return (
    <Card>
      <div className={classes.section_header}>
        <ArrowBtn title="gallery" />
        <button className={classes.uploadBtn} onClick={showModalHandler}>
          <Upload />
          Upload
        </button>
      </div>
      <div className={classes.selects_wrapper}>
        <div className={classes.select_container}>
          <div>
            <p className={classes.subtitle}>order</p>
            <select onChange={(e) => setOrder(e.target.value.toLowerCase())}>
              <option>Random</option>
              <option>Desc</option>
              <option>Asc</option>
            </select>
          </div>
          <div>
            <p className={classes.subtitle}>type</p>
            <select onChange={(e) => setType(e.target.value)}>
              <option>All</option>
              <option>jpg</option>
              <option>png</option>
              <option>gif</option>
            </select>
          </div>
        </div>
        <div className={classes.select_container}>
          <div>
            <p className={classes.subtitle}>breed</p>
            <SelectBreed
              breedTitle={breedTitle}
              onChange={(e) => setBreed(e.target.value.toLowerCase())}
            />
          </div>
          <div className={classes.select_container_btn}>
            <div>
              <p className={classes.subtitle}>limit</p>
              <SelectLimit onChange={(e) => setLimit(e.target.value)} />
            </div>

            <SmBtnWrapper onClick={updateInfoHandler}>
              <UpdateGridItems />
            </SmBtnWrapper>
          </div>
        </div>
      </div>
      {doggiesNotFound === true && (
        <p className={classes.no_items_found_p}>
          No doggies found based on the filters you selected. Please try again
          by choosing different filters.
        </p>
      )}
      {!loading && <GridGeneral content={breedsInfo} />}
      {loading && <Loading />}
    </Card>
  );
}

export default Gallery;
