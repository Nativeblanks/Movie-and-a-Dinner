/*
    ----------------------------------------------------------------------
        Global Variables
    ----------------------------------------------------------------------        
*/
var movieContainer = document.querySelector("#movieContainer");
var myAPIKey = "5bbccf1e86523e36a180ef066939c475";

var movieDivContainer;
var inputElement;

const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

get_meal_btn.addEventListener('click', () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(response => {
    createMeal(response.meals[0]);
  });
});

const createMeal = (meal) => {
  const ingredients = [];
  // Get all ingredients from the object. Up to 20
  for(let i=1; i<=20; i++) {
    if(meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
    } else {
      // Stop if no more ingredients
      break;
    }
  }
  
  const newInnerHTML = `
    <div class="row">
      <div class="column">
        <img class="mealImg" src="${meal.strMealThumb}" alt="Meal">
        <div>
        ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
        ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
        <h5>Ingredients:</h5>
       </div>
       <div>
        <ul>
          ${ingredients.map(ingredient => `
          <li>${ingredient}</li>`).join('')}
        </ul>
        </div>
      </div>
      <div class="column">
        <h5>${meal.strMeal}</h5>
        <br>
        <p>${meal.strInstructions}</p>
      </div>
    </div>
    ${meal.strYoutube ? `
    <div class="row">
      <h5>Video Recipe</h5>
      <div class="videoYT">
        <iframe width="420" height="315"
        src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
        </iframe>
      </div>
    </div>` : ''}
  `;
  
  meal_container.innerHTML = newInnerHTML;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/*
  ----------------------------------------------------------------------
      Build Movie Buttons
  ----------------------------------------------------------------------
*/
function initializeMovieContainer () {
  movieContainer.innerHTML = "";

  // columns
  movieDivContainer = document.createElement("div");
  movieDivContainer.className = "columns";
  movieContainer.appendChild(movieDivContainer);

  // column
  var divElement = document.createElement("div");
  divElement.className = "column";
  movieContainer.appendChild(divElement);

  // add button - Start Over
  var btnElement = document.createElement("button");
  btnElement.className = "button is-primary is-rounder";
  btnElement.id = "idButtonMovie"
  btnElement.setAttribute("data-movieId", "startOver");
  btnElement.textContent = "Start Over";
  divElement.appendChild(btnElement);    

  // column
  var divElement = document.createElement("div");
  divElement.className = "column";
  movieDivContainer.appendChild(divElement);

  // add button - Random
  var btnElement = document.createElement("button");
  btnElement.className = "button is-primary is-rounder";
  btnElement.id = "idButtonMovie"
  btnElement.setAttribute("data-movieId", "random");
  btnElement.textContent = "Random";
  divElement.appendChild(btnElement);    

  // column
  var divElement = document.createElement("div");
  divElement.className = "column";
  movieDivContainer.appendChild(divElement);

  // add button - Trending
  var btnElement = document.createElement("button");
  btnElement.className = "button is-primary is-rounder";
  btnElement.id = "idButtonMovie"
  btnElement.setAttribute("data-movieId", "trending");
  btnElement.textContent = "Trending";
  divElement.appendChild(btnElement);    

  // column
  var divElement = document.createElement("div");
  divElement.className = "column";
  movieDivContainer.appendChild(divElement);

  // add button - Genres
  var btnElement = document.createElement("button");
  btnElement.className = "button is-primary is-rounder";
  btnElement.id = "idButtonMovie"
  btnElement.setAttribute("data-movieId", "genre");
  btnElement.textContent = "Genres";
  divElement.appendChild(btnElement);    

  // column
  var divElement = document.createElement("div");
  divElement.className = "column";
  movieDivContainer.appendChild(divElement);
  
  // add button - Random
  var btnElement = document.createElement("button");
  btnElement.className = "button is-primary is-rounder";
  btnElement.id = "idButtonMovie"
  btnElement.setAttribute("data-movieId", "advanced");
  btnElement.textContent = "Search";
  divElement.appendChild(btnElement);    
}

/*
  ----------------------------------------------------------------------
      Build Start Over Button
  ----------------------------------------------------------------------
*/
function startOverButton () {
  // column
  var divElement = document.createElement("div");
  divElement.className = "column";
  movieContainer.appendChild(divElement);

  // add button - Start Over
  var btnElement = document.createElement("button");
  btnElement.className = "button is-primary is-rounder";
  btnElement.id = "idButtonMovie"
  btnElement.setAttribute("data-movieId", "startOver");
  btnElement.textContent = "Start Over";
  divElement.appendChild(btnElement);    
}

/*
  ----------------------------------------------------------------------
      Build a Bulma Card based on the movie details.
  ----------------------------------------------------------------------    
*/
var displayCard = function(myMovie) {
  
  //console.log(myMovie);
  
  // card
  movieCardContainer = document.createElement("div");
  movieCardContainer.className = "card";
  movieContainer.appendChild(movieCardContainer);

  // media
  movieMediaContainer = document.createElement("div");
  movieMediaContainer.className = "media";
  movieCardContainer.appendChild(movieMediaContainer);

  // media-left
  movieMediaLeftContainer = document.createElement("div");
  movieMediaLeftContainer.className = "media-left";
  movieMediaContainer.appendChild(movieMediaLeftContainer);

  // figure
  movieFigureContainer = document.createElement("figure");
  movieFigureContainer.className = "media";
  movieMediaLeftContainer.appendChild(movieFigureContainer);

  if (myMovie.poster_path !== null) {
      // img - Display Poster
      var imgElement = document.createElement("img");
      imgElement.className = "";
      imgElement.src = "https://image.tmdb.org/t/p/w185" + myMovie.poster_path;
      movieFigureContainer.appendChild(imgElement);
  }

  // column
  movieMediaContentContainer = document.createElement("div");
  movieMediaContentContainer.className = "media-content";
  movieCardContainer.appendChild(movieMediaContentContainer);

  // p - Title
  // card-header-title
  if (myMovie.title === undefined) {
      myTitle = myMovie.original_name;
  } else {
      myTitle = myMovie.title;
  }

  var pElement = document.createElement("p");
  pElement.className = "title is-4";
  pElement.textContent = myTitle;
  movieMediaContentContainer.appendChild(pElement);

  // p - Display Year
  var pElement = document.createElement("p");
  pElement.className = "subtitle is-6";
  pElement.textContent = "Release Date: " + myMovie.release_date;
  movieMediaContentContainer.appendChild(pElement);

  // Content - Movie Overview
  var divElement = document.createElement("div");
  divElement.className = "content medium-text";
  divElement.textContent = myMovie.overview;
  movieMediaContentContainer.appendChild(divElement);

  // Content - Movie Overview
  var pElement = document.createElement("p");
  pElement.className = "content small-text";
  pElement.textContent = "id: " + myMovie.id;
  movieMediaContentContainer.appendChild(pElement);
}

/*
  ----------------------------------------------------------------------
      API Fetch to Movie
  ----------------------------------------------------------------------
*/
var getRandomMovie = function(myRandomNumber) 
{
  var myAPIURL = "https://api.themoviedb.org/3/movie/" + myRandomNumber + "?api_key=" + myAPIKey;

  fetch(myAPIURL).then(function(myResponse) 
  {
      if (myResponse.ok) 
      {
          myResponse.json().then(function(aryMovie) 
          {
              movieContainer.innerHTML = "";
              startOverButton();                 

              if (aryMovie.adult != 0) {
                  myRandomNumber = getRandomInt(873382);
                  getRandomMovie(myRandomNumber);
              }

              myMovie = aryMovie;
              displayCard(myMovie);
          })
      } 
      else 
      {
          myRandomNumber = getRandomInt(873382);
          getRandomMovie(myRandomNumber);
      }
  });
}

var getTrendingMovies = function() {
  var myAPIURL = "https://api.themoviedb.org/3/trending/all/day?api_key=" + myAPIKey;

  fetch(myAPIURL).then(function(myResponse) 
  {
      if (myResponse.ok) 
      {
          myResponse.json().then(function(aryMovie) 
          {
              movieContainer.innerHTML = "";
              startOverButton();

              for (index = 0; index <= 20; index++) {
                  myMovie = aryMovie.results[index];
                  displayCard(myMovie);
              }
          })
      }
      else
      {
          alert("Error: Something went wrong.");
      }
  });
}

var getGenres = function() {
  var myAPIURL = "https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=" + myAPIKey;

  fetch(myAPIURL).then(function(myResponse) 
  {
      if (myResponse.ok) 
      {
          myResponse.json().then(function(aryMovie) 
          {
              movieContainer.innerHTML = "";
              startOverButton();
              
              // card
              movieCardContainer = document.createElement("div");
              movieCardContainer.className = "columns";
              movieContainer.appendChild(movieCardContainer);

              for (index=0; index < aryMovie.genres.length; index++) {
                  // card
                  buttonElement = document.createElement("button");
                  buttonElement.className = "button is-primary is-outlined";
                  buttonElement.id = "idGenre";
                  buttonElement.setAttribute("data-genreId", aryMovie.genres[index].id);
                  buttonElement.textContent = aryMovie.genres[index].name;
                  movieContainer.appendChild(buttonElement);
              }

          })
      }
      else
      {
          alert("Error: Something went wrong.");
      }
  });
}

var getGenreMovies = function(myGenreId) {
  var myAPIURL = "https://api.themoviedb.org/3/discover/movie?&api_key=" + myAPIKey + "&with_genres=" + myGenreId;    

  fetch(myAPIURL).then(function(myResponse) 
  {
      if (myResponse.ok) 
      {
          myResponse.json().then(function(aryMovie) 
          {
              movieContainer.innerHTML = "";
              startOverButton();

              for (index = 0; index <= 20; index++) {
                  myMovie = aryMovie.results[index];
                  displayCard(myMovie);
              }
          })
      }
      else
      {
          alert("Error: Something went wrong.");
      }
  });
}

var getActorId = function(myActor) {
  var myAPIURL = "https://api.themoviedb.org/3/search/person?&api_key=" + myAPIKey + "&query=" + myActor;    

  console.log(myActor);

  fetch(myAPIURL).then(function(myResponse) 
  {
      if (myResponse.ok) 
      {
          myResponse.json().then(function(aryMovie) 
          {
              var myAPIURL = "https://api.themoviedb.org/3/discover/movie?&api_key=" + myAPIKey + "&with_cast=" + aryMovie.results[0].id + "&sort_by=vote_average.desc";    

              fetch(myAPIURL).then(function(myResponse) 
              {
                  if (myResponse.ok) 
                  {
                      myResponse.json().then(function(aryMovie) 
                      {
                          movieContainer.innerHTML = "";

                          console.log(aryMovie.results[0].id);
                          if (myActor === 'Chuck Norris') {
                            ChuckNorris();
                          }
                          
                          startOverButton();
          
                          for (index = 0; index < aryMovie.results.length; index++) {
                              myMovie = aryMovie.results[index];
                              displayCard(myMovie);
                          }
                      })
                  }
                  else
                  {
                      alert("Error: Something went wrong.");
                  }
              });
          })
      }
      else
      {
          alert("Error: Something went wrong.");
      }
  });
}

var searchMovies = function() {
  console.log("search movies");
  movieContainer.innerHTML = "";

  // columns
  movieDivContainer = document.createElement("div");
  movieContainer.appendChild(movieDivContainer);

  // label
  labelElement = document.createElement("label");
  labelElement.textContent = "Enter an actor/actress:"
  movieDivContainer.appendChild(labelElement);

  // input
  inputElement = document.createElement("input");
  inputElement.id = "idSearch";
  movieDivContainer.appendChild(inputElement);

  // button
  buttonElement = document.createElement("button");
  buttonElement.className = "button is-primary";
  buttonElement.textContent = "Search";
  buttonElement.setAttribute("data-search", "0");    
  movieContainer.appendChild(buttonElement);
}

var getActorMovies = function(myActorId) {
  console.log("getActorMovies" + myActorId);
  var myAPIURL = "https://api.themoviedb.org/3/discover/movie?&api_key=" + myAPIKey + "&with_cast=" + myActorId + "&sort_by=vote_average.desc";    

  fetch(myAPIURL).then(function(myResponse) 
  {
      if (myResponse.ok) 
      {
          myResponse.json().then(function(aryMovie) 
          {
              movieContainer.innerHTML = "";
              startOverButton();

              for (index = 0; index < aryMovie.results.length; index++) {
                  myMovie = aryMovie.results[index];
                  displayCard(myMovie);
              }
          })
      }
      else
      {
          alert("Error: Something went wrong.");
      }
  });
}

function ChuckNorris() {
  var myAPIURL = "https://api.chucknorris.io/jokes/random";

  fetch(myAPIURL).then(function(myResponse) {
    if (myResponse.ok) {
      myResponse.json().then(function(chuckJoke)
      {
          // card
          divContainer = document.createElement("div");
          movieContainer.appendChild(divContainer);

          // h1 - chuck joke
          h1Element = document.createElement("h1");
          h1Element.className = "chuck";
          h1Element.textContent = chuckJoke.value;
          divContainer.appendChild(h1Element);
      })
    }
  });
}

// Get City Button Click Handler
var buttonClickHandler = function(event) {
  console.log(event);

  var myMovieButton  = event.target.getAttribute("data-movieId");
  var myGenreButton  = event.target.getAttribute("data-genreId");    
  var mySearchButton = event.target.getAttribute("data-search");        

  if (myMovieButton !== null) {
      if (myMovieButton === 'startOver') {
          initializeMovieContainer();
      } else if (myMovieButton === 'random') {
          myRandomNumber = getRandomInt(873382);
          console.log(myRandomNumber);
          getRandomMovie(myRandomNumber);
      } else if (myMovieButton === 'trending') {
          getTrendingMovies();
      } else if (myMovieButton === 'genre') {
          getGenres();
      } else {
          searchMovies();
      }
  }

  if (myGenreButton !== null) {
      getGenreMovies(myGenreButton);
  }

  if (mySearchButton !== null) {
    var myActor = document.getElementById("idSearch").value;
    if (myActor !== '') {
      getActorId(document.getElementById("idSearch").value);
    }
  }

}

initializeMovieContainer();

movieContainer.addEventListener("click", buttonClickHandler);