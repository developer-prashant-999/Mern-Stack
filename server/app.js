const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
require("./db/connection");

app.use(express.json());

app.use(require("./router/auth"));

const port = process.env.PORT;

app.listen(port, () => {
  console.log("running");
});
