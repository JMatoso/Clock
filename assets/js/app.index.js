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
    
    if((hour >= 1 && hour < 6) && period == "pm") {
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
    await fetch(`https://geocode.maps.co/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}`).then((response) => {
        response.json().then((data) => {

            //getWeather(position.coords.latitude, position.coords.longitude);

            let address = data.address;

            let suburb = address.suburb != undefined ? ", " + address.suburb : ''; 
            let city = address.city != undefined ? address.city : 'City not found.'; 
            let neighbourhood = address.neighbourhood != undefined ? " " + address.neighbourhood : ''; 
            let country_code = address.country_code != undefined ? ", " + address.country_code.toUpperCase() : '';

            document.querySelector("#city").innerText = `In ${city}${suburb}${neighbourhood}${country_code}`;
        });
    })
    .catch((error) => {
        console.error(error);
        return Object;
    });
}

async function getQuote() {
    await fetch('https://motivational-quote-api.herokuapp.com/quotes/random').then((response) => {
        response.json().then((data) => {
            document.querySelector("#quote-place").innerHTML = `&quot;</blockquote>${data.quote}</blockquote>&quot;`;
            document.querySelector(".quote-author").innerText = data.person;
        });
    })
    .catch((error) => {
        console.error(error);
        return Object;
    });
}

async function getWeather(latitude, longitude) {
    await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&days=3&units=S&lang=en&key=c40b76dc501f47208f054da57124070a`).then((response) => {
        response.json().then((data) => {
            console.log(data)
        });
    })
    .catch((error) => {
        console.error(error);
        return Object;
    });
}