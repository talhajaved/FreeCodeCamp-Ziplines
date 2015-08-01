var userArray = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "comster404", "brunofin", "thomasballinger", "noobs2ninjas", "beohoff", "halo", "dota2ti", "riotgames"];
var statusOnlineTag = "<span class='glyphicon glyphicon-ok online-symbol'></span><br>";
var statusOfflineTag = "<span class='glyphicon glyphicon-remove offline-symbol'></span><br>";
var rowTag = "<div class='row row-centered'>";
var colTag = "<div class='col col-centered'>";

function imgError(image) {
    image.onerror = "";
    image.src = "https://placeholdit.imgix.net/~text?txtsize=6&txt=50%C3%9750&w=50&h=50";
    return true;
}

$(document).ready(function() {

  var userInfoDict = {};

  function getUserInfo(username) {
    $.ajax({
      url: 'https://api.twitch.tv/kraken/users/' + username,
      dataType: 'jsonp',
      success: function(user) {
        userInfoDict[username] = [user.display_name, user.logo];
      }
    });
  }

  function getStatus(username) {
    $.ajax({
      url: 'https://api.twitch.tv/kraken/streams/' + username,
      dataType: 'jsonp',
      success: function(channel) {

        var streamTag = "<a class='stream-title' target='_blank' href='https://twitch.tv/" + username + "'>" + userInfoDict[username][0] + "</a>";
        var logoTag = "<img onerror='imgError(this);' class='img-responsive img-circle img-inline' height='40' width='40' src='" + userInfoDict[username][1] + "'</img>";
        var newHtmlWell = "<div id='" + username + "'class='well row-centered'><div class='col-xs-3 col-centered'>" + logoTag + "</div><div class='col-xs-6 col-centered'>" + streamTag + "</div><div class='col-xs-3 col-centered'>";

        if (channel.stream === null) {
          newHtmlWell += statusOfflineTag;
        } else {
          newHtmlWell += statusOnlineTag;
        }
        newHtmlWell += "</div>";
        if (channel.stream !== null) {
          newHtmlWell += "<div class='row row-centered'><div class='col-xs-12 col-centered'><small class='stream-details'>" + channel.stream.channel.status + "</small></div></div>";
        }
        newHtmlWell += "</div>";

        $("#con-1").append(newHtmlWell);

      }
    });

  };

  userArray.forEach(function(user) {
    getUserInfo(user);
  })
  userArray.forEach(function(user) {
    getStatus(user);
  })

});

//we want this function to fire whenever the user types in the search-box
$("#search-text").keyup(function() {

  //first we create a variable for the value from the search-box
  var searchTerm = $("#search-text").val().toLowerCase();

  $.extend($.expr[':'], {
    'containsi': function(elem, i, match, array) {
      return (elem.textContent || elem.innerText || '').toLowerCase()
        .indexOf((match[3] || "").toLowerCase()) >= 0;
    }
  });

  var searchSplit = searchTerm.replace(/ /g, "'):containsi('");

  userArray.forEach(function(data) {
    if (data.includes(searchSplit)) {
      $("#" + data).removeClass('hidden');
    } else {
      $("#" + data).addClass('hidden');
    }
  })
});