$(document).ready(function() {

  var $container = $('.masonry-container');
  $container.masonry({
    itemSelector: '.grid-item',
  });

  $.ajax({
    url: "http://www.freecodecamp.com/stories/hotStories",
    dataType: 'json',
    success: function(data) {

      data.forEach(function(inputObj) {
        var $items = returnItem(inputObj);
        $container.append($items)
          .masonry('appended', $items);

        $container.imagesLoaded(function() {
          $container.masonry();
        });

      })
    }
  })

})

function returnItem(input) {
  var discussUrl = input.link.split("/");
  discussUrl = discussUrl[discussUrl.length - 2];
  var authorProfileUrl = "http://www.freecodecamp.com/" + input.author.username;
  if (input.image.length !== 0) {
    var imageUrl = input.image;
  } else {
    var imageUrl = input.author.picture;
  }

  var htmlItem = "<div class='col-md-3 col-sm-6 col-xs-12 grid-item'>";
  htmlItem += "<div class='thumbnail'>";
  htmlItem += "<a target='_blank' href='" + input.link + "'>";
  htmlItem += "<img class='thumbnail-img' onerror='imgError(this);' src='" + imageUrl + "' alt=''></a>";
  htmlItem += "<div class='caption'>";
  htmlItem += "<h3><a target='_blank' href='" + input.link + "'>" + input.headline + "</a></h3>";
  htmlItem += "<p>" + input.metaDescription + "</p>";
  htmlItem += "<h5 class='text-center'> by " + "<a class='authorUrl' href='" + authorProfileUrl + "' target='_blank'>@" + input.author.username + "</a></h5>";
  htmlItem += "<div><h5 class=' comments'>" + input.comments.length + " Comments</h5>";
  htmlItem += "<h5 class=' upvotes'>" + input.upVotes.length + " Upvotes</h5><div style='clear: both;'></div></div>";
  htmlItem += "</div></div></div>";

  var $items = $(htmlItem);

  return $items;

}

function imgError(image) {
  image.onerror = "";
  image.src = "https://pbs.twimg.com/profile_images/562385977390272512/AK29YaTf.png";
  return true;
}