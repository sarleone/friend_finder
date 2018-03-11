// ===============================================================================
// DATA
// Below data will hold all of the reserved tables.
// Initially we just set it equal to a "dummy" customer.
// But you could have it be an empty array as well.
// ===============================================================================

// Array to hold all of the friends that join!
var friendsArray = [];

function Friend(name, photo, scores) {
  this.name = name;
  this.photo = photo;
  this.scores = scores;
  this.compare = function(otherFriend) {
    var userScores = this.scores;
    var theirScores = otherFriend.scores;
    var totalDifference = 0;
    for (var i=0; i<userScores.length; i++) {
      totalDifference += Math.abs(userScores[i]-theirScores[i]);
    }
    return totalDifference;
  }
}

function getBestie(user, friendList) {
  var bestie = 9;
  var closest = 100;
  var friends = friendsArray;

  for (var i=0; i<friends.length; i++) {
    var totalDifference = user.compare(friends[i]);

    if (totalDifference <= closest) {
      closest = totalDifference;
      bestie = i;
    }
  }
  console.log(friends[bestie]);
  return friend[bestie]
}

// Note how we export the array. This makes it accessible to other files using require.
module.exports = { friendsArray, Friend, getBestie};
