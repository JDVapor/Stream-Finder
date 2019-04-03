// Initialize Firebase
var config = {
  apiKey: "AIzaSyAcsj4tXLbrb4kL-F7toML4Mt65-K9snnY",
  authDomain: "streamfinder-32af6.firebaseapp.com",
  databaseURL: "https://streamfinder-32af6.firebaseio.com",
  projectId: "streamfinder-32af6",
  storageBucket: "streamfinder-32af6.appspot.com",
  messagingSenderId: "1019547739080"
};
toggleNav(false);
firebase.initializeApp(config);
var database = firebase.database();
//firebase object for user accounts
var fb = {
  createUser: function (email, password, cb) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      cb();
    }).catch(function (error) {
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
  signInUser: function (email, password, cb) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
      cb();

    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if (error) {
        // logged in is false
        toggleNav(false)
        alert(error.message)
        cb(error);
      } else {
        cb(null);

      }
    });
  }
};


$("#login").on("click", function (event) {
  event.preventDefault();
  // remove sign up form replace with login form when clicking login
  $("#account").hide();
  $("#loginForm").show();
});

function toggleNav(loggedIn){
  if (loggedIn){
    // if someone is logged in 

    // nav bar
    $("#login").hide();
    $("#signup").hide();
    $("#profile").show();
    $("#loginForm").show();
    $("#settings").show();
    $("#logout").show();

    // body
    $("#loginForm").hide();
    $("#account").hide();
  } else { 
    // if someone is logged out

    // nav bar
    $("#loginForm").hide();
    $("#profile").hide();
    $("#settings").hide();
    $("#logout").hide();
    $("#login").show();
    $("#signup").show();

    // body
    $("#loginForm").hide();
    $("#account").hide();
  }
}

$("#logout").click(function(){
  firebase.auth().signOut()
  .then(function() {
    // Sign-out successful.
    console.log("sign out successful");
    window.location.reload();
  })
  .catch(function(error) {
    // An error happened
    console.error(error);
  });
})

$("#signup").on("click", function (event) {
  event.preventDefault();
  // remove login form replace with sign up form when clicking sign up 
  $("#loginForm").hide();
  $("#account").show();
});

$("#logAcc").on("click", function (event) {
  event.preventDefault();
  var existEmail = $("#emailL").val();
  var existPW = $("#passwordL").val();
  fb.signInUser(existEmail, existPW, (err) => {
    if (err) {
      console.error(err);
      toggleNav(false);
    } else {
      // logged in is true
      toggleNav(true);
    }
  });
});
$("#createAcc").on("click", function (event) {
  event.preventDefault();
  var newEmail = $("#email").val();
  var newPW = $("#password").val();
  fb.createUser(newEmail, newPW, () => {
    fb.signInUser(newEmail, newPW, (err) => {
      console.log("err = ", err);
      if (err) {
        console.error(err);
        toggleNav(false);
      } else {
        toggleNav(true);
      }
    });
  });
});

$("#searchBtn").on("click", function (event) {
  event.preventDefault();

  $("#icons").empty();

  //the input variable should be the value of the user's search.
  var input = $("#userInput").val();
  var queryUrl = "https://www.omdbapi.com/?apikey=trilogy&t=" + input + "&plot=short&";


  $.ajax({
    url: queryUrl,
    method: "GET",
  })
    .then(function (response) {
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

      var key = response.imdbID;
      console.log(key);

      //using imdbId found in first ajax call to find the movie_id
      var tmdbQueryUrl = "https://api.themoviedb.org/3/find/" + key + "?api_key=2f627286a0a498c692e51fcca9afb912&external_source=imdb_id";

      $.ajax({
        url: tmdbQueryUrl,
        headers: {
          "content-type": "application/json;charset=utf-8",
        },
        method: "GET",
      }).then(function (response) {
        console.log(response);
        var tmdbId = response.movie_results[0].id;
        var movieId = tmdbId;
        console.log(movieId);
        var trailerQueryUrl = "https://api.themoviedb.org/3/movie/" + movieId + "/videos?api_key=2f627286a0a498c692e51fcca9afb912&language=en-US";
        $.ajax({
          url: trailerQueryUrl,
          headers: { "content-type": "application/json;charset=utf-8", },
          method: "GET",
        }).then(function (response) {
          console.log(response);
          var youtubeKey = response.results[0].key;
          console.log(youtubeKey);
          var youtubeLink = "https://youtube.com/embed/" + youtubeKey;
          console.log(youtubeLink);
          var iframe = $("<iframe>").attr("width", 560).attr("height", 315).attr("src", youtubeLink).attr("frameborder", 0).attr("allow", "encrypted-media");
          $("#video-display").html(iframe);
        });
      });

    });

  //using movieId to find video sources and show on Youtube

  var utellyQueryUrl = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + input + "&country=us";

  $.ajax({
    url: utellyQueryUrl,
    headers: {
      "X-RapidAPI-Key": "f53d91c658msh3e2a2bf0273cc43p1b97a4jsn5ef72aa781b3"
    },
    method: "GET",
  })
    .then(function (response) {
      console.log(response);

      var streamingDiv = $("#streamDisplay");

      var displayedName = $("<p>").text("You can stream " + input + " on: ");
      streamingDiv.html(displayedName);

      //changed name of variable from results to streams to make it more clear
      var streams = response.results[0].locations;
      console.log(streams);
      // displaying the icon with a link to ALL streaming service
      for (var i = 0; i < streams.length; i++) {
        var icon = streams[i].icon;
        console.log(icon);
        var iconUrl = streams[i].url;
        console.log(iconUrl);
        $('#icons').append('<a href=' + iconUrl + '><img src=' + icon + ' /></a>');
      };
    });
});
