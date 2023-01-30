$( document ).ready(function() {

    const key = "2da6629ff1a77167ddf523563768f9b8";

    let day = dayjs().format('DD MM YYYY');
    
    var todayForecast ;

    $('#search-button').on('click', function(e) {

        let cityName = $('#search-input').val();

        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key;
        console.log(queryURL);

        e.preventDefault();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            todayForecast = response;
            currentWeather(todayForecast);
            console.log(todayForecast);

        });

    })

    function currentWeather() {
        var todayBox = $("#today");
        var todayCard = $("<div>");
        todayCard.attr("class", "card border-dark");
        todayBox.append(todayCard);
      
        var cardBody = $('<div class="card-body">');
        todayCard.append(cardBody);
      
        var cardTitle = $('<h5 class="card-title">');
        cardTitle.text(`${todayForecast.name} (${day})`);

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

});

