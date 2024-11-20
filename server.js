const express = require("express");
const app = express();
const port = 8080;
const router = require("./routes");
const mongodb = require("./data/database");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const errorHandler = require("./middleware/errorHandler");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  // Para formularios
app.use(methodOverride('_method'));
app.use("/", router); // Use the router
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`); // Set the views directory        
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Z-key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
})

app.use(errorHandler);


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
