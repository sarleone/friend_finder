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
    res.json(newFriend);
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
      var userInput = req.body;
      var userResult = userInput.scores;
      console.log("User Score Input: " + userResult);
      //-------------------------------------------------------------------------
      // Building a comparing system! 
      // VARIABLES
      var totalDifference = 0;
      var bestMatch = {
        name: "",
        photo: "",
        difference: 50
      }
      // Search for si
      for (var i=0; i<friendData.length; i++) {
        for(var k=0; k<userResult.length; k++) {
          totalDifference += Math.abs(parseInt(friendData[i].scores[k]-userResult[k]));
          console.log("Friend data score: " + friendData[i].scores[j]);
        }
      }


    userArr.push(req.body);
      res.json(true);
    
    // else {
    //   waitListData.push(req.body);
    //   res.json(false);
    // }
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    userArr = [];
    //waitListData = [];

    console.log(userArr);
  });
};
