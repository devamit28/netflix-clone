import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import LikedMovies from "./pages/LikedMovies";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Netflix />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/tv" element={<TvShows />}></Route>
        <Route path="/mylist" element={<LikedMovies />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route exact path="/player" element={<Player />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
