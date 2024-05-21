const {
  addToLikedMovies,
  getLikedMovies,
  removeLikedMovie,
} = require("../controllers/userControllers");

const router = require("express").Router();

router.post("/add", addToLikedMovies);
router.post("/likedMovies", getLikedMovies);
router.post("/removeMovies", removeLikedMovie);

module.exports = router;
