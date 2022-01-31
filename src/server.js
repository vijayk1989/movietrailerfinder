const express = require("express");
const cors = require("cors");
const app = express();
const trailersRouters = require("./routes/trailers.router");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.json());
app.use("/api/v1/trailers", trailersRouters);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res, next) => {
  res.send("Route not found");
});

app.use(errorHandler);

module.exports = app;
