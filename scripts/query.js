// Get the query parameter from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get("query").toLowerCase();
const wrapper = document.querySelector(".grid");
const floatSearchInput = document.getElementById("float-search-input");

const searchButton = document.querySelector("#search-button");

let imageWrapper;

const apiKey = "_9ydOWriXTLwk3UTf5m7I0itKIjckOwQKzXrPYSAOvc";
let currentPage = 1;
let isFetching = false;
let hasMore = true;
let searchTerm = null;
let bookmarkedImages = [];

let macyInstance;

const fixStartUpBug = () => {
  macyInstance.runOnImageLoad(() => {
    macyInstance.recalculate(true, true);
    window.dispatchEvent(new Event("resize")); // Trigger window resize event
  }, true);
};

const generateHTML = (images) => {
  if (!imageWrapper) {
    console.error("imageWrapper is null or undefined");
    return; // Exit the function if imageWrapper is null
  }

  const htmlMarkup = images
    .map((img) => {
      const isBookmarked = bookmarkedImages.includes(img.id);
      return `
        <div class="grid-item card" >
            <img src="${img.urls.small}" class="fetch-img" />
                
              <div class="icons top-icons">
                <button class="bookmark-btn ${
                  isBookmarked ? "bookmarked" : ""
                }" data-img-id="${
        img.id
      }" data-bookmarked="${isBookmarked}" id="bookmarkBtn" >
                  <i class="${isBookmarked ? "fas" : "far"} fa-bookmark"></i>
                </button>
              </div>

            <div class="details">
                <div class="photographer">
                    <img src="${
                      img.user.profile_image.small
                    }" class="photographer_img" />
                    <span>${img.user.name}</span>
                </div>
                <div class="">
                <button class="download-btn" onclick="downloadImg('${
                  img.urls.full
                }');" >
                  <i class="uil uil-import"></i>
                </button>
              </div>
            </div>
          </div>
        `;
    })
    .join("");
  imageWrapper.innerHTML += htmlMarkup;

  fixStartUpBug();
};

document.addEventListener("DOMContentLoaded", function () {
  imageWrapper = document.querySelector(".grid");

  if (!imageWrapper) {
    console.error("Could not find .grid element in the DOM");
    return;
  }

  macyInstance = Macy({
    container: imageWrapper,
    breakAt: {
      1600: 5,
      1500: 4,
      1200: 4,
      900: 3,
      600: 2,
      400: 1,
    },
    margin: {
      x: 17,
      y: 17,
    },
  });

  loadImages(query);
});

const getImages = async (apiURL) => {
  try {
    const response = await fetch(apiURL, {
      headers: { Authorization: `Client-ID ${apiKey}` },
    });

    if (!response.ok) {
      throw new Error("Failed to load images!");
    }

    const data = await response.json();

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

const loadSearchImages = (searchTerm) => {
  let apiUrl = `https://api.unsplash.com/search/photos?client_id=${apiKey}&page=${currentPage}&query=${searchTerm}`;
  getImages(apiUrl);
};

const loadImages = (query) => {
  const apiUrl = `https://api.unsplash.com/search/photos?client_id=${apiKey}&page=${currentPage}&query=${query}`;
  getImages(apiUrl);
};

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

const saveBookmarksToLocalStorage = () => {
  localStorage.setItem("bookmarkedImages", JSON.stringify(bookmarkedImages));
};

const loadBookmarksFromLocalStorage = () => {
  const bookmarks = localStorage.getItem("bookmarkedImages");
  if (bookmarks) {
    bookmarkedImages = JSON.parse(bookmarks);
  }
};

loadBookmarksFromLocalStorage();

const handleBookmark = (e) => {
  const button = e.target.closest(".bookmark-btn");
  if (button) {
    const imgId = button.getAttribute("data-img-id");
    const isBookmarked = button.getAttribute("data-bookmarked");

    if (isBookmarked === "true") {
      const index = bookmarkedImages.indexOf(imgId);
      if (index !== -1) {
        bookmarkedImages.splice(index, 1);
      }
      button.setAttribute("data-bookmarked", "false");
      button.innerHTML = '<i class="far fa-bookmark"></i>';
    } else {
      bookmarkedImages.push(imgId);
      button.setAttribute("data-bookmarked", "true");
      button.innerHTML = '<i class="fas fa-bookmark"></i>';
    }

    saveBookmarksToLocalStorage();
  }
};

wrapper.addEventListener("click", handleBookmark);

searchButton.addEventListener("click", () => {
  const searchTerm = floatSearchInput.value;
  imageWrapper.innerHTML = "";
  currentPage = 1;
  loadSearchImages(searchTerm);
});


const handleScroll = () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    !isFetching &&
    hasMore
  ) {
    if (searchTerm) {
      loadSearchImages(searchTerm);
      
    } else {
      loadImages(query);
    }
    currentPage++;
  }
};

window.addEventListener("scroll", handleScroll);
