/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&zip='
let apiKey = '&appid=0bba3567fc4659607f8314db27563eea';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// listen to button click
document.getElementById('generate').addEventListener('click', submitWeather);

// Button function on click event to retrieve data from OpenWeatherMap
function submitWeather(e) {
    const zip = document.getElementById('zip').value;
    getWeatherByZip(baseURL, zip, apiKey)
        .then(function (data) {
            const userResponse = document.getElementById('feelings').value;
            addUserWeather('/add', {
                temperature: data.main.temp,
                date: newDate,
                userResponse: userResponse
            }).then(
                updateUI('/all')
            )
        });
}
// fetch weather from OpenWeatherMap
const getWeatherByZip = async (baseURL, zip, key) => {
    const res = await fetch(baseURL + zip + key)
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}
// Post request  to add user weather data
const addUserWeather = async(url='',data ={}) =>{
        const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
    }
}
// get request to retrieve saved data
const updateUI = async (url='')=>{
    const res = await fetch(url);
    try {
        const data = await res.json();
        bindUpdateUI(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

// bind data to most recent entry
const bindUpdateUI = (data)=>{
    document.getElementById('date').innerHTML = data.date;
    document.getElementById('temp').innerHTML = data.temperature;
    document.getElementById('content').innerHTML = data.userResponse;
}