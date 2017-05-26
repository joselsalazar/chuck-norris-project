var queryURL = "https://api.chucknorris.io/jokes/random?query=";
var query = "";

$("#submit-query").click(function() {
  event.preventDefault();
  query = $('#query').val().trim();
  queryURL = "https://api.chucknorris.io/jokes/random?query=" + query;
  runAJAX();
})

function runAJAX() {
$.ajax({
    url: queryURL,
    method: "GET"
  })
  .done(function(response) {
    console.log(response);
    $('.answer-p').html(response.value);
  });
}