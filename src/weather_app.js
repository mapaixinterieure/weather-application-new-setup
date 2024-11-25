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
    let apiCurrentUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiCurrentUrl).then(updateWeather);
}

function getForecast(city) {
    //make api call and update user interface
    let apiKey = "o9f9c2ca05ab4de97918ta723306c1fd";
    let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiForecastUrl).then(updateWeatherForecast);
}

function updateWeatherForecast (response) {
    console.log(response.data);
    let days_future = [1, 2, 3, 4, 5]
    new_html = "";
    days_future.forEach((day_in_future_int) => {
        new_html = new_html + update_one_day_forecast(response.data["daily"][day_in_future_int], day_in_future_int)
    });
    let forecastElement = document.querySelector('#forecast');
    forecastElement.innerHTML = new_html;
    
}

function update_one_day_forecast(data, day_nr){
    console.log(data);
    let date = new Date(data["time"] * 1000);
    let weekday_short = date.toLocaleString('en-US', { weekday: 'short' });
    let icon_url = data["condition"]["icon_url"]
    let max_temp = data["temperature"]["maximum"]
    let min_temp = data["temperature"]["minimum"]
    console.log(weekday_short);
    return_value = `
<div class="weather_forecast_days">
            <div class="weather_forecast_dates">${weekday_short}</div>
            <div class="weather_forecast_icons"><img
              class="weather_app_icon"
              id="weather_app_icon"
              src="${icon_url}"/>
            
            
            </div>
            <div class="weather_forecast_temperatures">
              <div class="weather_forecast_temperatures">
                <strong>${max_temp}°</strong>
              </div>
              <div class="weather_forecast_temperature">
                <strong>${min_temp}°</strong>
              </div>
            </div>
          </div>
          
`
    return  return_value;

}

function handleSearchSubmit(event){
    event.preventDefault();

    // get search input
    let searchInput = document.querySelector("#search_form_input");

    // update city name
    let weather_app_cityElement = document.querySelector("#weather_app_city")
    weather_app_cityElement.innerHTML = searchInput.value;


    searchCity(searchInput.value);
    getForecast(searchInput.value);
}

let searchFormElement = document.querySelector("#search_form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function displayForecast(){
    let forecastElement = document.querySelector('#forecast');
    


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


forecastElement.innerHTML = forecastHtml;
}
// displayForecast

function load_default_city(){
    let default_city = "Berlin"
    let weather_app_cityElement = document.querySelector("#weather_app_city")
    weather_app_cityElement.innerHTML = default_city;
    searchCity(default_city);
    getForecast(default_city);
}
load_default_city();