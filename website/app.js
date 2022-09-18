/**
 * /* Global Variables
 *
 * @format
 */

// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '3e4d37ee920a86cf36777d858898d89e&units=imperial';
let ZIP = '';
const serverurl = 'http://localhost:3000';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', () => {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getWeatherData(baseURL, zip, apiKey).then(function (data) {
    console.log(data);
    postData(serverurl + '/add', {
      date: newDate,
      temp: data.main.temp,
      content: feelings,
    });
    updateUI();
  });
});

//async function to fetch data from api
async function getWeatherData(baseURL, zip, key) {
  const api = baseURL + `${zip}&APPID=${key}`;

  const response = await fetch(api);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
}

// getWeatherData(baseURL, ZIP, apiKey);

// Function to POST data
const postData = async (url = '', data = {}) => {
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
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

const updateUI = async () => {
  const request = await fetch(serverurl + '/all');
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML =  Math.round(allData.temp)+ 'degrees';;
    document.getElementById('content').innerHTML = allData.content;
  } catch (error) {
    console.log('error', error);
  }
};
