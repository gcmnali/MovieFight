// ******************************** COMPARE TWO MOVIES ******************************** //

let leftMovie;
let rightMovie;

// Fetch the selected movie
async function onMovieSelect(movie, summaryElement, side) {
  // now we are fetching detailed data about chosen movie
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'f3ea3c53',
      i: movie.imdbID
    }
  })
  // and we are creating our description
  summaryElement.innerHTML = movieTemplate(response.data);
  if (side === 'left') {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }
  // Start Comparison
  // when two movies are chosen we are comparing them
  if (leftMovie && rightMovie) {
    runComparison();
  }
  // Comparison
  function runComparison() {
    const leftSideStats = document.querySelectorAll('#left-summary .notification');
    const rightSideStats = document.querySelectorAll('#right-summary .notification');

    leftSideStats.forEach((leftStat, index) => {
      // for all information we are comparing 
      const rightStat = rightSideStats[index];
      const leftSideValue = parseInt(leftStat.dataset.value);
      const rightSideValue = parseInt(rightStat.dataset.value);

      // and we are changing the color of the info 
      // which is greater
      if (rightSideValue > leftSideValue) {
        leftStat.classList.remove('is-primary');
        leftStat.classList.add('is-warning');
      } else {
        rightStat.classList.remove('is-primary');
        rightStat.classList.add('is-warning');
      }
    });
  };
};

// Render the selected movie
function movieTemplate(movieDetail) {
  // Transform the data into numbers to easily compare
  const boxOffice = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
  const metascore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
  const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
    const value = parseInt(word);
    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);

  return `
   <article class="media">
     <figure class="media-left">
       <p class="image">
         <img src="${movieDetail.Poster}" />
       </p>
     </figure>
     <div class="media-content">
       <div class="content">
         <h1>${movieDetail.Title}</h1>
         <h4>${movieDetail.Genre}</h4>
         <p>${movieDetail.Plot}</p>
       </div>
     </div>
   </article>
   <article data-value=${awards} class="notification is-primary">
     <p class="title">${movieDetail.Awards}</p>
     <p class="subtitle">Awards</p>
   </article>
   <article data-value=${boxOffice} class="notification is-primary">
     <p class="title">${movieDetail.BoxOffice}</p>
     <p class="subtitle">Box Office</p>
   </article>
   <article data-value=${metascore} class="notification is-primary">
     <p class="title">${movieDetail.Metascore}</p>
     <p class="subtitle">Metascore</p>
   </article>
   <article data-value=${imdbRating} class="notification is-primary">
     <p class="title">${movieDetail.imdbRating}</p>
     <p class="subtitle">IMDB Rating</p>
   </article>
   <article data-value=${imdbVotes} class="notification is-primary">
     <p class="title">${movieDetail.imdbVotes}</p>
     <p class="subtitle">IMDB Votes</p>
   </article>
 `;
}

// 222222222222222222222222222222222222222222222222222222222222222222222222
// *************************** SEARCH DROPDOWN MENU *********************** //

function createAutoComplete(side) {

  let sideAutoComplete = `#${side}-autocomplete`;
  let root = document.querySelector(sideAutoComplete);
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');


  // Delay the search input
  // List the movies in the dropdown menu after searching
  const input = root.querySelector('input');

  // in every input(when user types something)
  // we fetch the possible options
  async function onInput(event) {
    const items = await fetchData(event.target.value);

    // Remove dropdown if there's no movie in the input
    if (!items.length) {
      dropdown.classList.remove('is-active');
      dropdown.classList.add('is-hidden');
      return;
    }

    // Activate dropdown menu
    dropdown.classList.remove('is-hidden');
    dropdown.classList.add('is-active');

    // before creating the list we are cleaning the list
    resultsWrapper.innerHTML = "";
    // List the movies in the input
    for (let item of items) {
      // we are creating html DOM elements for options
      // and putting them in the dropdown list
      const option = document.createElement('a');

      option.classList.add('dropdown-item')
      option.innerHTML = `<img src="${item.Poster === 'N/A' ? '' : item.Poster}" />${item.Title} (${item.Year})`;

      // Select the movie
      // we are adding click event to option
      option.addEventListener('click', () => {
        // when an option is clicked we are closing the dropdown
        dropdown.classList.remove('is-active');
        dropdown.classList.add('is-hidden');
        input.value = item.Title;

        // Hide the tutorial
        document.querySelector('.tutorial').classList.add('is-hidden')
        // Show the movie summary
        let sideSummary = `#${side}-summary`;
        onMovieSelect(item, document.querySelector(sideSummary), side);
      })
      resultsWrapper.appendChild(option);
    }
  };

  input.addEventListener('input', debounce(onInput, 500));

  // Close the dropdown if there's a click outside the dropdown
  document.addEventListener('click', event => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove('is-active')
      dropdown.classList.add('is-hidden');
    }
  });
}

async function fetchData(searchTerm) {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: 'f3ea3c53',
      s: searchTerm
    }
  });
  // Handle the error responses
  if (response.data.Error) {
    return [];
  }
  // Filter the response data to get only the info about movies
  return response.data.Search;
}

// Delay for the search

const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    // Pass the clearTimeout() at first time, use clearTimeout at second time
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

// 111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
// Activate the autocomplete for right and left columns
// We add search capabilities and a dropdown menu for search results to the both sides
createAutoComplete("left");
createAutoComplete("right");
