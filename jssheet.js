$(document).ready(function() {
  var apiUrl = 'https://wind-bow.gomix.me/twitch-api/streams/';
  let apiData;
  let apiLink;
  var channels = ["bobross", "cretetion", "ESL_SC2", "freecodecamp", "habathcx", "liveordevtrying", "noobs2ninjas", "OgamingSC2"];
  let profilePic;
  let channelName;
  var channel;
  var offline = "<span class='glyphicon glyphicon-remove status-off'</span>";
  var online = "<span class='glyphicon glyphicon-ok status-on'</span>";
  var i;
  let channelStatus;
  var searchTerm;
  //look to add profilePic and name
  for(i = 0; i < channels.length; i++) {
    profilePic = "<img class='profilePic' src='logos/" + channels[i] + ".jpg'/>";
    channelName = channels[i];
    channel = "<a target='_blank' href='https://www.twitch.tv/" + channelName + "'>" + "<div class='channel' id='" + channelName + "'>" + profilePic + "<p class='channelName'>" + channelName + "</p></a>" + "</div></a>";
    $(channel).appendTo(".twitchChannels");
    }
  //function checkOnline() {
  for(i = 0; i < channels.length; i++) {
    let newLink;
    let newChannel;
    $.ajax({
      url: apiUrl + channels[i],
      success: function(data) {
        apiData = data;
        apiLink = data._links.self;
        findChannel(apiLink);
        function findChannel(link) {
          newLink = link.split("/");
          newChannel = newLink[newLink.length - 1];
          return newChannel;
        }
        if (apiData.stream === null) {
          $(offline).appendTo("#" + newChannel);
          $("#" + newChannel).addClass("offline");
        } else if (apiData.stream !== null) {
          $(online).appendTo("#" + newChannel);
          channelStatus = "<p class='status'>" + data.stream.channel.status + "</p>";
          $(channelStatus).appendTo("#" + newChannel);
          $("#" + newChannel).addClass("online");
        }
        $("#left").on("click", function() {
          $("#right").removeClass("active");
          $("#middle").removeClass("active");
          $(this).addClass("active");
          $(".online").show();
          $(".offline").show();
        });
        $("#middle").on("click", function() {
          $("#right").removeClass("active");
          $("#left").removeClass("active");
          $(this).addClass("active");
          $(".online").show();
          $(".offline").hide();
        });
        $("#right").on("click", function() {
          $("#left").removeClass("active");
          $("#middle").removeClass("active");
          $(this).addClass("active");
          $(".offline").show();
          $(".online").hide();
        });
      }
    });
  }
  //}
  $("#searchThis").on("input", function() {
    searchTerm = this.value;
    for (i = 0; i < channels.length; i++) {
      if (!channels[i].startsWith(searchTerm)) {
        $("#" + channels[i]).hide();
      } else {
        $("#" + channels[i]).show();
      }
    }
  });
});
