// Initial Quote
$(document).ready(function() {
  var currentQuote = getQuote();
  $('.quote-text').text(currentQuote.quote);
  $('.quote-author').text("— " + currentQuote.author);
  updateTweetLink();
})

// Callback function for the button click
// Gets a new quote and updates the text
$('#new-button').click(function() {
  $('#twitter-url').trigger( "click" );
  currentQuote = getQuote();
  $('.quote-text').text(currentQuote.quote);
  $('.quote-author').text("— " + currentQuote.author);
  updateTweetLink();
});

// Function for making an ajax call to the API and returning the quote as a json object
var getQuote = function() {
  var answer;
  return $.ajax({
    type: "POST",
    beforeSend: function(request) {
      request.setRequestHeader("X-Mashape-Key", "UrUw1foeAxmshFPCw9NILLA1g6pSp1G6l2IjsneSvOnqOuW8oF");
      request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      request.setRequestHeader("Accept", "application/json");
    },
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/cat=famous",
    dataType: "json",
    async: false,
  }).responseJSON;
};

// Twitter button
// We bind a new event to our link
function updateTweetLink() {
  
  var quoteTweetURL =" https://twitter.com/intent/tweet?text=" + "\"" + $('.quote-text').text() + "\" " + $('.quote-author').text();

  //We get the title of the link
  $('#twitter-url').attr("href", quoteTweetURL);
  $('#twitter-url').trigger( "click" );
};