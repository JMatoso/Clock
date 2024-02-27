'use strict';

// Photo from Pexels

const banners = { 
    night: "https://images.pexels.com/photos/379419/pexels-photo-379419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    morning: "https://images.pexels.com/photos/1083342/pexels-photo-1083342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    afternoon: "https://images.pexels.com/photos/61135/pexels-photo-61135.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    sunset: "https://images.pexels.com/photos/66997/pexels-photo-66997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
}

var container = document.querySelector(".container");

window.onload = () => {
    clock();
    getQuote();
    getLocation();

    setInterval(clock, 1000);
    setInterval(getQuote, 60000);
    setInterval(getLocation, 600000);
}

function clock() {
    let date = new Date();

    let hour = date.toLocaleTimeString("en-US", { time: '2-digit' }).split(":");

    let day = date.toLocaleString('en-US', { day: '2-digit' });    

    let month = [
        date.toLocaleString('en-US', { month: 'long' }),
        date.toLocaleString('en-US', { month: '2-digit' })
    ]

    let year = date.getFullYear();

    setPeriodInformation(hour[0], hour[2].split(' ')[1].toString().trim().toLowerCase());

    document.querySelector("#seconds").innerText = hour[2];
    document.querySelector("#date").innerText = `${day}/${month[1]}/${year}`;
    document.querySelector("#time-clock").innerText = `${hour[0]}:${hour[1]}`;
}

function setPeriodInformation(hour, period) {
    let time_info = document.querySelector("#time-info");

    if((hour >= 0 && hour < 12) && period == "am") {
        time_info.innerText = "Good morning,";
        container.style.backgroundImage  = `url(${banners.morning})`;
        return;
    } 
    
    if(((hour >= 1 && hour < 6) && period == "pm") || hour == 12 && period == "pm") {
        time_info.innerText = "Good afternoon,";
        container.style.backgroundImage  = `url(${banners.afternoon})`;
        return;
    } 
    
    if(hour >= 6 && period == "pm") {
        time_info.innerText = "Good evening,";
        container.style.backgroundImage  = `url(${banners.night})`;
        return;
    } 
    
    time_info.innerText = "Hey there!";
    container.style.backgroundImage  = `url(${banners.sunset})`;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getUserAddress)
        return;
    } 

    console.log("Geolocation is not supported by this browser.");
}

async function getUserAddress(position) {
    // Source: https://geocode.maps.co
    await fetch(`https://geocode.maps.co/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&api_key=65de4e7de3d6b976439859xgbf4c093`).then((response) => {
        response.json().then((data) => {
            let address = data.address;

            let suburb = address.suburb != undefined ? ", " + address.suburb : ''; 
            let city = address.city != undefined ? address.city : 'City not found.'; 
            let neighbourhood = address.neighbourhood != undefined ? " " + address.neighbourhood : ''; 
            let country_code = address.country_code != undefined ? ", " + address.country_code.toUpperCase() : '';

            document.querySelector("#city").innerText = `In ${city}${suburb}${neighbourhood}${country_code}`;
            getWeather(position.coords.latitude, position.coords.longitude);
        });
    })
    .catch((error) => {
        console.error(error);
        return Object;
    });
}

async function getQuote() {
    // Source: https://github.com/lukePeavey/quotable
    await fetch('https://api.quotable.io/quotes/random').then((response) => {
        response.json().then((data) => {
            document.querySelector("#quote-place").innerHTML = `&quot;</blockquote>${data[0].content}</blockquote>&quot;`;
            document.querySelector(".quote-author").innerText = data[0].author;
        });
    })
    .catch((error) => {
        console.error(error);
        return Object;
    });
}

async function getWeather(latitude, longitude) {
    // Source: https://open-meteo.com/
    await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,precipitation,rain,showers,snowfall,wind_speed_10m&timezone=auto`).then((response) => {
        response.json().then((data) => {
            let weather = data.current;
            let units = data.current_units;

            document.querySelector(".w-temp").innerText = `${weather.temperature_2m}${units.temperature_2m}`;
            document.querySelector(".w-rain").innerText = `${weather.rain}${units.rain}`;
            document.querySelector(".w-snow").innerText = `${weather.snowfall}${units.snowfall}`;
            document.querySelector(".w-wind").innerText = `${weather.wind_speed_10m}${units.wind_speed_10m}`;
        });
    })
    .catch((error) => {
        console.error(error);
        return Object;
    });

    feather.replace();
}
