/* global $ */

console.log('Document Load');

$(document).ready(function () {

    var response;

    console.log('***Get Data Before Geo');

    var url = 'http://api.openweathermap.org/data/2.5/weather?';
    url += 'units=imperial&APPID=988a7511aee3e85975c21e95a0db698e&q=Baltimore&';

    getWeatherData(url);

    console.log('***Document Ready');

    if (navigator.geolocation) {

        console.log('***Get Data Geo');
        navigator.geolocation.getCurrentPosition(function (position) {

            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            var url = 'http://api.openweathermap.org/data/2.5/weather?';
            url += 'lat=' + lat;
            url += '&lon=' + lon;
            url += '&units=imperial&APPID=988a7511aee3e85975c21e95a0db698e&';

            getWeatherData(url);

        }, function (error) {

            console.log('***Get Data Manual');

            var url = 'http://api.openweathermap.org/data/2.5/weather?';
            url += 'units=imperial&APPID=988a7511aee3e85975c21e95a0db698e&q=Baltimore&';

            getWeatherData(url);

        });

    } else {

        console.log('***Get Data Manual');

        url = 'http://api.openweathermap.org/data/2.5/weather?';
        url += 'units=imperial&APPID=988a7511aee3e85975c21e95a0db698e&q=Baltimore&';

        getWeatherData(url);

    }

    /*** GET WEATHER FUNCTION ***/
    function getWeatherData(url) {
        console.log('***Get Data Function');

        $.get(url, function (res) {

            response = res;

            $('#weatherLocation').text(prep(res.name) +
                ',' + prep(res.sys.country) +
                ' Weather');

            $('#weatherCurrent').text((
                prep(res.weather[0].main) +
                ' ' +
                roundFahrenheit()));

            $('#weatherIcon').attr('src', 'http://openweathermap.org/img/w/' +
                prep(res.weather[0].icon) + '.png');

            $('#weatherDesc').text(prep(res.weather[0].description));

            $('#weatherDataRaw1').text(JSON.stringify(res));
            $('#weatherDataRaw2').text(JSON.stringify(response));

        });

    }

    /*** RADIO BUTTON TOGGLE F/C ***/
    $('#radioButtons').on('change', function () {

        if ($('input[name=tempButton]:checked', '#myForm').val() === 'Fahrenheit') {

            $('#weatherCurrent').text(
                prep(response.weather[0].main) +
                ' ' +
                roundFahrenheit());

        } else if ($('input[name=tempButton]:checked', '#myForm').val() === 'Celcius') {

            $('#weatherCurrent').text((response.weather[0].main) +
                ' ' +
                convertCelcius());

        }

    });

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

});

