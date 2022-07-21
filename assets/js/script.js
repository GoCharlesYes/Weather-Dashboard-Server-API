var keyAPI = "711769281822ad48ac0fc3fd36eaf4cf";
var cityCall = "Chicago";

// Using moment.js to call date and time
var dateNow = moment().format('dddd, MMMM Do YYYY');
var timeNow = moment().format('YYYY-MM-DD HH:MM:SS');

// Placeholder to store data of previously typed locations
var typeHistory = [];

$('.search').on("click", function (event) {
	event.preventDefault();
	city = $(this).parent('.btnPar').siblings('.textVal').val().trim();
	if (city === "") {
		return;
	};
	typeHistory.push(city);

	localStorage.setItem('city', JSON.stringify(typeHistory));
	nowForecastEl.empty();
	retrieveHist();
	retrieveWeather();
});

// Creating button when history is stored
var btnHist = $('.savedCities');
function retrieveHist() {
	btnHist.empty();

	for (let i = 0; i < typeHistory.length; i++) {

		var rowShow = $('<row>');
		var btnShow = $('<button>').text(`${typeHistory[i]}`)

		rowShow.addClass('row btnHistoryRow');
		btnShow.addClass('btn btn-outline-secondary btnHistory');
		btnShow.attr('type', 'button');

		btnHist.prepend(rowShow);
		rowShow.append(btnShow);
	} if (!city) {
		return;
	}
	//Button can search
	$('.btnHistory').on("click", function (event) {
		event.preventDefault();
		city = $(this).text();
		nowForecastEl.empty();
		retrieveWeather();
	});
};

//Selects today card
var todayRetrieve = $('.cardCurrent');

//Retrieves weather data
function retrieveWeather() {
	var retrieveURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityCall}&units=imperial&appid=${keyAPI}`;

	$(todayRetrieve).empty();

	$.ajax({
		url: retrieveURL,
		method: 'GET',
	}).then(function (response) {
		$('.citynameCurrent').text(response.name);
		$('.dateCurrent').text(date);
		//Weather Icon
		$('.icons').attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
		// Temperature
		var paraEl = $('<p>').text(`Temperature: ${response.main.temp} °F`);
		todayRetrieve.append(paraEl);
		
        //Feel Temperature
		var paraTemp = $('<p>').text(`Feels Like: ${response.main.feels_like} °F`);
		todayRetrieve.append(paraTemp);

		//Humidity
		var paraHumidity = $('<p>').text(`Humidity: ${response.main.humidity} %`);
		todayRetrieve.append(paraHumidity);

		//Wind Speed
		var paraWindSpeed = $('<p>').text(`Wind Speed: ${response.wind.speed} MPH`);
		todayRetrieve.append(paraWindSpeed);

		//Set the lat and long from the searched city
		var locationLong = response.coord.lon;

		// console.log(cityLon);
		var locationLat = response.coord.lat;

		// console.log(cityLat);
		var retrieveURLsecond = `https://api.openweathermap.org/data/2.5/onecall?lat=${locationLat}&lon=${locationLong}&exclude=hourly,daily,minutely&appid=${keyAPI}`;

		$.ajax({
			url: retrieveURLsecond,
			method: 'GET',
		}).then(function (response) {
			var paraURLsecond = $('<p>').text(`UV Index: `);
			var secondSpan = $('<span>').text(response.current.uvi);
			var secondClick = response.current.uvi;
			paraURLsecond.append(secondSpan);
			todayRetrieve.append(paraURLsecond);

			if (uvi >= 0 && uvi <= 2) {
				secondSpan.attr('class', 'green');
			} else if (uvi > 2 && uvi <= 5) {
				secondSpan.attr("class", "yellow")
			} else if (uvi > 5 && uvi <= 7) {
				secondSpan.attr("class", "orange")
			} else if (uvi > 7 && uvi <= 10) {
				secondSpan.attr("class", "red")
			} else {
				secondSpan.attr("class", "purple")
			}
		});
	});
	getFiveDayForecast();
};