let weatherApiKey = "c2afbe1058c9f5c5a38f17587265c8d2"
let inputEl = document.getElementById("input-el");
let inputBtn = document.querySelector("#input-btn");
let cityName = document.querySelector("#city-name");
let weatherType = document.querySelector("#weather-type");
let averageTemp = document.getElementById("av-temp");
let maxTemp = document.getElementById("mx-temp");
let minTemp = document.getElementById("mn-temp");
const apiCall = "https://api.openweathermap.org/data/2.5/weather?";
let errorMessage = document.getElementById("error-message");
let errorHead = document.getElementById("error-head");
let errorBody = document.getElementById("error-body");


window.onload = (errorMessage.style.display = "none")


let fetchWeatherData = (city) => {
 const fullApiCall = `${apiCall}q=${city},&appid=${weatherApiKey}&units=metric`
 // console.log(fullApiCall);
 const weatherPromise = fetch(fullApiCall);
 // console.log(weatherPromise);
 return weatherPromise.then((Response)=>{
  return Response.json();
 }).catch((error)=>{
  // return (`Kindly check your internet setting ${error}`)
  errorMessage.style.display = "block";
  errorHead.textContent = `${error}`;
  errorBody.textContent = `Kindly check your internet setting`;
  cityName.textContent = "Failed to fetch";
  weatherType.textContent = "---";
  averageTemp.textContent = "---";
  maxTemp.textContent = "---";
  minTemp.textContent = "---";
 })
};

// console.log(fetchWeatherData("Ibadan"));

let extractWeatherData = () => {
 let cityValue = inputEl.value;
 let city = cityValue.toLowerCase();
 let extract = fetchWeatherData(city);
 return extract.then((data)=>{
  console.log(data)
  if(data.cod == 404){
   errorMessage.style.display = "block";
   errorHead.textContent = `Error Message: Temporarily, ${data.message} `;
   errorBody.textContent = `Please refresh the page and check city input`;
   cityName.textContent = data.cod;
   weatherType.textContent = "----";
   averageTemp.textContent = "----";
   maxTemp.textContent = "----";
   minTemp.textContent = "----";
  }else{
   showWeatherData(data);
  }
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
clearCard();
});

function clearCard (){
inputEl.value = "";
errorMessage.style.display = "none";
errorHead.textContent = "";
errorBody.textContent = "";
cityName.textContent = "Retrieving";
weatherType.textContent = "Retrieving";
averageTemp.textContent = "Retrieving";
maxTemp.textContent = "Retrieving";
minTemp.textContent = "Retrieving";
}