const imageWrapper = document.querySelector(".grid");
const searchInput = document.querySelector("#search-input");
const floatSearchInput = document.getElementById("float-search-input");
const searchButton = document.querySelector("#search-button");

const apiKey = "12gZb1rLsA7rqFgAOuzVaj9Tyi1vpCmsoz1SLzgm_Os";
let currentPage = 1;
let isFetching = false;
let hasMore = true;
let searchTerm = null;

const macyInstance = Macy({
  container: imageWrapper,
  breakAt: {
    1600: 5,
    1200: 4,
    900: 3,
    600: 2,
    400: 1,
  },
  margin: {
    x: 15,
    y: 15,
  },
});

const fixStartUpBug = () => {
  macyInstance.runOnImageLoad(function () {
    macyInstance.recalculate(true, true);
    var evt = document.createEvent("UIEvents");
    evt.initUIEvent("resize", true, false, window, 0);
    window.dispatchEvent(evt);
  }, true);
};

// function to display slider

const sliderContainer = document.getElementById("slider-container");

const titles = [
  "Cool Tones",
  "Wallpapers",
  "Nature",
  "3D Renders",
  "Travel",
  "Architecture & Interiors",
  "Textures & Patterns",
  "Street Photography",
  "Film",
  "Archival",
  "Experimental",
  "Animals",
  "Fashion & Beauty",
  "People",
  "Spirituality",
  "Business & Work",
  "Food & Drink",
  "Health & Wellness",
  "Sports",
  "Current Events",
];

// Function to display the slides
function displaySlides() {
  // Clear the slider container
  sliderContainer.innerHTML = "";

  // Iterate over the names array and create a slide for each
  titles.forEach((title) => {
    const slide = document.createElement("div");
    slide.classList.add("slide");
    const heading = document.createElement("h4");
    heading.textContent = title;

    slide.addEventListener("click", () => {
      currentPage = 1;
      loadImages(title);
    });

    slide.appendChild(heading);
    sliderContainer.appendChild(slide);
  });
}

// Call the displaySlides function to initially display the slides
displaySlides();

function prev() {
  document.getElementById("slider-container").scrollLeft -= 270;
}

function next() {
  document.getElementById("slider-container").scrollLeft += 270;
}

// function to download image

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

const generateHTML = (images) => {
  console.log(images)
  if (currentPage === 1) {
    imageWrapper.innerHTML = "";
  }

  imageWrapper.innerHTML += images
  
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
                    <i class="uil uil-camera"></i>
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
  fixStartUpBug();
};

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

const loadImages = (title) => {
  const searchTerm = title || searchInput.value || floatSearchInput.value;
  let apiUrl = `https://api.unsplash.com/photos?client_id=${apiKey}&page=${currentPage}`;
  apiUrl = searchTerm
    ? `https://api.unsplash.com/search/photos?client_id=${apiKey}&page=${currentPage}&query=${searchTerm}`
    : apiUrl;
  getImages(apiUrl);
  // currentPage++;
};

const loadSearchImages = (e) => {
  if (e.target.value === "") {
    searchTerm = null;
  } else {
    searchTerm = e.target.value;
  }

  if (e.key === "Enter") {
    currentPage = 1;
    searchTerm = e.target.value;
    imageWrapper.innerHTML = "";
    loadImages(searchTerm);
  }
};

searchInput.addEventListener("keyup", loadSearchImages);
floatSearchInput.addEventListener("keyup", loadSearchImages);

searchButton.addEventListener("click", () => {
  imageWrapper.innerHTML = "";
  loadImages();
});

loadImages();

const handleScroll = () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight &&
    searchTerm // Ensure searchTerm is not null
  ) {
    loadImages(); // Fetch more images based on the current search term
    currentPage++;
  }
};

window.addEventListener("scroll", handleScroll);

