// Get the query parameter from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get("query").toLowerCase();
// console.log("query from query.js" + query);

let imageWrapper; // Declare imageWrapper variable globally

const apiKey = "12gZb1rLsA7rqFgAOuzVaj9Tyi1vpCmsoz1SLzgm_Os";
let currentPage = 1;
let isFetching = false;
let hasMore = true;
let searchTerm = null;

let macyInstance; // Declare Macy instance variable globally

const fixStartUpBug = () => {
  macyInstance.runOnImageLoad(() => {
    macyInstance.recalculate(true, true);
    window.dispatchEvent(new Event("resize")); // Trigger window resize event
  }, true);
};

// Define generateHTML function
const generateHTML = (images) => {
  if (!imageWrapper) {
    console.error("imageWrapper is null or undefined");
    return; // Exit the function if imageWrapper is null
  }

  console.log(images);

  // Map over the images array and generate HTML markup for each image
  const htmlMarkup = images
    .map(
      (img) =>
        `
      <div class="grid-item card" >
            <img src="${img.urls.small}" class="fetch-img" />
            <div class="details">
              <div class="icons top-icons">
                <button class="share-btn">
                  <i class="uil uil-share-alt"></i>
                </button>
              </div>
                <div class="photographer">
                    <img src="${img.user.profile_image.small}" class="photographer_img" />
                    <span>${img.user.name}</span>
                </div>
                <div class="">
                <button class="download-btn" onclick="downloadImg('${img.urls.small}');" >
                  <i class="uil uil-import"></i>
                </button>
              </div>
            </div>
        </div>
    `
    )
    .join("");

  imageWrapper.innerHTML += htmlMarkup;

  fixStartUpBug(); 
};

document.addEventListener("DOMContentLoaded", function () {

  imageWrapper = document.querySelector(".grid");


  if (!imageWrapper) {
    console.error("Could not find .grid element in the DOM");
    return; // Exit the event listener if imageWrapper is null
  }

  // Initialize Macy after DOMContentLoaded
  macyInstance = Macy({
    container: imageWrapper,
    columns: 3, // Number of columns for larger screens
    margin: {
      x: 15,
      y: 15,
    },
  });

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
  // console.log("query from load images" + query);
  const apiUrl = `https://api.unsplash.com/search/photos?client_id=${apiKey}&page=${currentPage}&query=${query}`;
  getImages(apiUrl);
};

// Function to download image
const downloadImg = (imgUrl) => {
  fetch(imgUrl)
    .then((res) => res.blob())
    .then((blob) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = new Date().getTime();
      a.click();
    })
    .catch(() => alert("Failed to download image!"));
};

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadImages(query);
    currentPage++;
  }
};

window.addEventListener("scroll", handleScroll);
