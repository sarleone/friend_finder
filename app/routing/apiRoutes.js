// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of friend information
// ===============================================================================

var friendData = require("../data/friends.js");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the newFriend array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
    
    // loop through all the options
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };
    
    // Take the results of the user's survey and POST and parse it
    var userData = req.body;
    var userScores = userData.scores;

    // This variable will calculate the difference between the scores and the scores of each user in the database 
    var totalDifference;

    // Loop through all of the friend possibilities in the database
    for (var i =0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDifference = 0;
      
      console.log(currentFriend.name);
      // We then loop through all of the friend scores
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        // Calculate the difference between the scores and sum them into the total difference
        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }
      
      // If the sum of the difference is less than the differences of the current "best match"
      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }
    
    // Finally save the user's data to the database (this has to happen after the check. Otherwise,
    // the database will always return that the user is it's own best friend).
    friends.push(userData);

    // Return a JSON with the user's bestie. This will be used by the HTML in the next page.
    res.json(bestMatch);
  });
}