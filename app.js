let weatherApiKey = "c2afbe1058c9f5c5a38f17587265c8d2"
let inputEl = document.getElementById("input-el");
let inputBtn = document.querySelector("#input-btn");
let cityName = document.querySelector("#city-name");
let weatherType = document.querySelector("#weather-type");
let averageTemp = document.getElementById("av-temp");
let maxTemp = document.getElementById("mx-temp");
let minTemp = document.getElementById("mn-temp");
const apiCall = "https://api.openweathermap.org/data/2.5/weather?";


let fetchWeatherData = (city) => {
 const fullApiCall = `${apiCall}q=${city},&appid=${weatherApiKey}&units=metric`
 // console.log(fullApiCall);
 const weatherPromise = fetch(fullApiCall);
 // console.log(weatherPromise);
 return weatherPromise.then((Response)=>{
  return Response.json();
 }).catch((error)=>{
  return (`Kindly check your internet setting ${error}`)
 })
};

// console.log(fetchWeatherData("Ibadan"));

let extractWeatherData = () => {
 let cityValue = inputEl.value;
 let city = cityValue.toLowerCase();
 let extract = fetchWeatherData(city);
 return extract.then((data)=>{
  console.log(data)
  showWeatherData(data);
 })
}

let showWeatherData = (weatherParameters)=>{
 cityName.textContent = weatherParameters.name;
 weatherType.textContent = weatherParameters.weather[0].main;
 averageTemp.textContent = weatherParameters.main.temp;
 maxTemp.textContent = weatherParameters.main.temp_max;
 minTemp.textContent = weatherParameters.main.temp_min;
}

inputBtn.addEventListener("click", ()=>{
extractWeatherData();
inputEl.value = "";
});