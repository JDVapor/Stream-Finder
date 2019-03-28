$(document).on("ready", function() {
    var queryUrl = "http://www.omdbapi.com/?s=" + title + "&plot=short&i=tt3896198&apikey=trilogy";
    var title= "avengers";

    $.ajax({
        url: queryUrl,
        method: "GET",
    })
    .then(function(response) {
        console.log(response);
    })
})