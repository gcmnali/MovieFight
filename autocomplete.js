function createAutoComplete(side) {

    let sideAutoComplete = `#${side}-autocomplete`;
    let root = document.querySelector(sideAutoComplete);
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');
    

    // Delay the search input
    // List the movies in the dropdown menu after searching
    const input = root.querySelector('input');
    async function onInput(event) {
        const items = await fetchData(event.target.value);

        // Remove dropdown if there's no movie in the input
        if (!items.length) {
            dropdown.classList.remove('is-active');
            return;
        }

        // Activate dropdown menu
        dropdown.classList.add('is-active');

        resultsWrapper.innerHTML = "";
        // List the movies in the input
        for (let item of items) {
            const option = document.createElement('a');

            option.classList.add('dropdown-item')
            option.innerHTML = `<img src="${item.Poster === 'N/A' ? '' : item.Poster}" />${item.Title} (${item.Year})`;

            // Select the movie
            option.addEventListener('click', () => {
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

