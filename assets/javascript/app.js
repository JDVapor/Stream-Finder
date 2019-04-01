//when submit button is clicked
$("#searchBtn).on("click", function() {

    //the input variable should be the value of the user's search.
    var input = $("#userSearch").val();
    var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&s=" + input + "&plot=short&";


    $.ajax({
        url: queryUrl,
        method: "GET",
    })
    .then(function(response) {
        console.log(response);

        //creating a movie div to house all of the information, can be changed to specific div in html if needed
        var movieDiv = $("<div class='movie");
        //finding poster
        var imgURL = response.poster;
        //creating an image element to hold the poster
        var image = $("img").attr("src", imgURL);
        movieDiv.append(image);

        //finding and displaying the rating
        var rating = response.Rated;
        var displayedRating = $("<p>").text("Rating: " + rating);
        movieDiv.append(displayedRating);

        //finding and displaying the release date
        var released = response.Released;
        var displayedReleaseDate = $("<p>").text("Released: " + released);
        movieDiv.append(displayedReleaseDate);

        //finding and displaying director
        var director = response.director;
        var displayedDirector = $("<p>").text("Director: " + director);
        movieDiv.append(displayedDirector);

        //finding and displaying the writer
        var writer = response.writer;
        var displayedWriter = $("<p>").text("Writer: " + writer);
        movieDiv.append(displayedWriter);

        //finding and displaying actors
        var actors = response.actors;
        var displayedActors = $("<p>").text("Top Actors: " + actors);
        movieDiv.append(displayedActors);

        //finding and displaying genre
        var genre = response.genre;
        var displayedGenre = $("<p>").text("Genre: " + genre);

        //finding and displaying runtime
        var runtime = response.runtime;
        var displayedRuntime = $("<p>").text("Runtime: " + runtime);
        movieDiv.append(displayedRuntime);

         //finding and displaying rotten tomatoes rating
        var rottenTomatoesScore = response.tomato_meter;
        var displayedRottenTomatoesScore = $("<p>").text("Rotten Tomatoes: " + rottenTomatoesScore);
        movieDiv.append(displayedRottenTomatoesScore);

        //finding and displaying Awards
        var awards = response.awards;
        var displayedAwards = $("<p>").text("Awards: " + awards);
        movieDiv.append(displayedAwards);

        //finding and displaying country of release
        var country = response.country;
        var displayedCountry = $("<p>").text("Country: " + country);
        movieDiv.append(displayedCountry);

        //finding and displaying box office
        var boxOffice = response.box_office;
        var displayedBoxOffice = $("<p>").text("Box Office: " + boxOffice);
        movieDiv.append(displayedBoxOffice);


    })

    var utellyQueryUrl = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + input;

    $.ajax({
        url: utellyQueryUrl,
        headers: {
            "X-RapidAPI-Key": "f53d91c658msh3e2a2bf0273cc43p1b97a4jsn5ef72aa781b3"
        },
        method: "GET",
    })
    .then(function(response) {
        console.log(response);

        var streamingDiv = $("<div class='streaming");

        var results = response.results.locations;

        results.forEach(function() {

            //displaying the name of each streaming service it is on
            var name = "display_name";
            var displayedName = $("<p>").html(name);
            streamingDiv.append(displayedName);

            //displaying the icon and including a link to the streaming service,
            var icon = "icon";
            var url = "url";
            var displayedIcon = $("<img>").attr("src", icon).append($("<a>"), {href: url});
            streamingDiv.append(displayedIcon);
        })
    })
});
