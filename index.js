var https = require('https');

function WeatherBot() {
    if (false === (this instanceof WeatherBot)) {
        return new WeatherBot();
    }
};

WeatherBot.prototype.getWeather = function (location, callback) {
    var locationQuery = escape("select item from weather.forecast where woeid in (select woeid from geo.places where text='" + location + "') and u='c'"),
        locationUrl = "https://query.yahooapis.com/v1/public/yql?q=" + locationQuery + "&format=json";

    https.get(locationUrl, function (res) {
        res.setEncoding('binary');

        var resData = "";
        res.on('data', function (chunk) {
            return resData += chunk;
        });
        res.on('end', function () {
            var result = JSON.parse(resData);
            if (Array.isArray(result.query.results.channel)) {
                var returnMessage = result.query.results.channel[0].item.title + '\n`Current` ' + result.query.results.channel[0].item.condition.temp + ' degrees, ' + result.query.results.channel[0].item.condition.text + '\n`' + result.query.results.channel[0].item.forecast[0].day + '` High: ' + result.query.results.channel[0].item.forecast[0].high + ' Low: ' + result.query.results.channel[0].item.forecast[0].low + ', ' + result.query.results.channel[0].item.forecast[0].text + '\n`' + result.query.results.channel[0].item.forecast[1].day + '` High: ' + result.query.results.channel[0].item.forecast[1].high + ' Low: ' + result.query.results.channel[0].item.forecast[1].low + ', ' + result.query.results.channel[0].item.forecast[1].text;
                callback(null, returnMessage);
            } else {
                var returnMessage = result.query.results.channel.item.title + '\n`Current` ' + result.query.results.channel.item.condition.temp + ' degrees, ' + result.query.results.channel.item.condition.text + '\n`' + result.query.results.channel.item.forecast[0].day + '` High: ' + result.query.results.channel.item.forecast[0].high + ' Low: ' + result.query.results.channel.item.forecast[0].low + ', ' + result.query.results.channel.item.forecast[0].text + '\n`' + result.query.results.channel.item.forecast[1].day + '` High: ' + result.query.results.channel.item.forecast[1].high + ' Low: ' + result.query.results.channel.item.forecast[1].low + ', ' + result.query.results.channel.item.forecast[1].text;
                callback(null, returnMessage);
            }
        });
    })
};

module.exports = WeatherBot;
