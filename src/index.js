const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const trailersRouters = require("./routes/trailers.router");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
