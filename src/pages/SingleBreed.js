import { useParams } from "react-router";
import { useEffect, useState } from "react";
import classes from "./SingleBreed.module.css";
import Loading from "../components/Loading/Loading";
import Card from "../components/UI/Card/Card";
import ArrowBtn from "../components/UI/Button/ArrowBtn";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useCtx } from "../context/appContext";

export default function SingleBreed() {
  const { loading, setLoading } = useCtx();
  const { breedId } = useParams();
  const [breedInfo, setBreedInfo] = useState([]);
  const [imagesArr, setImagesArr] = useState([]);
  const [value, setValue] = useState(0);
  const SINGLE_BREED_SEARCH_URL = `https://api.TheDogAPI.com/v1/breeds/${breedId}`;
  const SINGLE_BREED_IMAGES_SEARCH_URL = `https://api.thedogapi.com/v1/images/search?format=json&breed_ids=${breedId}&limit=10`;

  useEffect(() => {
    const lastIndex = imagesArr.length - 1;
    if (value < 0) {
      setValue(lastIndex);
    }
    if (value > lastIndex) {
      setValue(0);
    }
  }, [value, imagesArr]);

  async function getDogInfo() {
    const response = await fetch(SINGLE_BREED_SEARCH_URL);
    const data = await response.json();
    setBreedInfo(data);
  }

  async function getImagesInfo() {
    setLoading(true);
    const response = await fetch(SINGLE_BREED_IMAGES_SEARCH_URL);
    const data = await response.json();
    setImagesArr(data);
    setLoading(false);
  }

  useEffect(() => {
    getDogInfo();
    getImagesInfo();
  }, []);

  const { name, bred_for, life_span, temperament } = breedInfo;
  console.log(value);

  return (
    <Card>
      <ArrowBtn title="breeds" breedId={breedId} />
      <section className={classes.section_wrapper}>
        <div className={classes.btnContainer}>
          <button
            className={classes.sliderBtn}
            onClick={() => setValue(value - 1)}
          >
            <IoIosArrowBack />
          </button>
          {loading && <Loading />}
          <button
            className={classes.sliderBtn}
            onClick={() => setValue(value + 1)}
          >
            <IoIosArrowForward />
          </button>
        </div>
        {/* <div className={classes.dog_info}> */}
        {imagesArr.map((i, index) => {
          const { id, url } = i;
          let position = classes.nextSlide;

          if (index === value) {
            position = classes.activeSlide;
          } else if (
            index === value - 1 ||
            (value === 0 && index === imagesArr.length - 1)
          ) {
            position = classes.lastSlide;
          }

          return (
            <div className={`${classes.image_container} ${position}`} key={id}>
              <img src={url} alt="Dog image" />
            </div>
          );
        })}

        {!loading && (
          <div className={classes.description_container}>
            <div className={classes.title_wrapper}>
              <h2 className={classes.title}>{name}</h2>
              <p className={classes.subtitle}>{bred_for}</p>
            </div>
            <div className={classes.characteristics}>
              <p className={classes.temperament}>
                <strong>Temperament: </strong>
                {temperament}
              </p>
              <div className={classes.metrics}>
                <p>
                  <strong>Height: </strong>
                  {breedInfo.height && breedInfo.height["metric"]} kgs
                </p>
                <p>
                  <strong>Weight: </strong>
                  {breedInfo.weight && breedInfo.weight["metric"]} cm
                </p>
                <p>
                  <strong>Life span: </strong>
                  {life_span}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* </div> */}
      </section>
    </Card>
  );
}
