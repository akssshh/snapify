// Get the query parameter from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get("query").toLowerCase();
console.log("query from query.js" + query);

let imageWrapper; // Declare imageWrapper variable globally

const apiKey = "12gZb1rLsA7rqFgAOuzVaj9Tyi1vpCmsoz1SLzgm_Os";
let currentPage = 1;

// Define generateHTML function
const generateHTML = (images) => {
  if (!imageWrapper) {
    console.error("imageWrapper is null or undefined");
    return; // Exit the function if imageWrapper is null
  }

  console.log(images);

  // Map over the images array and generate HTML markup for each image
  const htmlMarkup = images.map(
    (img) =>
      `
      <div class="grid-item card">
          <img src="${img.urls.small}" class="fetch-img" />
      </div>
    `
  ).join("");
  imageWrapper.innerHTML = htmlMarkup;
};

document.addEventListener("DOMContentLoaded", function () {
  // Select the .card-container element
  imageWrapper = document.querySelector(".card-container");
console.log(imageWrapper);
  if (!imageWrapper) {
    console.error("Could not find .card-container element in the DOM");
    return; // Exit the event listener if imageWrapper is null
  }

  // Call the loadImages function inside DOMContentLoaded event
  loadImages(query);
});

// Call a function to fetch and display images based on the selected term
const getImages = async (apiURL) => {
  try {
    const response = await fetch(apiURL, {
      headers: { Authorization: `Client-ID ${apiKey}` },
    });

    if (!response.ok) {
      throw new Error("Failed to load images!");
    }

    const data = await response.json();
    console.log(data);

    let photos = [];

    if (data.results) {
      photos = data.results;
    } else {
      photos = data;
    }
    generateHTML(photos);
  } catch (error) {
    console.error(error);
  }
};

const loadImages = (query) => {
  console.log("query from load images" + query);
  const apiUrl = `https://api.unsplash.com/search/photos?client_id=${apiKey}&page=1&query=${query}`;
  getImages(apiUrl);
};


/*

// code before successful fetch

// Get the query parameter from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get("query").toLowerCase();
console.log("query from query.js" + query);

const imageWrapper;
const apiKey = "12gZb1rLsA7rqFgAOuzVaj9Tyi1vpCmsoz1SLzgm_Os";
let currentPage = 1;
// let isFetching = false;
// let hasMore = true;

const generateHTML = (images) => {
  console.log(images);


  // Map over the images array and generate HTML markup for each image
  const htmlMarkup = images.map(
    (img) =>
      `
      <div class="grid-item card">
          <img src="${img.urls.small}" class="fetch-img" />
      </div>
    `
  ).join("");
  imageWrapper.innerHTML = htmlMarkup;
  
};

document.addEventListener("DOMContentLoaded", function() {
  const imageWrapper = document.querySelector('.card-container');
  loadImages(query);
});






// Call a function to fetch and display images based on the selected term
const getImages = async (apiURL) => {
  try {
    const response = await fetch(apiURL, {
      headers: { Authorization: `Client-ID ${apiKey}` },
    });

    if (!response.ok) {
      throw new Error("Failed to load images!");
    }

    const data = await response.json();
    console.log(data);

    let photos = [];

    if (data.results) {
      photos = data.results;
    } else {
      photos = data;
    }
    generateHTML(photos);
  } catch (error) {
    console.error(error);
  }
};

const loadImages = (query) => {
  console.log("query from load images" + query);
  // currentPage++;
  const apiUrl = `https://api.unsplash.com/search/photos?client_id=${apiKey}&page=1&query=${query}`;
  getImages(apiUrl);
  // currentPage++;
};

// loadImages(query);

 */