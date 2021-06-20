//variable for city...
let city;

//latitude...
let cityLatitude;

//longitude...
let cityLongitude;

//current date...
let today = new Date();
let cityDate = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getYear();

//five day forecast dates...

//first day...
let dayOne = today.getMonth() + 1 + '/' + (today.getDate() + 1) + '/' + today.getYear();

//second day...
let dayTwo = today.getMonth() + 1 + '/' + (today.getDate() + 2) + '/' + today.getYear();

//third day...
let dayThree = today.getMonth() + 1 + '/' + (today.getDate() + 3) + '/' + today.getYear();

//fourth day...
let dayFourth = today.getMonth() + 1 + '/' + (today.getDate() + 4) + '/' + today.getYear();

//fifth day...
let dayFifth = today.getMonth() + 1 + '/' + (today.getDate() + 5) + '/' + today.getYear();

//current weather icon...
let cityWeather;

//day one weather...
let dayOneWeather;

//day two...
let dayTwoWeather;

//day three...
let dayThreeWeather;

//day four...
let dayFourWeather;

//day five...
let dayFiveWeather;

//city temperature...
let cityTemperature;

//history button...
let historyBtn;

//new history button...
let newHistoryBtn;

//submit city button...
let searchFormEl = document.querySelector('#searchForm');

//city input line...
let searchInputEl = document.querySelector('#searchInput');

//search city for city list item buttons...
let searchULEl = document.querySelector('#searchUL');

//current city/current day in HTML...
let mainCityConditionsEL = document.querySelector('#mainCityConditions');
//current city card...
let mainCardEl = document.querySelector('.mainCard')

//five day heading...
let fiveDayForecastHeadingEl = document.querySelector('.fiveDayForecastHeading')

//first day card <ul>...
let dayOneULEl = document.querySelector('#dayOne');
//first day card...
let dayOneCardULEl = document.querySelector('.dayOne');

//second day card <ul>...
let dayTwoULEl = document.querySelector('#dayTwo');
//second day card
let dayTwoCardULEl = document.querySelector('.dayTwo');

//third day card <ul>...
let dayThreeULEl = document.querySelector('#dayThree');
//third day card...
let dayThreeCardULEl = document.querySelector('.dayThree');

//fourth day card <ul>...
let dayFourthULEl = document.querySelector('#dayFourth');
//fourth day card...
let dayFourthCardULEl = document.querySelector('.dayFourth');

//fifth day card <ul>...
let dayFifthULEl = document.querySelector('#dayFifth');
//fifth day card...
let dayFifthCardULEl = document.querySelector('.dayFifth');
  
//function to make text input the city and call fetch...
//and create city button that pushed info to localStorage...
citySubmitHandler = (event) => {
  event.preventDefault();
  //clear previous values if any...
  $('.list-group').contents().remove();
  //get value from input element...
  city = searchInputEl.value.trim();
  if (localStorage.getItem('"' + city + '"')) {
    searchInputEl.value = '';
    return;
  }
  console.log(city)
  getCityWeather(city);
  searchInputEl.value = '';
};

cityhistoryBtnClickHandler = (event) => {
  event.preventDefault();
  //take out older city values...
  $('.list-group').contents().remove();
  historyBtn = $(event.target).text().replace(/ /g, '_').replace(/\./g, '-');

  $('#' + historyBtn).remove();
  historyBtn.replace(/\_/g, ' ').replace(/\-/g, '.')
  window.localStorage.removeItem('"' + historyBtn + '"');
  getCityWeather(historyBtn.replace(/\_/g, ' ').replace(/\-/g, '.'));
}

localInfo = () => {
  key = Object.keys(localStorage),
    i = 0, key;
  //iterate through each key in localStorage...
  for (; key[i]; i++) {
    cityInfo = key[i];
    //save the key value into variable...
    let dataInfo = JSON.parse(localStorage.getItem(key[i]));
    //replacement json...
    cityConditionsBtn(cityInfo.replace(/\"/g, '').replace(/\_/g, ' ').replace(/\-/g, '.'), dataInfo);
  }
}


//create btn for city historyBtn search...
cityConditionsBtn = (city, data) => {

  let cityID = city.replace(/ /g, '_').replace(/\./g, '-');
  //create list item for <ul> in HTML...
  let cityListItemEl = document.createElement('li');
  //button list item...
  let cityListBtnEl = document.createElement('button');
  //create classes and set data-name for city key in localStorage...
  cityListItemEl.classList = 'searchLI col-12';
  $(cityListItemEl).attr({ 'data-name': cityID, 'id': cityID });
  //class and text for button...
  cityListBtnEl.classList = 'cityBtn';
  cityListBtnEl.textContent = city;
  $(cityListBtnEl).attr({ 'data-btn': city });
  //list item append button...
  cityListItemEl.appendChild(cityListBtnEl);
  //<ul> in HTML append list item...
  searchULEl.appendChild(cityListItemEl);
  //set the key value pair for local storage in string form...
  localStorage.setItem(JSON.stringify(city), JSON.stringify(data));
}


//current city selected function to give weather data...
getCityWeather = (city) => {
  //store weather api in apiURL variable...
  let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=3d15e45d12f197c35af3d283e17262ae"
  //request url...
  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          //creates button 
          cityConditionsBtn(city, data);
          //city longitude
          cityLongitude = data.coord.lon;
          //city latitude
          cityLatitude = data.coord.lat;
          getAllForecast(cityLatitude, cityLongitude, city);
        })
      } else {
        //alerts for errors...
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      //alerts for connection error...
      alert("Unable to connect to weather data");
    });
}
// get all weather data...
getAllForecast = (cityLatitude, cityLongitude, city) => {
  //API call for UV index and five day forecast...
  let oneAPIURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLatitude + '&lon=' + cityLongitude + '&units=imperial&exclude=minutely,hourly&appid=3d15e45d12f197c35af3d283e17262ae';

  fetch(oneAPIURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          //all info for current weather...
          cityWeather = data.current.weather[0].icon;

          cityTemperature = data.current.temp;
          cityHumidity = data.current.humidity;
          cityWind = data.current.wind_speed;
          cityUV = data.current.uvi;

          //day one...
          dayOneWeather = data.daily[0].weather[0].icon;
          let dayOneTemp = data.daily[0].temp.max;
          let dayOneHumidity = data.daily[0].humidity;

          //day two...
          dayTwoWeather = data.daily[1].weather[0].icon;
          let dayTwoTemp = data.daily[1].temp.max;
          let dayTwoHumidity = data.daily[1].humidity;

          //day three...
          dayThreeWeather = data.daily[2].weather[0].icon;
          let dayThreeTemp = data.daily[2].temp.max;
          let dayThreeHumidity = data.daily[2].humidity;

          //day four...
          dayFourWeather = data.daily[3].weather[0].icon;
          let dayFourTemp = data.daily[3].temp.max;
          let dayFourHumidity = data.daily[3].humidity;

          //day five...
          dayFiveWeather = data.daily[4].weather[0].icon;
          let dayFiveTemp = data.daily[4].temp.max;
          let dayFiveHumidity = data.daily[4].humidity;

          fontAwesomeIcon = (cityWeather) => {
            //font awesome icons in place of api's
            if (cityWeather === '50d' || cityWeather === '50n') {
              cityWeather = document.createElement('i');
              cityWeather.setAttribute('class', 'fa-duotone fa-cloud-fog');
            } else
              if (cityWeather === '02d' || cityWeather === '02n' || cityWeather === '03d' ||
                cityWeather === '03n' || cityWeather === '04d' || cityWeather === '04n') {
                cityWeather = document.createElement('i');
                cityWeather.setAttribute('class', 'fa-duotone fa-clouds');
              } else
                if (cityWeather === '01d' || cityWeather === '01n') {
                  cityWeather = document.createElement('i');
                  cityWeather.setAttribute('class', 'fa-duotone fa-sun');
                } else
                  if (cityWeather === '13d' || cityWeather === '13n') {
                    cityWeather = document.createElement('i');
                    cityWeather.setAttribute('class', 'fa-duotone fa-snowflake');
                  } else
                    if (cityWeather === '10d' || cityWeather === '10n') {
                      cityWeather = document.createElement('i');
                      cityWeather.setAttribute('class', 'fa-duotone fa-cloud-drizzle');
                    } else
                      if (cityWeather === '09d' || cityWeather === '09n') {
                        cityWeather = document.createElement('i');
                        cityWeather.setAttribute('class', 'fa-duotone fa-cloud-showers-heavy');
                      } else
                        if (cityWeather === '11d' || cityWeather === '11n') {
                          cityWeather = document.createElement('i');
                          cityWeather.setAttribute('class', 'fa-duotone fa-cloud-bolt');
                        }
            return cityWeather;
          }
          createCurrentDayCard(city, fontAwesomeIcon(cityWeather), cityTemperature, cityHumidity, cityWind, cityUV);
          //end of day info...

      

          //day one card info function...
          firstDay(dayOne, fontAwesomeIcon(dayOneWeather), dayOneTemp, dayOneHumidity);

          //day two card...
          secondDay(dayTwo, fontAwesomeIcon(dayTwoWeather), dayTwoTemp, dayTwoHumidity);

          //day three card...
          thirdDay(dayThree, fontAwesomeIcon(dayThreeWeather), dayThreeTemp, dayThreeHumidity);

          //day four card...
          fourthDay(dayFourth, fontAwesomeIcon(dayFourWeather), dayFourTemp, dayFourHumidity);

          //day five card...
          fifthDay(dayFifth, fontAwesomeIcon(dayFiveWeather), dayFiveTemp, dayFiveHumidity);
        })
      } else {
        //alerts if there is an error message on APIs...
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      //alert for connection issue...
      alert("Unable to connect to weather data");
    });
}


createCurrentDayCard = (city, cityWeather, cityTemperature, cityHumidity, cityWind, cityUV) => {
  let cityNameEl = document.createElement('li');
  cityNameEl.classList = 'mainCardLi';
  cityNameEl.setAttribute('id', 'cityNameMain');
  cityNameEl.textContent = city + ' ( ' + cityDate + ' ) ';
  cityNameEl.append(cityWeather);

  let temperatureMainEl = document.createElement('li');
  temperatureMainEl.classList = 'mainCardLi';
  temperatureMainEl.textContent = 'Temperature: ' + Math.floor(cityTemperature) + String.fromCharCode(176) + 'F';

  let humidityEl = document.createElement('li');
  humidityEl.classList = 'mainCardLi';
  humidityEl.textContent = 'Humidity: ' + cityHumidity + '%';

  let windEl = document.createElement('li');
  windEl.classList = 'mainCardLi';
  windEl.textContent = 'Wind Speed: ' + cityWind + 'MPH';
  let cityUVEl = document.createElement('li');
  let cityUVElSpan = document.createElement('span');
  if (cityUV < 3) {
    cityUVEl.textContent = 'UV Index: ';
    cityUVElSpan.setAttribute('class', 'low');
    cityUVElSpan.textContent = cityUV;
    cityUVFontA = document.createElement('i')
    cityUVFontA.setAttribute('class', 'fa-duotone fa-face-smile');
    cityUVElSpan.appendChild(cityUVFontA);
    cityUVEl.appendChild(cityUVElSpan);
  } else
    if (cityUV >= 3 && cityUV < 8) {
      cityUVEl.textContent = 'UV Index: ' + cityUV;
      cityUVElSpan.setAttribute('class', 'moderate');
      cityUVElSpan.textContent = cityUV;
      cityUVFontA = document.createElement('i')
      cityUVFontA.setAttribute('class', 'fa-duotone fa-fire');
      cityUVElSpan.appendChild(cityUVFontA);
      cityUVEl.appendChild(cityUVElSpan);
    } else
      if (cityUV >= 8) {
        cityUVEl.textContent = 'UV Index: ' + cityUV;
        cityUVElSpan.setAttribute('class', 'severe');
        cityUVElSpan.textContent = cityUV;
        cityUVFontA = document.createElement('i')
        cityUVFontA.setAttribute('class', 'fa-duotone fa-skull-crossbones');
        cityUVElSpan.appendChild(cityUVFontA);
        cityUVEl.appendChild(cityUVElSpan);
      }
  //append to <ul> in the main card...
  mainCityConditionsEL.append(cityNameEl, temperatureMainEl, humidityEl, windEl, cityUVEl);
};

//first day...
firstDay = (dayOne, dayOneWeather, dayOneTemp, dayOneHumidity) => {
  let dateEl = document.createElement('li');
  dateEl.classList = 'cardLi dates';
  dateEl.textContent = dayOne;

  let weatherEl = document.createElement('li');
  weatherEl.classList = 'cardLi';
  weatherEl.appendChild(dayOneWeather);

  let temperatureMainEl = document.createElement('li');
  temperatureMainEl.classList = 'cardLi';
  temperatureMainEl.textContent = 'Temp: ' + Math.floor(dayOneTemp) + String.fromCharCode(176) + 'F';

  let humidityEl = document.createElement('li');
  humidityEl.classList = 'mainCardLi';
  humidityEl.textContent = 'Humidity: ' + dayOneHumidity + '%';

  dayOneULEl.append(dateEl, dayOneWeather, temperatureMainEl, humidityEl);
}

//second day...
secondDay = (dayTwo, dayTwoWeather, dayTwoTemp, dayTwoHumidity) => {
  let dateEl = document.createElement('li');
  dateEl.classList = 'cardLi dates';
  dateEl.textContent = dayTwo;

  let weatherEl = document.createElement('li');
  weatherEl.classList = 'cardLi';
  weatherEl.appendChild(dayTwoWeather);

  let temperatureMainEl = document.createElement('li');
  temperatureMainEl.classList = 'cardLi';
  temperatureMainEl.textContent = 'Temp: ' + Math.floor(dayTwoTemp) + String.fromCharCode(176) + 'F';

  let humidityEl = document.createElement('li');
  humidityEl.classList = 'mainCardLi';
  humidityEl.textContent = 'Humidity: ' + dayTwoHumidity + '%';

  dayTwoULEl.append(dateEl, dayTwoWeather, temperatureMainEl, humidityEl);
}

//third day...
thirdDay = (dayThree, dayThreeWeather, dayThreeTemp, dayThreeHumidity) => {
  let dateEl = document.createElement('li');
  dateEl.classList = 'cardLi dates';
  dateEl.textContent = dayThree;

  let weatherEl = document.createElement('li');
  weatherEl.classList = 'cardLi';
  weatherEl.appendChild(dayThreeWeather);

  let temperatureMainEl = document.createElement('li');
  temperatureMainEl.classList = 'cardLi';
  temperatureMainEl.textContent = 'Temp: ' + Math.floor(dayThreeTemp) + String.fromCharCode(176) + 'F';

  let humidityEl = document.createElement('li');
  humidityEl.classList = 'mainCardLi';
  humidityEl.textContent = 'Humidity: ' + dayThreeHumidity + '%';

  dayThreeULEl.append(dateEl, dayThreeWeather, temperatureMainEl, humidityEl);
}

//fourth day...
fourthDay = (dayFourth, dayFourWeather, dayFourTemp, dayFourHumidity) => {
  let dateEl = document.createElement('li');
  dateEl.classList = 'cardLi dates';
  dateEl.textContent = dayFourth;

  let weatherEl = document.createElement('li');
  weatherEl.classList = 'cardLi';
  weatherEl.appendChild(dayFourWeather);

  let temperatureMainEl = document.createElement('li');
  temperatureMainEl.classList = 'cardLi';
  temperatureMainEl.textContent = 'Temp: ' + Math.floor(dayFourTemp) + String.fromCharCode(176) + 'F';

  let humidityEl = document.createElement('li');
  humidityEl.classList = 'mainCardLi';
  humidityEl.textContent = 'Humidity: ' + dayFourHumidity + '%';

  dayFourthULEl.append(dateEl, dayFourWeather, temperatureMainEl, humidityEl);
}

//fifth day...
fifthDay = (dayFifth, dayFiveWeather, dayFiveTemp, dayFiveHumidity) => {
  let dateEl = document.createElement('li');
  dateEl.classList = 'cardLi dates';
  dateEl.textContent = dayFifth;

  let weatherEl = document.createElement('li');
  weatherEl.classList = 'cardLi';
  weatherEl.appendChild(dayFiveWeather);

  let temperatureMainEl = document.createElement('li');
  temperatureMainEl.classList = 'cardLi';
  temperatureMainEl.textContent = 'Temp: ' + Math.floor(dayFiveTemp) + String.fromCharCode(176) + 'F';

  let humidityEl = document.createElement('li');
  humidityEl.classList = 'mainCardLi';
  humidityEl.textContent = 'Humidity: ' + dayFiveHumidity + '%';

  dayFifthULEl.append(dateEl, dayFiveWeather, temperatureMainEl, humidityEl);
}

searchFormEl.addEventListener('submit', citySubmitHandler);

searchULEl.addEventListener('click', cityhistoryBtnClickHandler)

localInfo();
