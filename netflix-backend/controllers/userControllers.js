const Users = require("../models/userModel");

module.exports.addToLikedMovies = async (req, res) => {
  const { email, data } = req.body;
  const user = await Users.findOne({ email });
  if (user) {
    const { likedMovies } = user;
    const moviesAlreadyLikedByUser = likedMovies.find(
      ({ id }) => id === data.id
    );
    if (moviesAlreadyLikedByUser)
      return res.json({ msg: "You already liked this movie" });
    else {
      await Users.findByIdAndUpdate(
        user._id,
        {
          likedMovies: [...likedMovies, data],
        },
        { new: true }
      );
    }
  } else {
    await Users.create({ email, likedMovies: [data] });
  }
  return res.json({ msg: "Movie successfully added to liked list." });
};

module.exports.getLikedMovies = async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });
  if (user) res.json({ msg: "Liked movies found", movies: user.likedMovies });
  else return res.json({ msg: "No liked movies found with this user" });
};

module.exports.removeLikedMovie = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      const movies = user.likedMovies;
      const movieIndex = await movies.findIndex(({ id }) => id == movieId);
      if (movieIndex < 0 ) {
        return res.status(400).send({ msg: "Movie not found." });
      }
      await movies.splice(movieIndex, 1);
      await Users.findByIdAndUpdate(
        user._id,
        {
          likedMovies: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie successfully removed.", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    //console.log(error);
    return res.json({ msg: "Something went wrong" });
  }
};
