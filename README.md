# slackweatherbot

![Screenshot](screenshot.png)

You first need this bot running on your Slack chat: https://github.com/xBytez/slackbotapi/ 

Once you have your bot running off your script similar to example_bot.js on the xBytez repo, within the [switch statement](https://github.com/xBytez/slackbotapi/blob/master/examples/example_bot.js#L41) place the following code:

```
case "weather":
    var location = command[1];
    weatherBot.getWeather(location, function (err, message) {
        if (message) slack.sendMsg(data.channel, message);
    });
    break;
```
