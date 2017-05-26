var queryURL = "";
var query = "";

$("#submit-query").click(function() {
  event.preventDefault();
  query = $('#query').val().trim();
  queryURL = "https://api.chucknorris.io/jokes/search?query=" + query;
  runAJAX();
})

function runAJAX() {
$.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function(response) {
    console.log(response.result[0]);
    $('.answer-p').html(response.result[0].value);
  });
}