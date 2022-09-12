'use strict';

var circle = document.querySelector(".circle");

var time = document.querySelector("#time");
var dayOfWeek = document.querySelector("#day");
var seconds = document.querySelector("#seconds");
var full_date = document.querySelector("#full-date");

window.onload = () => {
  setInterval(clock, 1000);
  setInterval(changeThemeColor, 3500);
}

function clock() {
  let date = new Date();

  let hour = date.toLocaleTimeString().split(":");

  dayOfWeek.innerText = date.toLocaleString('en-US', { weekday: 'long' }).toUpperCase();

  let day = date.toLocaleString('en-US', { day: '2-digit' });    

  let month = [
      date.toLocaleString('en-US', { month: 'long' }),
      date.toLocaleString('en-US', { month: '2-digit' })
  ]

  let year = date.getFullYear();

  seconds.innerText = hour[2];
  time.innerText = `${hour[0]}:${hour[1]}`;
  full_date.innerText = `${day}/${month[1]}/${year}`;
}

const wrapper = document.querySelectorAll(".wrapper");

wrapper.forEach(element => {
  let state = {
    mouseX: 0,
    mouseY: 0,
    height: element.clientHeight,
    width: element.clientWidth
  };

  element.addEventListener("mousemove", ele => {
    const clock = element.querySelector(".clock");
    const clock_separator = clock.querySelector(".clock-separator");

    state.mouseX = ele.pageX - element.offsetLeft - state.width / 2;
    state.mouseY = ele.pageY - element.offsetTop - state.height / 2;

    // parallax angle in clock
    const angleX = (state.mouseX / state.width) * 30;
    const angleY = (state.mouseY / state.height) * -30;
    
    clock.style.transform = `rotateY(${angleX}deg) rotateX(${angleY}deg) `;

    // parallax position of background in clock
    const posX = (state.mouseX / state.width) * -40;
    const posY = (state.mouseY / state.height) * -40;

    clock_separator.style.transform = `translateX(${posX}px) translateY(${posY}px)`;
  });

  element.addEventListener("mouseout", () => {
    const clock = element.querySelector(".clock");
    const clock_separator = clock.querySelector(".clock-separator");

    clock.style.transform = `rotateY(0deg) rotateX(0deg) `;
    clock_separator.style.transform = `translateX(0px) translateY(0px)`;
  });
});

var control = false;
var colors = ["#00b3ff", "#ff0059"];

var themeColor = document.querySelector('meta[name="theme-color"]');
var msThemeColor = document.querySelector('meta[name="msapplication-navbutton-color"]');
var appleThemeColor = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');

function changeThemeColor() {
  if(control) {
    themeColor.setAttribute("content", colors[1]);
    msThemeColor.setAttribute("content", colors[1]);
    appleThemeColor.setAttribute("content", colors[1]);

    control = false;

    return;
  }

  themeColor.setAttribute("content", colors[0]);
  msThemeColor.setAttribute("content", colors[0]);
  appleThemeColor.setAttribute("content", colors[0]);

  control = true;
}