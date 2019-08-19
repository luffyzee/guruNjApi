const mongoose = require("mongoose");
const express = require("express");
const app = express();

require("./startup/routes")(app);

mongoose
  .connect("mongodb://localhost/hani", { useNewUrlParser: true })
  .then(() => console.log("Connected to database"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
