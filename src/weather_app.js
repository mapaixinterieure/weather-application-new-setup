function updateWeather (response) {
    console.log(response.data);
    update_temperature(response.data["temperature"]["current"])
    update_humidity(response.data["temperature"]["humidity"])
    update_wind_speed(response.data["wind"]["speed"])

}

function update_wind_speed(new_wind_speed){
    let wind_speed = document.querySelector("#wind_speed")
    wind_speed.innerHTML = new_wind_speed;
}

function update_humidity(new_humidity){
    let humidity = document.querySelector("#humidity")
    humidity.innerHTML = new_humidity;
}

function update_temperature(temp_c){
    let weather_app_temperature = document.querySelector("#weather_app_temperature")
    weather_app_temperature.innerHTML = temp_c;
}

function searchCity (city) {
    //make api call and update user interface
    let apiKey = "o9f9c2ca05ab4de97918ta723306c1fd";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(updateWeather);
}



function handleSearchSubmit(event){
    event.preventDefault();

    // get search input
    let searchInput = document.querySelector("#search_form_input");

    // update city name
    let weather_app_cityElement = document.querySelector("#weather_app_city")
    weather_app_cityElement.innerHTML = searchInput.value;


    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search_form");
searchFormElement.addEventListener("submit", handleSearchSubmit);