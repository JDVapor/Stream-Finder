// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyAcsj4tXLbrb4kL-F7toML4Mt65-K9snnY",
//   authDomain: "streamfinder-32af6.firebaseapp.com",
//   databaseURL: "https://streamfinder-32af6.firebaseio.com",
//   projectId: "streamfinder-32af6",
//   storageBucket: "streamfinder-32af6.appspot.com",
//   messagingSenderId: "1019547739080"
// }
// firebase.initializeApp(config)
// var db = firebase.database();
//
// //firebase object for user accounts
// var fb = {
//   createUser: function(email, password) {
//     console.log(email);
//     console.log(password);
//     debugger;
//     firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       console.log("ERROR");
//     })
//   },
//   getUser: function() {
//     firebase.auth().onAuthStateChanged(function(user) {
//       console.log(user);
//       if (user) {
//         console.log(user);
//         // User is signed in.
//       } else {
//         console.log("no user signed in");
//         // No user is signed in.
//       }
//     });
//   },
//
//   signInUser: function(email, password) {
//     firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//       debugger;
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // ...
//     });
//   }
//
//   // writeUserData: function(name, email, password) {
//   //
//   //   this.db.ref('users/' + this.counter).set({
//   //       username: name,
//   //       email: email,
//   //       password: password
//   //     });
//   //     this.counter++;
//   // }
//
// }
// fb.getUser();
//
// $("#createAcc").on("click ", function() {
//
//   console.log('start');
//   var newEmail = $("#email").val();
//   console.log(newEmail);
//   var newPW = $("#password").val();
//   console.log(newPW);
//   fb.createUser(newEmail, newPW);
//   fb.signInUser(newEmail, newPW);
//
//
//   // fb.writeUserData()
// });


//when submit button is clicked
$("#searchBtn").on("click ", function(event) {
  event.preventDefault();
  //the input variable should be the value of the user's search.
  var input = $("#userInput").val();
  var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + input + "&plot=short&";


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
      var image = $("<img>").attr("src", imgURL);
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
      var director = response.Director;
      var displayedDirector = $("<p>").text("Director: " + director);
      movieDiv.append(displayedDirector);

      //finding and displaying the writer
      var writer = response.Writer;
      var displayedWriter = $("<p>").text("Writer: " + writer);
      movieDiv.append(displayedWriter);

      //finding and displaying actors
      var actors = response.Actors;
      var displayedActors = $("<p>").text("Top Actors: " + actors);
      movieDiv.append(displayedActors);

      //finding and displaying genre
      var genre = response.Genre;
      var displayedGenre = $("<p>").text("Genre: " + genre);

      //finding and displaying runtime
      var runtime = response.Runtime;
      var displayedRuntime = $("<p>").text("Runtime: " + runtime);
      movieDiv.append(displayedRuntime);

      //finding and displaying rotten tomatoes rating
      var rottenTomatoesScore = response.Ratings[1].Value;
      var displayedRottenTomatoesScore = $("<p>").text("Rotten Tomatoes: " + rottenTomatoesScore);
      movieDiv.append(displayedRottenTomatoesScore);

      //finding and displaying Awards
      var awards = response.Awards;
      var displayedAwards = $("<p>").text("Awards: " + awards);
      movieDiv.append(displayedAwards);

      //finding and displaying country of release
      var country = response.Country;
      var displayedCountry = $("<p>").text("Country: " + country);
      movieDiv.append(displayedCountry);

      //finding and displaying box office
      var boxOffice = response.BoxOffice;
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

      var streamingDiv = $("#streamDisplay");
      //changed name of variable from results to streams to make it more clear
      var streams = response.results[0].locations;
      
      streams.forEach(function() {
        var image= $("<img>");
        for (var i = 0; i < streams.length; i++) {
          var iconImage = streams[i].icon;
          var iconUrl = streams[i].url;
          image.attr("src", iconImage).wrap($('<a>').attr("href", iconUrl));
        }
        streamingDiv.append(image);
      });

      //var icon = response.results[0].locations[0].icon;
      //var url = response.results[0].locations[0].url;

      console.log(icon);

      console.log(url);


      //displaying the name of each streaming service it is on

      var displayedName = $("<p>").text("You can stream " + input + " on " + streams);
      streamingDiv.append(displayedName);

      // displaying the icon and including a link to the streaming service,





      // var displayedIcon = $("<img>").attr("src", icon).append($("<a>"), {
      //   href: url
      // });
      // streamingDiv.append(displayedIcon);
    })
});
