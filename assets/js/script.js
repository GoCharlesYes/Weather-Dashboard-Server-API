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