// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors  = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port=8000;
const server= app.listen(8000, () => {
    console.log('Listening on port ' + port); //Listening on port 8888
});
// Get route to return projectData object
app.get('/all', (req, res) => {
    res.send(projectData);
});
// Post route to add income data
app.post('/add',(req,res)=>{
    const recievedData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    }
    projectData = recievedData;
    res.send(projectData);
});