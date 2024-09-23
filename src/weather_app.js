function handleSearchSubmit(event){
    event.preventDefault();

    let searchInput = document.querySelector("#search_form_input");

    let weather_app_cityElement = document.querySelector("#weather_app_city")
    weather_app_cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search_form");
searchFormElement.addEventListener("submit", handleSearchSubmit);