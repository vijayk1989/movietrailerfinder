const express = require("express");
const {
  getTrailer,
  getTrailerFromViaPlay,
} = require("../controllers/trailers.controller");
const router = express.Router();

router.route("/").post(getTrailer);
router.route("/viaplay").post(getTrailerFromViaPlay);

module.exports = router;
