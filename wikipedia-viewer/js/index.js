var lastSearch;
var didSelect = false;
var noResultElem = $("<div class='panel panel-primary'><div class='panel-body'><h4>No Results Found<h4></div></div>");

$(document).ready(function() {

  $(".searchbox").autocomplete({
    source: function(request, response) {
      $.ajax({
        url: "http://en.wikipedia.org/w/api.php",
        dataType: "jsonp",
        data: {
          'action': "opensearch",
          'format': "json",
          'search': request.term
        },
        success: function(data) {
          if (didSelect) {
            $('.searchbox').autocomplete('close');
            didSelect = false;
          } else {
            response(data[1]);
          }
        }
      });
    }
  });

})

$('#search').keyup(function(event) {
  if(event.keyCode == 8){
    didSelect = false;  
  }
})

$("#search").keypress(function(event) {
  didSelect = false;
});

$("#search").submit(function() {
  $('.searchbox').autocomplete('close');
  var searchInput = $(".searchbox").val();
  if (searchInput === lastSearch) {
    return false;
  } else {
    didSelect = true;
    lastSearch = searchInput;
  }

  $("#results-container").empty();

  $.ajax({
    url: "http://en.wikipedia.org/w/api.php",
    dataType: "jsonp",
    data: {
      'action': "opensearch",
      'format': "json",
      'search': searchInput
    },
    success: function(data) {
      if (data[1].length === 0) {
        $("#results-container").append(noResultElem);
        $("h1").animate({
          marginTop: '160px'
        }, 1000);
        return false;
      }

      $("h1").animate({
        marginTop: '40px'
      }, 1000);

      for (var i = 0; i < data[1].length; i++) {
        var inputElem = returnHtmlElement(data[1][i], data[2][i], data[3][i]);
        $("#results-container").append(inputElem);
      };
    }

  });
  return false;
})

$("#random-button").click(function() {
  $.ajax({
    url: "http://en.wikipedia.org/w/api.php",
    dataType: "jsonp",
    data: {
      'action': "query",
      'format': "json",
      "rnnamespace": "0",
      'list': "random",
    },
    success: function(data) {
      var randomPageUrl = "https://en.wikipedia.org/?curid=" + data.query.random[0].id;
      $('#random-page-url').attr("href", randomPageUrl);
      $('#random-page-url').get(0).click();
    }
  });
})

$("#clear-button").click(function() {
  $("#results-container").empty();
  $("h1").animate({
    marginTop: '160px'
  }, 1000);
  $(".searchbox").val('');
  lastSearch = '';
  didSelect = false;
})

function returnHtmlElement(title, desc, link) {
  var htmlElement = "<a style='text-decoration:none;' href='" + link + "' target='_blink'>";
  htmlElement += "<div class='panel panel-primary panel-custom'>";
  htmlElement += "<div class='panel-heading'>";
  htmlElement += "<h3 class='panel-title'><b>" + title + "</b></h3>";
  htmlElement += "</div>";
  htmlElement += "<div class='panel-body'>" + desc + "</div>";
  htmlElement += "</div></a>"

  return $(htmlElement);
}