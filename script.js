/* global $ */

$(document).ready(function () {

    /*** Get Data Before Geo') ***/
    var response;
    var btoaId = validAtob();

    getDefaultLocation();

    console.log('***Document Ready');

    if (navigator.geolocation) {

        console.log('***Get Data Geo');
        navigator.geolocation.getCurrentPosition(function (position) {

            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            var url = 'http://api.openweathermap.org/data/2.5/weather?';
            url += 'lat=' + lat;
            url += '&lon=' + lon;
            url += '&units=imperial&';
            url += 'APPID=' + btoaId;

            getWeatherData(url);

        }, function (error) {

            /*** MAYBE - CATCH ERROR ***/

            getDefaultLocation();

        });

    }

    /*** RADIO BUTTON TEMP TOGGLE  ***/
    $('#radioButtons').on('change', function () {

        if ($('input[name=tempButton]:checked', '#myForm').val() === 'Fahrenheit') {

            $('#weatherCurrent').text(
                prep(response.weather[0].main) +
                ' ' +
                roundFahrenheit() + ' F');

        } else if ($('input[name=tempButton]:checked', '#myForm').val() === 'Celcius') {

            $('#weatherCurrent').text((response.weather[0].main) +
                ' ' +
                convertCelcius() + ' C');

        }

    });

    /*** GET DEFAULT LOCATION FUNCTION ***/
    function getDefaultLocation() {

        var url = 'http://api.openweathermap.org/data/2.5/weather?';
        url += 'units=imperial&';
        url += 'q=Paris&';
        url += 'APPID=' + btoaId;

        getWeatherData(url);

    }

    /*** GET WEATHER FUNCTION ***/
    function getWeatherData(url) {
        console.log('***Get Data Function');

        $.get(url, function (res) {

            response = res;
            console.log(response);

            $('#weatherLocation').text(prep(res.name) +
                ',' + prep(res.sys.country) +
                ' Weather');

            $('#weatherCurrent').text(
                prep(res.weather[0].main) +
                ' ' +
                roundFahrenheit() + ' F');

            $('#weatherIcon').attr('src', 'http://openweathermap.org/img/w/' +
                prep(res.weather[0].icon) + '.png');

            $('#weatherDesc').text(prep(res.weather[0].description) +
                ' - wind ' +
                prep(res.wind.speed) + ' mph ' +
                ' - humidity ' +
                prep(res.main.humidity) + '%');

        });

    }

    /*** ROUND FAHRENHEIT ***/
    function roundFahrenheit() {

        var tempF = Math.round(response.main.temp * 10) / 10;

        return tempF;

    }

    /*** CONVERT FAHRENHEIT TO CELCIUS AND ROUND ***/
    function convertCelcius() {

        var tempC = (parseFloat(response.main.temp) - 32) * (5 / 9);
        tempC = Math.round(tempC * 10) / 10;

        return tempC;
    }

    /*** REMOVE CHARS FROM DATA ***/
    function prep(data) {

        return JSON.stringify(data).replace(/["]/g, '');

    }

    /*** HIPV ***/
    function validAtob() {

        var hash = 'OTg4';

        hash += 'YTc1';

        hash += 'MTFh';
        hash += 'ZWUz';

        hash += 'ZTg1';
        hash += 'OTc1';

        hash += 'YzIx';
        hash += 'ZTk1';

        hash += 'YTBk';
        hash += 'YjY5';

        hash += 'OGU=';

        return atob(hash);

    }

});

