<h1>Chuck Norris Project</h1>

Overall application concept & motivation for developement:
-----------------------------------------------------------------------
In a world of Dear Abby, Ask Amy, Dan Savage, Miss Manners, etc ..we realized there was something missing.  Scattered across the internet were bits of pieces of wisdom from the master of all things, but nowhere was there a centralized website that brought it all together.  So we created the Chuck Norris Life Advice Website. 

Design Process:
----------------------------------------------------------------------
Technologies used (briefly describing how they work)
HTML/CSS: 

Bootstrap:  as everyone is familiar with, Bootstrap is a framework that allows you to quickly create responsive websites.  

Sass:  "syntactically awesome stylesheets"  Sass that allows you to use some features that currently don't exist in CSS, while also writing code that is more readable.  One of the features we utlized in our application was variables.  Using the "$" sign, you can create a variable and value(s) to it.  

Example:  $font-stack: Helvetica, sans-serif;

body {
	font: $font-stack; 
} 

other features of Sass include nesting, operators, inheritance and more (that we didn't use in this application because we're new to Sass.) Sass files are interpreted into CSS files. 

Firebase:  Jokes from the 2 Chuck Norris APIs are stored in one Firebase Database, the Forum Posts are stored in another. Any new jokes submitted are also sent to the Firebase Database. 

ChuckNorris.io:  JSON API that retrieves either a random Chuck fact when it's called (can also be called by category) https://api.chucknorris.io/jokes/random?category={category}

ICNDb.com... the Internet Chuck Norris Database.  For this API, we pulled the collection of jokes into the Firebase Database.  

Joke Script (script.js): This script stores all of the stored jokes (over 2000 as of this writing) in an array (jokeStorage). When the user inputs a search term into the search, they are presented with a pertinent joke/fact that is related to what they typed in. In the small chance that nothing matches, a backup function will kick in that will present the user with a random joke/fact (for the sake of continuity). This script will also censor "bad" language as the text is run through a censor.

Adding Jokes (script.js): The above script also allows users to input their own joke, which will be automatically stored in jokeStorage. Users can input their own jokes into the database for the whole world to see. Jokes are available instantly after being added.

Giphy API: Pulls pertinent giphy images based on the subject chosen for the Chuck Norris Jokes.

Parser Script:  Commented out due to its potential to break the entire site. The parser script is only used a few times to retrieve jokes from API's and storages, and upload them to the Firebase Database. That is all.

Forum Script: Script dedicated to gathering information from the forum page, and sending it to the Firebase Database. Information is stored in the server. This is the one that will require the most follow up in the future, to allow users to sign in, reply to posts, etc. 


Demonstration of Application:
-----------------------------------------------------------------------
1.  Chuck Norris Life Advice - shows Chuck quote and GIFs (suggested: bird,men - try and stay away from 'women')
	a.) Good examples that are not too dirty: "Phone", "Grenade", "Food", "Heart", "Evolution"
	b.) To best show off the "Submit" functionality, add a joke containing the word "Teflon".
2.  Joke Submission
3.  Forum

Directions for future development:
-------------------------------------------------------------------------
1.  Add reply features to the forum posts
2.  Ratings/Censor feature (currently utilizes an array of words)