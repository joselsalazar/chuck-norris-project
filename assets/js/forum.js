// Initialize Firebase
var config = {
  apiKey: "AIzaSyD2WNoXwQQx_OWIi_fituHWbMCdo5OGc1Y",
  authDomain: "forum-posts-norris.firebaseapp.com",
  databaseURL: "https://forum-posts-norris.firebaseio.com",
  projectId: "forum-posts-norris",
  storageBucket: "forum-posts-norris.appspot.com",
  messagingSenderId: "1089739002370"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Variables (SET the first set IN FIREBASE FIRST)
// Note remember to create these same variables in Firebase!
var post = "";
var postTitle = "";
var userId = "";
var imgProfile = "";

// Clears Form Values
function emptyAll() {
  $('.post-style').find('input[type=text], textarea').val("");
}

// Click Button changes what is stored in firebase
function runPOST() {
  // Prevent the page from refreshing
  event.preventDefault();

  // Get inputs
  postTitle = $("#title-post").val().trim();
  post = $("#post").val().trim();
  imgProfile = $("#profile-img").val().trim();
  username = $("#username").val().trim();

  emptyAll();

  // Change what is saved in firebase
  database.ref("Chuck").push({
    postTitle: postTitle,
    post: post,
    imgProfile: imgProfile,
    username: username
  });
};

// Firebase is always watching for changes to the data.
// When changes occurs it will print them to console and html
database.ref("Chuck").on("child_added", function(snapshot, prevChildKey) {
  // Print the initial data to the console for troubleshooting.
  console.log(snapshot.val());
  // Add Divs From Snapshot Info
  var newPost = $("<div>");
  newPost.addClass("post-div group");
  var imgDiv = $("<div>");
  imgDiv.addClass("img-div col-md-2");
  imgDiv.append("<img src=" + snapshot.val().imgProfile + ">");
  imgDiv.append("<p>" + snapshot.val().username + "</p>");
  var contentDiv = $("<div>");
  contentDiv.addClass("content-div col-md-10");
  contentDiv.append("<h2>" + snapshot.val().postTitle + "</h2>");
  contentDiv.append("<p>" + snapshot.val().post + "</p>");

  newPost.append(imgDiv, contentDiv);

  var forumPost = $('.forum');
  forumPost.append(newPost);

  // If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// TO-DO 
