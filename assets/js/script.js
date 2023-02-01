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

        $("#today").empty();

        let todayForecast = weatherArr.list[0]
        var todayCard = $("<div>");
        todayCard.attr("class", "card border-dark");
        $("#today").append(todayCard);
      
        var cardBody = $('<div class="card-body">');
        todayCard.append(cardBody);
      
        var cardTitle = $('<h3 class="card-title">');
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

        $("#forecast").empty();

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
        
        let day1temp = 0 ; let day1wind = 0; let day1humidity = 0;
        let day2temp = 0 ; let day2wind = 0; let day2humidity = 0;
        let day3temp = 0 ; let day3wind = 0; let day3humidity = 0;
        let day4temp = 0 ; let day4wind = 0; let day4humidity = 0;
        let day5temp = 0 ; let day5wind = 0; let day5humidity = 0;
        let day1Icon; let day2Icon; let day3Icon; let day4Icon; let day5Icon;

        for (var i = 0; i < day1.length; i++) {
            day1temp += ((day1[i].main.temp - 273.15).toFixed(2) * 1) / day1.length;
            day1wind += (day1[i].wind.speed * 1) / day1.length;
            day1humidity += (day1[i].main.humidity * 1) / day1.length;
            let index = Math.round(day1.length/2);
            day1Icon = day1[index].weather[0].icon;
        }
        
        for (var i = 0; i < day2.length; i++) {
            day2temp += ((day2[i].main.temp - 273.15).toFixed(2) * 1) / day2.length;
            day2wind += (day2[i].wind.speed * 1) / day2.length;
            day2humidity += (day2[i].main.humidity * 1) / day2.length;
            let index = Math.round(day2.length/2);
            day2Icon = day2[index].weather[0].icon;
        }
        
        for (var i = 0; i < day3.length; i++) {
            day3temp += ((day3[i].main.temp - 273.15).toFixed(2) * 1) / day3.length;
            day3wind += (day3[i].wind.speed * 1) / day3.length;
            day3humidity += (day3[i].main.humidity * 1) / day3.length;
            let index = Math.round(day3.length/2);
            day3Icon = day3[index].weather[0].icon;
        }

        for (var i = 0; i < day4.length; i++) {
            day4temp += ((day4[i].main.temp - 273.15).toFixed(2) * 1) / day4.length;
            day4wind += (day4[i].wind.speed * 1) / day4.length;
            day4humidity += (day4[i].main.humidity * 1) / day4.length;
            let index = Math.round(day4.length/2);
            day4Icon = day4[index].weather[0].icon;
        }

        for (var i = 0; i < day5.length; i++) {
            day5temp += ((day5[i].main.temp - 273.15).toFixed(2) * 1) / day5.length;
            day5wind += (day5[i].wind.speed * 1) / day5.length;
            day5humidity += (day5[i].main.humidity * 1) / day5.length;
            let index = Math.round(day5.length/2);
            day5Icon = day5[index].weather[0].icon;
        }

        avgTemp=[day1temp.toFixed(2),day2temp.toFixed(2),day3temp.toFixed(2),day4temp.toFixed(2),day5temp.toFixed(2)];

        avgWind=[day1wind.toFixed(2),day2wind.toFixed(2),day3wind.toFixed(2),day4wind.toFixed(2),day5wind.toFixed(2)];

        avgHumidity=[Math.round(day1humidity),Math.round(day2humidity),Math.round(day3humidity),Math.round(day4humidity),Math.round(day5humidity)];

        dates=[a,b,c,d,e];

        icons=[day1Icon, day2Icon, day3Icon, day4Icon, day5Icon];

        console.log(icons);

        let forecastHeader = $(
        ` <h3 class="px-3 w-100"> 5 Day Forecast: </h3> `);
        $('#forecast').append(forecastHeader);

        for(var i=0; i<5; i++) {

            var iconurl = "http://openweathermap.org/img/w/" + icons[i] + ".png";
            
            let forecastCard = $(
                `
                <div class="card m-3 p-3 col-lg-2 col-11 bg-info text-white">
                <h4 class="card-title p-1">${dates[i]}</h4>
                <div class="card-body p-2">
                <div class="pb-3">
                <img class="ml-2" src=${iconurl}>
                </div>
                <p class="card-text">Temp: ${avgTemp[i]} ℃</p>
                <p class="card-text">Wind: ${avgWind[i]} </p>
                <p class="card-text">Humidity: ${avgHumidity[i]}%</p>
                </div>
                </div>
                `);
                
                $('#forecast').append(forecastCard);
        }
    }

});

