// Get the query parameter from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get('query');
console.log(query);

document.addEventListener("DOMContentLoaded", function() {
    const queryHeading = document.getElementById("query-heading");
    queryHeading.textContent = query;
});





