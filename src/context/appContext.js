import React, { useContext, useState } from "react";

const AppContext = React.createContext();

export function useCtx() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [workingArray, setWorkingArray] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState([]);
  const [breedsInfo, setBreedsInfo] = useState([]);
  const [breedTitle, setBreedTitle] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [dogsList, setDogsList] = useState([]);
  const [doggiesNotFound, setDoggiesNotFound] = useState(false);
  const [dogs, setDogs] = useState("");
  const [modalIsShown, setModalIsSHown] = useState(false);

  //  =============  OPEN / SHOW MODAL  =============

  const showModalHandler = () => {
    setModalIsSHown(true);
    console.log(modalIsShown);
  };

  const hideModalHandler = () => {
    setModalIsSHown(false);
    console.log(modalIsShown);
  };

  //  =============  GET LIKES, DISLIKES AND FAVORITES (FIREBASE)  =============  // (Pages: Vote, LikesPage, DislikesPage)
  async function getInfoFromDatabase(funcValue) {
    setLoading(true);
    const resp = await fetch(
      `https://dogs-api-e2089-default-rtdb.firebaseio.com/${funcValue}.json`
    );
    const data = await resp.json();

    const loadedData = [];
    for (const key in data) {
      loadedData.push({
        id: key,
        dogID: data[key].id,
        url: data[key].url,
      });
    }

    setContent(loadedData);
    setLoading(false);
  }

  //  =============  DISPLAY DOGGOS  =============  // (Pages: Breed, Gallery)

  // display / update doggos on the gallery page

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "x-api-key",
    "live_e09VsHycp9lSzKVptryA9HrIYqbOOSjwAQbZUqeQ9C76UOly6uPKDIurbmxD4QOL"
  );

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  async function displayGallery() {
    setLoading(true);
    const response = await fetch(
      "https://api.thedogapi.com/v1/images/search?limit=5",
      requestOptions
    );
    const data = await response.json();
    setBreedsInfo(data);
    setLoading(false);
  }

  async function displaySelectOptionBreeds() {
    const response = await fetch("https://api.TheDogAPI.com/v1/breeds");
    const data = await response.json();
    setBreedTitle(data);
  }

  async function updataDogsData(
    mime_types = "",
    order = "random",
    limit = "5",
    breedID = ""
  ) {
    setDoggiesNotFound(false);
    if (mime_types === "All") {
      mime_types = "";
    }

    if (limit === "") {
      limit = "5";
    }
    const response = await fetch(
      `https://api.thedogapi.com/v1/images/search?mime_types=${mime_types}&order=${order}&limit=${limit}&breed_ids=${breedID}`,
      requestOptions
    );
    const data = await response.json();
    if (data.length === 0) {
      setDoggiesNotFound(true);
    }
    setBreedsInfo(data);
  }

  const value = {
    content,
    breedsInfo,
    breedTitle,
    modalIsShown,
    dogs,
    searchWord,
    dogsList,
    searchTerm,
    workingArray,
    loading,
    doggiesNotFound,
    setLoading,
    setDogs,
    setSearchWord,
    setSearchTerm,
    displaySelectOptionBreeds,
    displayGallery,
    getInfoFromDatabase,
    updataDogsData,
    hideModalHandler,
    showModalHandler,
    setDogsList,
    setWorkingArray,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
