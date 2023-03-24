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
    var iconContainer = $("<div id='weather-icon'>").html("<img src='" + weatherIconUrl + "' alt='Weather Icon'>");

    //City name and date to be added to card
    var todayDate = $("<h4>").text(response.name + "(" + date +")");
    todayCardBody.append(todayDate);

    //need to add temp, wind and humidity info to card
    todayCardBody.append(iconContainer);
    todayCardBody.append("<p>" + celciusTemp + "<p>");
    todayCardBody.append("<p>" + windSpeed + "<p>");
    todayCardBody.append("<p>" + + humidity + "<p>");

    //caard to page and display forecast
    todayCard.append(todayCardBody);
    today.empty();
    today.append(todayCard);
    displayForecast(response.id);
}

//Need an event listener for the search button
$("#search-button").on("click", function (event){
    event.preventDefault();
    city = $("#search-input").val().trim();
    //if input field is empty
    if (!city){
        return;
    }
    //search history return if the city has already been searched for
    if (searchHistory.includes(city)){
        return;
    }
    
    //need to construct the API query and make AJAX request

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(displayWeather);

    //you want to add the city to the search history 
    //update local storage
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

    //clear inout and render the search history button
    $("#search-input").val("");
    renderButtons();
});




//create a function for rendering search history buttons 
function renderButtons(){
    $('.list-group').empty();
    //loop through the search history 
    for (var i = 0; i < searchHistory.length; i++) {
        var a=$("<button>");
        a.addClass("city btn-secondary");
        a.attr("data-name", searchHistory [i]);
        a.text(searchHistory[i]);
        $(".list-group").append(a);
    }
    
}

//you need an event listener for the search history buttons
$(document).on


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