const express = require("express");
const {
  getTrailer,
  getTrailerFromViaPlay,
} = require("../controllers/trailers.controllers");
const router = express.Router();

router.route("/").get(getTrailer);
router.route("/viaplay").get(getTrailerFromViaPlay);

module.exports = router;
