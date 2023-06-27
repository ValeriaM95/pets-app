import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useCtx } from "./context/appContext";
import { useState } from "react";
import Error from "./pages/Error";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Vote from "./pages/Vote";
import Breed from "./pages/Breed";
import SingleBreed from "./pages/SingleBreed";
import Search from "./pages/Search";
import LikesPage from "./pages/LikesPage";
import DislikesPage from "./pages/DislikesPage";
import FavPage from "./pages/FavPage";
import UploadImage from "./components/Upload/UploadImage";

function App() {
  const { modalIsShown, hideModalHandler } = useCtx();

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <Error />,
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        { path: "/gallery", element: <Gallery /> },
        {
          path: "/breed",
          element: <Breed />,
        },
        { path: "/breed/:breedId", element: <SingleBreed /> },
        { path: "/vote", element: <Vote /> },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/likes",
          element: <LikesPage />,
        },
        {
          path: "/dislikes",
          element: <DislikesPage />,
        },
        {
          path: "/favorites",
          element: <FavPage />,
        },
      ],
    },
  ]);
  return (
    <>
      {modalIsShown && <UploadImage onClose={hideModalHandler} />}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
