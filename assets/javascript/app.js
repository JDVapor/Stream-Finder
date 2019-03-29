$(document).on("ready", function() {
    
    //the name variable should be the value of the user's search.
    var name = ??;
    var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&s=" + name + "&plot=short&";
    

    $.ajax({
        url: queryUrl,
        method: "GET",
    })
    .then(function(response) {
        console.log(response);
    })
    var utellyQueryUrl = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=bojack" ;
    var term = name;

    $.ajax({
        url: utellyQueryUrl,
        headers: {
            "X-RapidAPI-Key": "f53d91c658msh3e2a2bf0273cc43p1b97a4jsn5ef72aa781b3"
        },
        method: "GET",
    })
    .then(function(response) {
        console.log(response);
    })
});