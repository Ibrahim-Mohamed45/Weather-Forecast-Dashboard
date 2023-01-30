$( document ).ready(function() {

    const key = "76d996ed211d97f5cfad38a1e858f70a";
    
    $('#search-button').on('click', function(e) {

        let cityName = $('#search-input').val();

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key;
        console.log(queryURL);

        e.preventDefault();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            console.log(response);

        });

    })
});