js-omdb-api-moviefight-app

Steps to take: 

CHECKING THE OMDB API

1) Sign up at omdbapi.com and get an api key.
2) Check the parameters to send the requests in the omdb site. You'll need it for the following steps.
3) You can use Axios to fetch the data. Link the Axios to the HTML file.
4) First make a simple request to check the api. Just use http://www.omdbapi.com link. You also have to enter two parameters, api key and a movie name to search. Then console.log() the response to see if the results come in.
5) Now just fetch only one movie, with a movie id in the results. See the detailed properties that come with an id search. You can find the detailed information for the request with the id in the API documentation.

SEARCHING THE API ON INPUT CHANGE

1) Go to the index.html file.
2) Make a container div under the Header section. That container will cover the entire application.
3) Make an input element into that container div. 
4) Select the input element in the index.js file.
5) Add an event listener to the input element, which gets the “event.target.value” as the argument of fetchData() function. In that way we will search the movie that is written into the input element.

DELAYING THE SEARCH INPUT

1) Since every keypress of the user fetches some data from the api, adding some delay by the search will drop off the work in the background.
2) To achieve this we'll place the Fetch Function into the setTimeout() method. 
3) First, make the onInput const and assign the fetchData(event.target.value) function to that const. Now we can use that const in the input’s event listener as an argument. 
4) In the onInput function, put the fetchData(event.target.value) function into the setTimeout() method. 

REARRANGING THE DELAY WITH DEBOUNCING

1) Now rearrange the onInput function with debouncing. 
2) Keep in mind that every time we call the setTimeout() method it comes with an integer. First call, second call etc. So we can clearTimeout() every setTimeout method with these integers using them like an ID. e.g clearTimeout(3).
3) After finishing the code, transfer the debounce function into another JS file called utils.js. Leave the Event Listener in the index.js. Just the debounce function... 
4) Don't forget to link the new JS file into the HTML file.

FILTERING THE DATA

1) When we search for a keyword, it comes with a lot of unnecessary data like ‘response’ data. But indeed we just need the ‘Search’ data for the App. 
2) In the fetchData function, remove console.log. Write a return statement: return response.data.Search
3) In the onInput function assign the fetchData function the movies const. 
4) Since the fetchData is an asynchronous function, we have to add async and await keywords to the function to avoid mistakes. 

RENDERING THE MOVIES

1) In the onInput function make a for…of loop that maps the movie of movies const. In the loop: 
2) In the loop, create a div element, assign it as ‘div’ constant. 
3) with .innerHTML put the image of a movie with an img tag. In the src attribute there will be a template literal, which shows “movie.Poster”.
4) Also add an h1 tag. Inside h1 tag place “movie.Title” with a template literal to show the title of a movie dynamically. 
5) In the index.html add a new div with the ‘target’ id under the input element. 
6) Select the target div in the index.js. appendChild() the div we wrote with the innerHTML to that new div. 
7) Now when we search for a movie we can list the movies with the posters and title of the movies. 

HANDLING THE ERROR RESPONSES

1) Even if we get the movies that are compatible with wer input, we get errors in the console for the inputs that don’t match with any movies. 
2) You can catch the errors with “response.data.Error”
3) So with an if conditional inside the fetchData() function, we can return an empty array [ ] if the response is response.data.Error.

OPENING A MENU

1) To make some style changes in the main page we can use Bulma CSS. 
2) Go to Bulma CSS page. (https://bulma.io/documentation/components/dropdown/)
3) We’ll use a similar dropdown in that application, but before that we have to reorganize wer index.html.
4) In the index.html file, clear the inside of the main container div. 
5) And add a new div inside the container div with an ‘autocomplete’ class. 
6) From now on we’ll select the new autocomplete file from wer index.js and we’ll add everything to wer index.html file via JavaScript.
7) Declare the ‘root’ const inside wer index.js under the fetchData() function. That const will select the autocomplete div in wer html file.
8) With .innerHTML write into root a label element “Search For a Movie”, an input element and the necessary divs and classes for Bulma CSS dropdown menu.
9) Under the input const add two more selector consts. 
10) Add the “dropdown” const, which selects the “dropdown” class. 
11) Add the “resultsWrapper” const, which selects the “results” class. 
12) Now to open a menu add the “is-active” class into the “.dropdown div”. That will be just above  the for..of loop inside the onInput() function.
13)  Turn back to the Bulma CSS document. To make each dropdown-item we have to create an <a> element. 
14) To list the movies, with a for loop we looped over the movies and created a div with the “div” constant. Now change the constant as “option”. And replace the ‘div’ element with an “a” element inside the createElement() method. Thus, we can create an <a> for each movie. 
15) Next, remove the <h1> tag around the movie.title which we wrote to the option with .innerHTML. Because  h1 is too big for the movie titles. 
16) Just above the option.innerHTML, add the “dropdown-item” class to the option div. 

HANDLING THE BROKEN IMAGES

1) Because of the Api data, the last movie image that we try to monitor in the search list doesn’t show up. The last movie data comes without an image. 
2) To fix that up we can add a ternary operator under the option const. 
3) If the “movie.Poster” comes with a response of “N/A” don’t show anything, else show the poster. 
4) Finally declare that ternary operator as a const. And replace it with the “movie.Poster” in the img source. 


CLOSING THE DROPDOWN AUTOMATICALLY

1) First of all we have to make sure that the user clicks somewhere outside the dropdown menu. 
2) When we click on an element in wer dev tools, we’ll see the “==$0” near that element. 
3) If we write $0 to wer console, we’ll monitor the element we selected in the dev tools. 
4) Go to the bottom of wer index.js, add a global event listener to the document object. So, when we click somewhere on the document we’ll get the event. You’ll get the element that is clicked. 
5) We just have to know whether the “root” element is clicked. Because it contains anything about the dropdown menu. 

HANDLING EMPTY MOVIES

1) When we search for a movie and then delete it from input, the dropdown menu stays still open. 
2) To hide the dropdown menu after deleting, in the onInput() function, write a simple conditional to check if there’s a movie in the coming data. If there’s no movie remove the dropdown, removing the ‘is-active’ class. 

HANDLING MOVIE SELECTION

1) After searching a movie, we want to select and render that movie in the main page. 
2) First of all, when we click a movie we have to hide the dropdown menu. To achieve this add an event listener to option div. When we click the option div, it must remove the “is-active” class to remove the dropdown menu. 
3) Assigning the “input.value” to the “movie.Title”, auto-complete the movie that the user searches for. 
4) Now we have to get the film the user has selected. 
5) To get the data of the relevant movie, we have to send a new request including the id of the movie. 
6) Not to tuck all the code inside the option event listener, add a new function which is called onMovieSelect(movie). It will get the “movie” argument. 
7) Now at the bottom of the index.js we can create this function. 

RENDERING THE SELECTED MOVIE

1) Render the selected movie with the help of Bulma CSS. 
2) Write a new function below the onMoviesSelect() function, which is called movieTemplate(movieDetail).
3) movieTemplate function will return the necessary html to render the selected movie. 
4) In the index.html add a  new div with the “summary” class just under the autocomplete div. 
5) You will inject the html we write with the movieTemplate here. 
6) Inside the onMovieSelect(), select the new summary div. With the help of the .innerHTML() method, inject the movieTemplate(response.data) function with the “response.data” argument inside the “summary div”. 
7) The Movie Template has to show the details of the film: poster, title, genre, pilot, awards, box-office, metascore, imdb rating, imdb votes. 

REFACTORING THE CODE TO MAKE IT REUSABLE

1) To make that code reusable for similar projects we can refactor wer code. 
2) In the index.js file can stay only some non-reusable code or the current project. 
3) You can make the autocomplete.js file to collect and refactor the reusable code for the similar projects. 
4) Create the autocomplete.js file. Link the file at the bottom of the index.html
5) Now we will transfer all reusable code inside the autocomplete.js file. 
6) Beginning from root const up to onMovieSelect() function, transfer all the code into autocomplete.js

REFACTORING-1: DISPLAYING MULTIPLE AUTOCOMPLETES

1) To make the code in autocomplete.js reusable, we have to change some parts of it first. 
2)  Cover all the code with a function which is called createAutoComplete(config). 
3) Whenever we call this function, we’re going to pass in some configuration object. And that config object is going to have all kinds of custom functions that specify how the autocomplete should work inside of wer specific application. So this config object is essentially where we put all of wer references to movies and how the movie should be rendered and what to do when one gets clicked and so on.
4) Normally, when all this code runs, it assumes that wer document is going to have a div element with a class of autocomplete.
5) Instead of trying to figure out what element we should be rendering inside of this reusable
function, we're going to accept “root” as a configurable property of the config object. (Argument of the function). 
6) With destructuring add ({root}) as the argument of the createAutoComplete() function. Thus, it will become a property of the “config” argument in the function.
7) Now that we defined the “root” element as a property of the config object, we no longer need a root const  that defines where the autocomplete has to render. So delete the root const. 
8) Below the root.innerHTML there are three selectors, which select some elements from the document. But now these selectors must select these elements from root, not from document. So change the “document” to the “root” as the resource.
8)  Go to the index.html and make one more autocomplete div. You will have 2 autocomplete divs in total. Give them different class names with numbers etc.
9) Eventually use the createAutoComplete function in the index.js just below the fetching response. 
10) Here we can use as many autocomplete functions as we can. You just have to edit the class name of the relevant div:
createAutoComplete({root: document.querySelector(“.autocomplete”)})

REFACTORING-2: EXTRACTING RENDERING LOGIC

1) For now we’ll just have one createAutoComplete() function in the inside.js. 
2) Add a new property to the argument of that function (“config” object): renderOption()
3) renderOption(movie) will take a “movie” object to render.
4) Now we’ll transfer some parts of the autocomplete.js. 
5) Cut the imgSrc const and paste into the renderOption() function. 
6) Then cut the html code in the option.innerHTML and return that code in renderOption() function.
7) Use the renderOption(movie) inside the autocomplete.js function as option.innerHTML.
8) Now we will be able to make all the changes, all the data we want to monitor within the renderOption() function. 

REFACTORING-3: EXTRACTING SELECTION LOGIC

1) To extract the option selection in autocomplete.js, we can just change the onMovieSelect() function. 
2) Change the onMovieSelect() function with onOptionSelect(movie). That name is better for the reusable part of the code.
3) Add the onOptionSelect() function into the creatAutoComplete(movie) as a new property. It will take the “movie” object as an argument. 
4) Finally write the onMovieSelect(movie) function inside that function. 
5) Now we will refactor the “input.value = movie.title” line in autocomplete.js
6) Add another helper function as the property of createAutoComplete() function which is called inputValue(movie). 
7) return movie.Title in that function. 
8) Write that function instead of movie.Title in autocomplete.js

REFACTORING-4: REMOVING MOVIE REFERENCES

1) Inside the autocomplete function we directly reference the fetchData() function. 
2) Inside the index.js cut the fetchData() function. Paste it into the createAutoComplete function as another property. 
3) Here remember to add async in front of the fetchData() function. 
4) The argument of the fetchData() function will be “searchTerm”
5) Now change all “movie” words inside the autocomplete.js with other appropriate keywords that seem reusable. (For example “item”)

REFACTORING-5: REFRESHING THE HTML STRUCTURE

1) We need two columns in our app so we need some changes in the index.html.
2) We need a right-autocomplete and left-autocomplete column. 
3) And a description under the columns which tells the user to choose 2 movies to compare. 

REFACTORING-6: AVOIDING DUPLICATION OF CONFIG

1) We need two autocomplete functions. One will use the right-autocomplete as the root and the other will use the left one. 
2) But to achieve that, we don’t need to duplicate the whole autocomplete function. Just some changes will be enough. 
3) Create the autoCompleteConfig object on top of the index.js file. 
4) Cut the whole code from the createAutoComplete() function except for the root selector. Paste the code into the new autoCompleteConfig const.
5) Now we can use the autoCompleteConfig object with a spread operator as a property of the createAutoComplete().
6) It will be enough for us to duplicate the createAutoComplete() function and change the selector. 

REFACTORING-7: SHOWING TWO SUMMARIES

1) Go to the index.html and add under left-autocomplete div a new div which has the “left-summary” id. Do the same thing for the right-autocomplete div. 
2) In the index.js, cut the onOptionSelect menu and paste into the “each” createAutoComplete() function we made before. So we can configure that function for each column. 
3) onMovieSelect() function is invoked inside the onOptionSelect function. We have to make changes in this function. Add each of the onMovieSelect() functions a new argument. That argument will select the left-summary div or the right-summary div from the index.html. 
4) Then go to the onMovieSelect() function in the index.js.  We have to add these new arguments to the arguments of the function. As an example we can add the new argument as “summaryElement”. 
5) Eventually we have to change the .innerHTML method at the end of the onMovieSelect() function. Because that part of the HTML doesn’t exist anymore. From now on the innerHTML has to write on the summaryElement argument which we defined in the onMovieSelect function. 
6) When a movie is selected, to hide the tutorial: Select the tutorial div and add the “is-hidden” class. That line of code has to be placed inside each onOptionSelect() function, above the onMovieSelect() function.

WHEN TO COMPARE TWO MOVIES

1) In the index.js file, just above the onMovieSelect() function declare two new variables: 
let leftMovie and let rightMovie
2) After fetching the data we have to store the right column’s movie into the rightMovie let. And the left column’s movie into the leftMovie let. 
3) Add the “side” argument to the onMovieSelect function. 
4) Under the .innerHTML method, write a simple if conditional, which shows if the “side” is left to store the data into the rightMovie let. And vice-versa. 
5) After that write a new if conditional, which runs the runComparison() function if the both “side” is rendering. 
6) Under that conditional make the runComparison() function. 

TRANSFORMING THE DATA INTO NUMBERS TO COMPARE

1) We’ll compare Awards, Box Offices, MetaScore, IMDB Rating, and the IMDB Votes of the movies. 
2) In the moviesTemplate, add the “data-value” property to each article which is relevant to these comparison criterias. 
3) The “data-value” property will help us compare the movies with numbers easily. 
4) For example, the runComparison() function will compare the data values of the first articles of two sides and decide to change the color of the article. 
5) The argument of the  movieTemplate function is “movieDetail”. This argument extends the details of the movies. 
6) We'll add some new consts on top of the movieTemplate function. These variables will be relevant to the movieDetail argument. 
7) And these consts will be the data-values of the articles. 
8) To be comparable, these consts have to include only numbers. So with the help of regular expressions,  replace(), parseInt(), parseFloat() methods we will turn each coming data into an integer. 
9) To sum up with an example, “const metascore” will transform the response.data of movieDetail.Metascore into an integer. 
10) Declare 4 different consts: “boxOffice”, “metascore”, “imdbRating” and “imdbVotes”. And transform the coming data into an integer. 
11) Next we have to compare the awards but the method must be different. 
12) Declare the “awards” constant under the imdbVotes. 
13) With the help of split(), reduce() and isNaN() methods turn the string into an integer.
14) Eventually we have to inject these consts as the data-values to the article properties as template literals. 
15) Now if we search for a movie, we can see the data values as integers on article elements in the dev tools.

COMPARING TWO MOVIES

1) Inside the runComparison() function declare two consts.
2) leftSideStats const will select the items which have a data-value property on the left column. And the rightSideStats const will deal with just the opposite. 
3) Here we have to iterate each side with forEach() method, then store the values into two new consts: leftSideValue and rightSideValue. 
4) And also remember: When we pull those values from the dataset, we need to parse them as integers.
4) With an if conditional we can compare the values, and we can change the Bulma CSS classes in HTML to change the color of the stats. 
