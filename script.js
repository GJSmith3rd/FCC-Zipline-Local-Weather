/* global $ */
$(document).ready(function () {

    console.log('Document Ready Function');
    //
    //     getData();
    //
    //     $('#newQuote').click(function () {
    //         getData();
    //     });

});

// function getData(callback) {
//
//     console.log('Get Data Function');
//
//     $.ajax({
//
//         //type: 'get',
//         //crossDomain: true,
//         url: 'http://api.openweathermap.org/data/2.5/weather',
//         jsonp: 'callback',
//         dataType: 'jsonp',
//         cache: false,
//         data: {
//             mode: 'json',
//             APPID: '988a7511aee3e85975c21e95a0db698e',
//             units: 'imperial',
//             zip: '60827,us',
//             callback: updateHTML,
//             jsonpCallback: 'jsonp'
//
//         }
//     });
// }
var url = 'http://api.openweathermap.org/data/2.5/weather?';
url += 'q=Baltimore&units=imperial&APPID=988a7511aee3e85975c21e95a0db698e';

console.log('Get Data Call');

$.get(url,
    function (response) {

        console.log(response);

        /* The JSON.stringify() method just takes the object and turns it back into text (aka, a string).
        I'm only doing this here to show what the string looks like.*/

        // show the raw json
        $('#raw_json pre').text(JSON.stringify(response));

        /* Working with the 'response' object (not string) here, now we can access the different properties available.
        (Look at jsoneditoronline.org to see the structure of the properties.) */
        //text = '<b>Current Temperature: </b>' + response.main.temp + ' F<br/>';
        //text += '<b>Weather Conditions: </b>' + response.weather[0].description + '<br/>';
        //$('#parsed_json').append(text);

    });

function updateHTML(res) {

    console.log(res);

    console.log(res.weather[0].description);

    //
    //     $('#quote').text(res.quoteText);
    //     $('#author').text(res.quoteAuthor);
    //     $('#link').attr('href', res.quoteLink);
    //
    //     var combinedQuote = res.quoteAuthor + ' - ' + res.quoteText;
    //
    //     if (combinedQuote.length > 140) {
    //
    //         $('#tweetDiv').empty();
    //
    //     } else {
    //
    //         $('#tweetDiv').empty();
    //         var tweetA = '<a id="tweet" class="btn btn-default btn-xs btn-success" ';
    //         tweetA += 'href="https://twitter.com/intent/tweet?text=' + combinedQuote.replace(/ /g, '+');
    //         tweetA += '" target="_blank" class="col-xs-6" role="button">Tweet</a>';
    //         $('#tweetDiv').append(tweetA);
    //         $.getScript('https://platform.twitter.com/widgets.js');
    //
    //     }

}
