var friendsData = require("../data/friends");

module.exports = function(app) {
  app.get("/api/survey", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/survey", function(req, res) {
    var bestMatch = {
      name: "",
      photo: "",
      friendDiff: Infinity
    };
    var userData = req.body;
    var userScores = userData.scores;
    var totalDiff;
    for (var i = 0; i < friendsData.length; i++) {
      var currentFriend = friendsData[i];
      totalDiff = 0;
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j]; //5 4
        var currentUserScore = userScores[j]; //3 2
        totalDiff += Math.abs(currentUserScore - currentFriendScore); //0+(2)=2 2+(4-2)=4
      }
    }
    if (totalDiff <= bestMatch.friendDiff) {
      bestMatch.name = currentFriend.name;
      bestMatch.photo = currentFriend.photo;
      bestMatch.friendDiff = totalDiff;
    }

    // if (friendsData.length < 0) {
    friendsData.push(req.body);
    res.json(bestMatch);
    // }
  });
  app.post("/api/clear", function(req, res) {
    friendsData.length = 0;
    res.json({ ok: true });
  });
};
