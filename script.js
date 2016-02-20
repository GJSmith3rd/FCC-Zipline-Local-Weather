/* global $ */

console.log('Document Load');

$(document).ready(function () {

    var res;
    console.log('Document Ready');

    if (navigator.geolocation) {
        console.log('Get Data Geo');
        navigator.geolocation.getCurrentPosition(function (position) {

            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            var url = 'http://api.openweathermap.org/data/2.5/weather?';
            url += 'lat=' + lat;
            url += '&lon=' + lon;
            url += '&units=imperial&APPID=988a7511aee3e85975c21e95a0db698e&';

            getWeatherData(url);
            populateHtml(res);

        });
    } else {

        console.log('Get Data Manual');

        var url = 'http://api.openweathermap.org/data/2.5/weather?';
        url += 'units=imperial&APPID=988a7511aee3e85975c21e95a0db698e&q=Baltimore&';
        getWeatherData(url);
        $('#weatherIcon').attr('src', 'http://openweathermap.org/img/w/10d.png');

    }

    /*** GET WEATHER FUNCTION ***/
    function getWeatherData(url) {
        console.log('Get Data Function');

        $.get(url, function (response) {

            res = response;
            console.log(response);

        });

    }

    /*** GET POPULATE HTML ***/
    function populateHtml(response) {
        console.log('Populate Data function');

        //console.log(response);

        $('#weatherDataRaw').text(JSON.stringify(response));

    }

});

