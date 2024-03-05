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

const fixStartUpBug = () => {
  macyInstance.runOnImageLoad(function () {
    macyInstance.recalculate(true, true);
    var evt = document.createEvent("UIEvents");
    evt.initUIEvent("resize", true, false, window, 0);
    window.dispatchEvent(evt);
  }, true);
};

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
  // console.log(images)
  if (currentPage === 1) {
    imageWrapper.innerHTML = "";
  }

  imageWrapper.innerHTML += images

    .map(
      (img) =>
        `
        <div class="grid-item card" >
            <img src="${img.urls.small}" class="fetch-img" />

              <div class="icons top-icons">
                <button id="bookmark-btn" onclick="bookmarkImage('${img.id}')">
                  <i class="fas fa-bookmark"></i>
                </button>
              </div>
              <div class="details">
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
    // console.log(data);

    let images = [];

    if (data.results) {
      images = data.results;
    } else {
      images = data;
    }
    generateHTML(images);
    bookmarkImage(images);
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

const bookmarkImage = (imageId, images) => {
  console.log(imageId);
  const image = images.find((img) => img.id === imageId);
  console.log(image);
  if (image) {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    if (!bookmarks.some((b) => b.id === imageId)) {
      bookmarks.push(image);
      console.log("hello");
      console.log("Bookmarks:", bookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else {
      alert("Image already bookmarked!");
    }
  }
};

loadImages();

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadImages();
    currentPage++;
  }
};

window.addEventListener("scroll", handleScroll);

