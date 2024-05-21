import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Navbar from "../components/Layout/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";

const Netflix = () => {
  const navigate = useNavigate();
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!genresLoaded) {
      dispatch(getGenres());
    }
  });
  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all", time_window: "week" }));
    }
  }, [genresLoaded]);

  return (
    <Caontainer>
      <Navbar />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center"
            >
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} genres={genres} type="all" time_window="week"/>
    </Caontainer>
  ); 
};

const Caontainer = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;

export default Netflix;
