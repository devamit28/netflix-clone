import {
  API_KEY,
  NETFLIX_BACKEND_URL,
  TMDB_BASE_URL,
} from "../utils/constants";
import axios from "axios";
import {
  createAsyncThunk,
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  genres: [],
  genresLoaded: false,
};

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return genres;
});

export const getLikedMovies = createAsyncThunk(
  "netflix/getlikedmovies",
  async ({ email }) => {
    const {
      data: { movies },
    } = await axios.post(`${NETFLIX_BACKEND_URL}/api/user/likedMovies`, {
      email,
    });
    return movies;
  }
);

export const removeLikedMovie = createAsyncThunk(
  "netflix/removelikedmovie",
  async ({ email, movieId }) => {
    const {
      data: { movies },
    } = await axios.post(`${NETFLIX_BACKEND_URL}/api/user/removeMovies`, {
      email,
      movieId,
    });
    return movies;
  }
);

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  ({ type, time_window }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/${time_window}?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const fetchDataByGenre = createAsyncThunk(
  "netflix/genre",
  async ({ genre, type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    let genreDetails = "";
    if (genre !== "all") {
      genreDetails = `&with_genres=${genre}`;
    }
    return getRawData(
      `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}${genreDetails}`,
      genres
    );
  }
);

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeLikedMovie.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
export const { setGenres, setMovies } = NetflixSlice.actions;
