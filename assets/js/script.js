$( document ).ready(function() {

    const key = "2da6629ff1a77167ddf523563768f9b8";

    let weatherArr;
    let weatherList;

    let day = moment().format("DD/MM/YYYY");

    $('#search-button').on('click', function(e) {

        let cityName = $('#search-input').val();

        let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key;
        console.log(queryURL);

        e.preventDefault();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            weatherArr = response;
            weatherList = response.list;
            currentWeather(weatherArr);
            splitIntoFiveDays(weatherList);
            
        });

    })

    function currentWeather() {

        let todayForecast = weatherArr.list[0]
        var todayBox = $("#today");
        var todayCard = $("<div>");
        todayCard.attr("class", "card border-dark");
        todayBox.append(todayCard);
      
        var cardBody = $('<div class="card-body">');
        todayCard.append(cardBody);
      
        var cardTitle = $('<h5 class="card-title">');
        cardTitle.text(`${weatherArr.city.name} (${day})`);

        var iconcode = todayForecast.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

        cardTitle.append(`<img class="ml-3 bg-info rounded-circle " src=${iconurl} alt="${todayForecast.weather[0].description}">`);
        cardBody.append(cardTitle);
      
        var tempText = $('<p class="card-text">');
        tempText.text(`Temp: ${(todayForecast.main.temp - 273.15).toFixed(2)} ºC`);
        cardBody.append(tempText);
      
        var windText = $('<p class="card-text">');
        windText.text(`Wind: ${todayForecast.wind.speed}`);
        cardBody.append(windText);
      
        var humidityText = $('<p class="card-text">');
        humidityText.text(`Humidity: ${todayForecast.main.humidity}%`);
        cardBody.append(humidityText);
    }

    function getDate(str) {
        var dateStr = str.substring(0, str.indexOf(" "));
        return dateStr.split("-").reverse().join("/");
    }

    var day1 = [];
    var day2 = [];
    var day3 = [];
    var day4 = [];
    var day5 = [];

    const a = moment().add(1, 'd').format("DD/MM/YYYY");
    const b = moment().add(2, 'd').format("DD/MM/YYYY");
    const c = moment().add(3, 'd').format("DD/MM/YYYY");
    const d = moment().add(4, 'd').format("DD/MM/YYYY");
    const e = moment().add(5, 'd').format("DD/MM/YYYY");

    function splitIntoFiveDays() {
        for (var i = 0; i < weatherList.length; i++) {
          
          if (getDate(weatherList[i].dt_txt) == a) {
            day1.push(weatherList[i]);
          } else if (getDate(weatherList[i].dt_txt) == b) {
            day2.push(weatherList[i]);
          } else if (getDate(weatherList[i].dt_txt) == c) {
            day3.push(weatherList[i]);
          } else if (getDate(weatherList[i].dt_txt) == d) {
            day4.push(weatherList[i]);
          } else if (getDate(weatherList[i].dt_txt) == e) {
            day5.push(weatherList[i]);
          }
        }
    }

});

