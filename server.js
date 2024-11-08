const express = require('express');
const app = express();
const port = 8080;
const router = require('./routes');


app.use(express.json());


app.use('/api', router);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});