
"use strict";





// Today  Card 

let currentCity ;
let today = document.getElementById("today");
let todayDate = document.getElementById("todayDate");
let city =document.getElementById("city");
let todayTemprature =document.getElementById("today-temprature");
let todayIcon =document.getElementById("today-icon");
let humidty =document.getElementById("humidty");
let wind =document.getElementById("wind");
let compass =document.getElementById("compass");
let search =document.getElementById("search");
let todayDescription =document.getElementById("today-description");
let country = document.getElementById("country");

// Next     Days      Card

let nextDay =document.getElementsByClassName("nextDay");
let nextDayIcon =document.getElementsByClassName("nextDay-icon");
let maxDegree =document.getElementsByClassName("max-degree");
let minDegree  =document.getElementsByClassName("min-degree");
let nextDayDescription =document.getElementsByClassName("nextDay-description");
//let  currentCity="cairo";
let api ;
let responseData,

monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],
days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];




 async  function getWeather(currentCity='Alexandria') {
     api = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=bb6e71e9d2fc4d09a94214517221511&q=${currentCity}&days=3`);
     
     responseData = await  api.json();
   console.log(responseData);

   displayTodayWeather();
   displayNextDayWeather() ;
}
 getWeather();


function displayTodayWeather() {

  let date = new Date ();
   today.innerHTML = days[date.getDay()];
   todayDate.innerHTML= `${date.getDate()}  ${monthName[date.getMonth()]}`;
   city.innerHTML=responseData.location.name;
   country.innerHTML=responseData.location.country;
   todayTemprature.innerHTML= responseData.current.temp_c ;
   todayIcon.setAttribute("src",`https:${responseData.current.condition.icon  }`) ;  
   wind.innerHTML=responseData.current.wind_kph ;
   humidty.innerHTML=responseData.current.humidity;
   compass.innerHTML=responseData.current.wind_dir;
   todayDescription.innerHTML=responseData.current.condition.text;
   


}


function displayNextDayWeather() {
 for (let i = 0; i < nextDay.length; i++) {



  nextDay[i].innerHTML=days[new Date (responseData.forecast.forecastday[i+1].date).getDay()    ];
  nextDayIcon[i].setAttribute("src",`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`) ;
  maxDegree[i].innerHTML =responseData.forecast.forecastday[i+1].day.maxtemp_c ;
  minDegree[i].innerHTML =responseData.forecast.forecastday[i+1].day.mintemp_c ;
  nextDayDescription[i].innerHTML =responseData.forecast.forecastday[i+1].day.condition.text ;

 }
  
}

search.addEventListener("keyup",function( ){
  currentCity= search.value;
  console.log(currentCity);
 getWeather(currentCity);
})


// https://api.weatherapi.com/v1/search.json?key=bb6e71e9d2fc4d09a94214517221511&q=cairo&days=3


