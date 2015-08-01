var tempCel, tempFar;
var windInfoImp, windInfoMet;
var boolTempUnit = true;

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

$(document).ready(function() {

  function getLocation() {
    $.get("http://freegeoip.net/json/", function(location) {
      $('#location').text(location.city + ", " + location.region_name);
      getWeather(location.latitude, location.longitude);
    });

  }

  function getWeather(latitude, longitude) {
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial";

    $.getJSON(weatherURL, function(weatherJSON) {
      var weatherDesc = weatherJSON.weather[0].description;
      weatherDesc = toTitleCase(weatherDesc);
      windInfoImp = weatherJSON.wind.speed + " MPH at " + weatherJSON.wind.deg + "°";
      var windConv = weatherJSON.wind.speed * 0.44704;
      windInfoMet = windConv.toFixed(2) + " m/s at " + weatherJSON.wind.deg + "°";
      var iconURL = "http://openweathermap.org/img/w/" + weatherJSON.weather[0].icon + ".png";
      tempFar = weatherJSON.main.temp + "° F";
      var farToCel = (weatherJSON.main.temp - 32) * 5 / 9;
      tempCel = farToCel.toFixed(2) + "° C";
      
      
	   	$('body').addClass(weatherJSON.weather[0].main.toLowerCase());
      $('#icon').attr("src", iconURL);
      $('#weather-desc').text(weatherDesc);
      $('#wind-info').text(windInfoImp);
      $('#temperature').text(tempFar);
    })
  }
  getLocation();
})

// Callback function for the button click
// Gets a new quote and updates the text
$('#toggle-button').click(function() {
  if (boolTempUnit) {
    boolTempUnit = false;
    $('#temperature').text(tempCel);
    $('#wind-info').text(windInfoMet);
  } else {
    boolTempUnit = true;
    $('#temperature').text(tempFar);
    $('#wind-info').text(windInfoImp);
  }
});