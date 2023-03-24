// Defining API key
var apiKey = "869e6aacb6aadce7bf16759213aa30f9";

var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) ||[];

//declaring global variables
var city;
var today = $('#today');
var forecast=$("#forecast");
//     * The date
var date = moment().format("MM/DD/YYYY"); 

//Displaying today's weather
function displayWeather(response) {
    //want temp in celcius
    var celciusTemp = "Temp:" + (response.main.temp - 273.15).toFixed(2) + "°C";

    //do the same for speed and humidity
    var windSpeed = "Wind: " + response.wind.speed + "KPH";
    var humidity = "Humidity: " + response.main.humidity + '%';

    //put today's weather in a card
    var todayCard = $("<div>").addClass("card bg-dark border-light");
    var todayCardBody = $("<div>").addClass("card-body text-light p-2");

    //weather icon on the card
    var weatherIconUrl = 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png';

}



// * Create a weather dashboard with form inputs.
//   * When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
//   * When a user views the current weather conditions for that city they are presented with:
//     * The city name
//     * The date
//     * An icon representation of weather conditions
//     * The temperature
//     * The humidity
//     * The wind speed
//   * When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
//     * An icon representation of weather conditions
//     * The temperature
//     * The humidity
//   * When a user click on a city in the search history they are again presented with current and future conditions for that city