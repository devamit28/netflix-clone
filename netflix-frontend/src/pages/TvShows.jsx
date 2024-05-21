import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Layout/Navbar";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { fireBaseAuth } from "../utils/firebaseConfig";

const TvShows = () => {
  const [user, setUser] = useState(undefined);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "tv", time_window: "week" }));
    }
  }, [genresLoaded]);

  onAuthStateChanged(fireBaseAuth, (currentUser) => {
    if (currentUser) setUser(currentUser.uid);
    else navigate("/login");
  });

  return (
    <Container>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
};

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

export default TvShows;
