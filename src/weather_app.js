function updateWeather (response) {
    console.log(response.data);
    let date = new Date(response.data["time"] * 1000);
    const formattedDate = date.toLocaleString('en-US', { weekday: 'long',  hour: 'numeric', minute: 'numeric' });
    updateTime(formattedDate);
    update_temperature(response.data["temperature"]["current"])
    update_humidity(response.data["temperature"]["humidity"])
    update_wind_speed(response.data["wind"]["speed"])
    update_weather_icon(response.data["condition"]["icon_url"])
    update_weather_status(response.data["condition"]["description"]) 
}

function update_weather_status(new_weather_status){
    let weather_status = document.querySelector("#weather_status")
    weather_status.innerHTML = new_weather_status
}

function updateTime(current_time){
    let time_query = document.querySelector("#time")
    time_query.innerHTML = current_time
}

function update_weather_icon(new_icon){
    let weather_app_icon = document.querySelector("#weather_app_icon")
    weather_app_icon.src = new_icon;
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

function displayForecast(){
    let forecast = document.querySelector('#forecast');
    


let days = ['Tue', 'Wed', 'Thu', 'Fri'];
let forecastHtml = "";

days.forEach(function(day) {
    forecastHtml =
    forecastHtml +
`
forecast.innerHTML = <div class="weather_forecast_days">
            <div class="weather_forecast_dates">${day}</div>
            <div class="weather_forecast_icons">☀️</div>
            <div class="weather_forecast_temperatures">
              <div class="weather_forecast_temperatures">
                <strong>19°</strong>
              </div>
              <div class="weather_forecast_temperature">
                <strong>9°</strong>
              </div>
            </div>
          </div>
          
`});
}

forecastElement.innerHTML = forecastHtml;
displayForecast