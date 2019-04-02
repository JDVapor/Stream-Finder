// Initialize Firebase
var config = {
  apiKey: "AIzaSyAcsj4tXLbrb4kL-F7toML4Mt65-K9snnY",
  authDomain: "streamfinder-32af6.firebaseapp.com",
  databaseURL: "https://streamfinder-32af6.firebaseio.com",
  projectId: "streamfinder-32af6",
  storageBucket: "streamfinder-32af6.appspot.com",
  messagingSenderId: "1019547739080"
};
firebase.initializeApp(config);

var database = firebase.database();

//firebase object for user accounts
var fb = {

  createUser: function(email, password, cb) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      cb();
    }).catch(function(error) {
      // Handle Errors here
      var errorCode = error.code;
      var errorMessage = error.message;
      if (error) {
        alert("Email already in use / invalid email")
      } else {
        cb();
      }
    });
  },

  signInUser: function(email, password, cb) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
      cb();
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (error) {
        alert("Invalid email/password.")
        cb(error);
      } else {
        cb(null);
      }
    });
  }
};

$("#account").hide();

$("#loginForm").hide();

$("#login").on("click", function(event) {
  event.preventDefault();
  $("#login").hide();
  $("#signup").hide();
  $("#loginForm").show();
  //goes to log in screen for existing accounts
});


$("#signup").on("click", function(event) {
  event.preventDefault();
  $("#login").hide();
  $("#signup").hide();
  $("#account").show();
});

$("#logAcc").on("click", function(event) {
  event.preventDefault();

  var existEmail = $("#emailL").val();

  var existPW = $("#passwordL").val();

  fb.signInUser(existEmail, existPW, (err) => {
    if (err) {
      console.error(err);
    } else {
      $("#loginForm").hide();
    }
  });
});


$("#createAcc").on("click", function(event) {
  event.preventDefault();


  var newEmail = $("#email").val();

  var newPW = $("#password").val();
  fb.createUser(newEmail, newPW, () => {
    fb.signInUser(newEmail, newPW, (err) => {
      console.log("err = ", err);

      if (err) {
        console.error(err);
      } else {
        $("#account").hide();
      }
    });
  });
});

//when submit button is clicked
$("#searchBtn").on("click", function(event) {
  event.preventDefault();
  //the input variable should be the value of the user's search.
  var input = $("#userInput").val();
  var queryUrl = "https://www.omdbapi.com/?apikey=trilogy&t=" + input + "&plot=short&";
  var imdbId = [];

  $.ajax({
      url: queryUrl,
      method: "GET",
    })
    .then(function(response) {
      console.log(response);

      //creating a movie div to house all of the information, can be changed to specific div in html if needed
      var movieDiv = $("#movieDisplay");
      //finding poster
      var imgURL = response.Poster;
      console.log(imgURL);
      //creating an image element to hold the poster
      $("#poster").attr("src", imgURL);

      //finding and displaying the rating
      var rating = response.Rated;
      var displayedRating = $("<p>").text("Rating: " + rating);
      $("#mpaaRating").html(displayedRating);

      //finding and displaying the release date
      var released = response.Released;
      var displayedReleaseDate = $("<p>").text("Released: " + released);
      $("#releaseDate").html(displayedReleaseDate);

      //finding and displaying director
      var director = response.Director;
      var displayedDirector = $("<p>").text("Director: " + director);
      $("#movieDirector").html(displayedDirector);

      //finding and displaying the writer
      var writer = response.Writer;
      var displayedWriter = $("<p>").text("Writer: " + writer);
      $("#screenWriter").html(displayedWriter);

      //finding and displaying actors
      var actors = response.Actors;
      var displayedActors = $("<p>").text("Top Actors: " + actors);
      $("#mainCast").html(displayedActors);

      //finding and displaying genre
      var genre = response.Genre;
      var displayedGenre = $("<p>").text("Genre: " + genre);
      $("#filmGenre").html(displayedGenre);

      //finding and displaying runtime
      var runtime = response.Runtime;
      var displayedRuntime = $("<p>").text("Runtime: " + runtime);
      $("#filmRuntime").html(displayedRuntime);

      //finding and displaying rotten tomatoes rating
      var rottenTomatoesScore = response.Ratings[1].Value;
      var displayedRottenTomatoesScore = $("<p>").text("Rotten Tomatoes: " + rottenTomatoesScore);
      $("#rtScore").html(displayedRottenTomatoesScore);

      //finding and displaying Awards
      var awards = response.Awards;
      var displayedAwards = $("<p>").text("Awards: " + awards);
      $("#majorAwards").html(displayedAwards);

      //finding and displaying country of release
      var country = response.Country;
      var displayedCountry = $("<p>").text("Country: " + country);
      $("#releaseCountry").html(displayedCountry);

      //finding and displaying box office
      var boxOffice = response.BoxOffice;
      var displayedBoxOffice = $("<p>").text("Box Office: " + boxOffice);
      $("#boxOfficeNumbers").html(displayedBoxOffice);

      var key = response.imdbId;
      console.log(key);


      //using imdbId found in first ajax call to find the movie_id
      var tmdbQueryUrl = "https://api.themoviedb.org/3/find/" + key + "?api_key=2f627286a0a498c692e51fcca9afb912&external_source=imdb_id";
      var movieId = [];
      $.ajax({
        url: tmdbQueryUrl,
        method: "GET",
      }).then(function(response) {
        console.log(response);
        var id = response.movie_results[0].id;
        movieId.prepend(id);
      })

      //using movieId to find video sources and show on Youtube
      var trailerQueryUrl = "https://api.themoviedb.org/3/movie/" + movieId[0] + "/videos?api_key=2f627286a0a498c692e51fcca9afb912&language=en-US";
      $.ajax({
        url: trailerQueryUrl,
        method: "GET",
      }).then(function(response) {
        var youtubeKey = response[0].key;
        var youtubeLink = "http://youtube.com/watch?v=" + youtubeKey;
        vid = $("#trailer");
        vid.attr("src", youtubeLink);
        var myPlayer = videojs('trailer');
      })
    })

  var utellyQueryUrl = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + input + "&country=us";

  $.ajax({
      url: utellyQueryUrl,
      headers: {
        "X-RapidAPI-Key": "f53d91c658msh3e2a2bf0273cc43p1b97a4jsn5ef72aa781b3"
      },
      method: "GET",
    })
    .then(function(response) {
      console.log(response);

      var streamingDiv = $("#streamDisplay");

      var displayedName = $("<p>").text("You can stream " + input + " on: ");
      streamingDiv.html(displayedName);

      //changed name of variable from results to streams to make it more clear
      var streams = response.results[0].locations;
      console.log(streams);
      // displaying the icon with a link to the streaming service
      streams.forEach(function() {
        for (var i = 0; i < streams.length; i++) {
          var icon = streams[i].icon;
          console.log(icon);
          var iconUrl = streams[i].url;
          console.log(iconUrl);
          $('#icons').html('<a href=' + iconUrl + '><img src=' + icon + ' /></a>');
        };
      })
    })
});
