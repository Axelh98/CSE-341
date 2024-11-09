const express = require("express");
const app = express();
const port = 8080;
const router = require("./routes");
const mongodb = require("./data/database");

app.use(express.json());

app.use("/api", router);


app.set("view engine", "ejs");

app.set("views", "views");


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log("Database initialized ! ! ! !");
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
