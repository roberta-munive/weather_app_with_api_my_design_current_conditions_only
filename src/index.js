function capitalizeFirstLetterOfWordsInString(str) {
  str = str.toLowerCase().trim();

  // split words of sentence into separate indices of array
  let word_array = str.split(" ");
  for (var i = 0; i < word_array.length; i++) {
    word_array[i] = word_array[i][0].toUpperCase() + word_array[i].substring(1);
  }

  // return a string with first letter of words capitalized
  return word_array.join(" ");
}

function capitalizeFirstLetterOfFirstWordInString(str) {
  str = str.toLowerCase().trim();
  str = str[0].toUpperCase() + str.substring(1);
  return str;
}

function displayCityName(city) {
  // city = capitalizeFirstLetterOfWordsInString(city);
  let currentCityLocator = document.querySelector("#current-city");
  currentCityLocator.innerHTML = city;
}

function displayCurrentWeatherConditions(response) {
  let city = response.data.city;
  displayCityName(city);

  // if city is undefined, api data will be undefined and don't need to look it up
  if (!city) {
    return;
  }

  let currentTemperature = response.data.temperature.current;
  let currentTemperatureLocator = document.querySelector(
    "#current-temperature"
  );
  currentTemperature = Math.round(currentTemperature);
  currentTemperatureLocator.innerHTML = currentTemperature;

  // currentDateAndTime is returned as a number in the form 1700844736.  Need to reformat
  let currentDateAndTime = response.data.time;
  formatAndDisplayDateAndTime(currentDateAndTime);

  let currentFeelsLikeTemperature = response.data.temperature.feels_like;
  let currentFeelsLikeTemperatureLocator = document.querySelector(
    "#current-feels-like-temperature"
  );
  currentFeelsLikeTemperature = Math.round(currentFeelsLikeTemperature);
  currentFeelsLikeTemperatureLocator.innerHTML = `${currentFeelsLikeTemperature}°`;

  let currentWindSpeed = response.data.wind.speed;
  let currentWindSpeedLocator = document.querySelector("#current-wind-speed");
  currentWindSpeed = Math.round(currentWindSpeed);
  currentWindSpeedLocator.innerHTML = `${currentWindSpeed} mph`;

  let currentConditionsDescription = response.data.condition.description;
  currentConditionsDescription = capitalizeFirstLetterOfFirstWordInString(
    currentConditionsDescription
  );
  let currentConditionsDescriptionLocator = document.querySelector(
    "#current-conditions-description"
  );
  currentConditionsDescriptionLocator.innerHTML = currentConditionsDescription;

  let currentConditionsIcon = response.data.condition.icon_url;
  let currentConditionsIconLocator = document.querySelector(
    "#current-conditions-icon"
  );
  currentConditionsIconLocator.src = currentConditionsIcon;
}

function formatAndDisplayDateAndTime(timeStamp) {
  // reference: https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript

  // Need to multiply timestamp by 1000 so that the argument is in milliseconds, not seconds
  let dateAndTimeStr = new Date(timeStamp * 1000);

  // Convert time to the format 6:53 PM
  let timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };
  let currentTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
    dateAndTimeStr
  );
  let currentTimeLocator = document.querySelector("#current-time");
  currentTimeLocator.innerHTML = currentTime;

  // Convert date to the format October 24
  let dateOptions = { month: "long", day: "numeric" };
  let currentDate = new Intl.DateTimeFormat("en-US", dateOptions).format(
    dateAndTimeStr
  );
  let dateLocator = document.querySelector("#current-date");
  dateLocator.innerHTML = currentDate;

  // Day of week is returned as a number 0 through 6.  Convert to full length word

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayOfWeek = dateAndTimeStr.getDay();
  let dayOfWeekLocator = document.querySelector("#current-day-of-week");
  dayOfWeekLocator.innerHTML = days[dayOfWeek];
}

function getCity(event) {
  event.preventDefault();

  let searchBarInputLocator = document.querySelector("#search-bar-input");
  let city = searchBarInputLocator.value;
  getCurrentWeatherConditions(city);
}

function getCurrentWeatherConditions(city) {
  let unit = "imperial";
  let apiKey = "cf14b4c0f0c0d7a973ee3b4e430t2bo5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayCurrentWeatherConditions);
}

let defaultCity = "Paris";
let searchBarLocator = document.querySelector("#search-bar");

getCurrentWeatherConditions(defaultCity);

searchBarLocator.addEventListener("submit", getCity);
