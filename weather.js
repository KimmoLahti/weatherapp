//all kinds of constants
const input = document.getElementById("input");
//my personal api ket to get data from open weather
const apikey = "5e0f9a9946b4455c381993253d65961a";
const heat = document.getElementById("heat");
const form = document.getElementById("form");
const city = document.getElementById("city");
const feel = document.getElementById("feel");

//event listener to listen "search" button click or user pressing enter key
form.addEventListener("submit", (y) =>{
//prevent default behavior from the browser, so it wont reload the page
    y.preventDefault();
//if input is empty or shorter than 1, page will inform the user and turn form input field red
    if((input.value == null || input.value == "") || (input.value.length < 1)){
        alert("Please write a location!");
        input.style.borderColor = "red";

    }
    //else use openweather api url, input value and my personal key to fetch data
    else
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apikey}&units=metric`)
.then(response => response.json())
.then(data => {
    //fetch current temperature
  let heatt = data["main"]["temp"];
  //fetch weather description
  let feell = data["weather"][0]["description"];
  //fetch location name
  let cityy = data["name"];
  //variable to use with datetime function
  let time = new Date();
  //new variables for date and variable temperature during the day
  let date = document.getElementById("date");
  let varies = document.getElementById("varies");
  //fetch max and min temperature during the day
  let max = data["main"]["temp_max"];
  let min = data["main"]["temp_min"];
  //fetch how the temperature feels like
  let feelslike = data["main"]["feels_like"];
  //new variables for humidity and feels like
  let feels = document.getElementById("feels")
  let humi = document.getElementById("humi")
  //fetch humidity
  let humidity = data["main"]["humidity"];
  //Variable for wind speed
  let wind = document.getElementById("wind");
  //fetch wind speed
  let windspeed = data["wind"]["speed"];
  //fetch country name
  let country = data["sys"]["country"]


    //place all the fetch data to html and make it look nice
  city.innerHTML = cityy+", "+country;
  heat.innerHTML = "Temperature: "+heatt+"°c";
  feel.innerHTML = "Weather: "+feell;
  date.innerText = datetime(time);
  varies.innerText = "Min/max temperature: "+min+" / "+max;
  feels.innerHTML = "Feels like: "+feelslike;
  humi.innerHTML = "Humidity: "+humidity+"%";
  wind.innerHTML = "Wind speed: "+windspeed+"m/s";


  //reset bordercolor and input value to empty
  input.style.borderColor = "";
  input.value ="";
})
// if location name is wrong the page will inform the user with alert
.catch(error => alert("Wrong location name!"));
})
//function to crate month, days, date and year
function datetime (b) {
    //arrays for months and days
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //get data for correct day, date, month and a year
    let day = days[b.getDay()];
    let date = b.getDate();
    let month = months[b.getMonth()];
    let year = b.getFullYear();
    //return data when function is called
    return `${day}. ${date}. ${month}. ${year}`;
  }