/* global $ */

console.log('Document Load');

$(document).ready(function () {

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

            $('#weatherLocation').text(prep(res.name) +
            ',' + prep(res.sys.country) +
                ' Weather');

            $('#weatherIcon').attr('src', 'http://openweathermap.org/img/w/' +
                prep(res.weather[0].icon) + '.png');

            $('#weatherCurrent').text((
                prep(res.weather[0].main) +
                ' ' +
                prep(res.main.temp) +
                ' F'));

            $('#weatherDesc').text(prep(res.weather[0].description));

            $('#weatherDataRaw').text(JSON.stringify(res));

        });

        function prep(data) {

            return JSON.stringify(data).replace(/["]/g, '');

        }

    }

});

