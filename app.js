const randomButton = document.querySelector('#randomBtn');
randomButton.addEventListener('click', openRandomPage);
function openRandomPage() {
  window.open('https://en.wikipedia.org/wiki/Special:Random');
}
const resultsButton = document.querySelector('#resultsBtn');
resultsButton.addEventListener('click', displayResults);
function displayResults() {
  const resultsSection = document.querySelector('#showResults');
  resultsSection.innerHTML = '';
  const searchTerm = document.querySelector('#inputSearch').value;
  searchWikipedia(searchTerm);
  function searchWikipedia(term) {
    const searchQuery = term;
    let searchResults = [];
    const searchString = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${searchQuery}&srlimit=15&format=json`;
    fetch(searchString)
      .then(blob => blob.json())
      .then(data => searchResults = data.query.search)
      .then(searchResults => {
        searchResults.map(result => {
          const wikiEncode = encodeURI(result.title);
          resultsSection.innerHTML += `<dt><a href="https://en.wikipedia.org/wiki/${wikiEncode}" target="_blank">${result.title}</a></dt><dd>${result.snippet}...</dd>`;
        });
      }
    );
  }
}