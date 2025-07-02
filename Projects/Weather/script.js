
const api_key = "&appid=d1158a0f17078a34d923ac11a537f21c"
const api_url = "https://api.openweathermap.org/data/2.5/weather?q="

let input = document.querySelector("#cityinput")
let send = document.querySelector(".send")
let city = document.querySelector(".city")
let temp = document.querySelector(".temp")
let img = document.querySelector(".img")
let humidity = document.querySelector(".humidity")
let wind = document.querySelector(".wind")


async function getweather(cityin){
    const responce = await fetch(api_url + cityin + api_key)
    let data = await responce.json()
    city.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp - 273.15) + "°C"
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed+" km/h";
    let src = data.weather[0].main;
    img.src = "./assets/"+src.toLowerCase() + ".png";
}


send.addEventListener('click',()=>{
    if(input.value != ''){
        getweather(input.value)
    }
})