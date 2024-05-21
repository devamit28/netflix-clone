import React, { useEffect, useState } from "react";
import { fireBaseAuth } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLikedMovies } from "../store";
import styled from "styled-components";
import Navbar from "../components/Layout/Navbar";
import Card from "../components/Card";

const LikedMovies = () => {
  const movies = useSelector((state) => state.netflix.movies);
  const [email, setEmail] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  onAuthStateChanged(fireBaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });
  useEffect(() => {
    if (email) {
      dispatch(getLikedMovies({ email }));
    }
  }, [email]);
  return (
    <Container>
      <Navbar />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} isLiked={true}/>;
          })}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;

export default LikedMovies;
