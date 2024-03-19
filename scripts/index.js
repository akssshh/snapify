const imageWrapper = document.querySelector(".grid");
const searchInput = document.querySelector("#search-input");
const floatSearchInput = document.getElementById("float-search-input");
const searchButton = document.querySelector("#search-button");
const lightbox = document.querySelector(".lightbox");
const closeImgBtn = lightbox.querySelector(".close-icon");

const apiKey = "TtUUhp1lrnNSVzskUf6fQ3zSJEmTaJ_3MSDkbz5oDLQ";
let currentPage = 1;
let isFetching = false;
let hasMore = true;
let searchTerm = null;
let bookmarkedImages = [];

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

const showLightbox = ( name, img, profile) => {
  // Showing lightbox and setting img source, name and button attribute

  lightbox.querySelector(".main-img").src = img;
  lightbox.querySelector("span").innerText = name;
  lightbox.querySelector(".photographer_profile").src = profile;
  // downloadImgBtn.setAttribute("data-img", img);
  lightbox.classList.add("show");
  document.body.style.overflow = "hidden";
}

const hideLightbox = () => {
  // Hiding lightbox on close icon click
  lightbox.classList.remove("show");
  document.body.style.overflow = "auto";
}

closeImgBtn.addEventListener("click", hideLightbox); 

const generateHTML = (images) => {
  if (currentPage === 1) {
    imageWrapper.innerHTML = "";
  }

  imageWrapper.innerHTML += images

    .map((img) => {
      const isBookmarked = bookmarkedImages.includes(img.id);
      return `
        <div class="grid-item card" >
            <img onclick="showLightbox( '${img.user.name}', '${img.urls.regular}', '${img.user.profile_image.small}')" src="${img.urls.regular}" class="fetch-img" />

              <div class="icons top-icons">
                <button class="bookmark-btn ${
                  isBookmarked ? "bookmarked" : ""
                }" data-img-id="${img.id}" data-bookmarked="${isBookmarked}">
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
                    img.urls.small
                  }');" >
                    <i class="uil uil-import"></i>
                  </button>
                </div>
              </div>
        </div>
      `;
    })
    .join("");
  fixStartUpBug();

  searchInput.value = "";
  floatSearchInput.value = "";
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

    let images = [];

    if (data.results) {
      images = data.results;
    } else {
      images = data;
    }
    generateHTML(images);
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

imageWrapper.addEventListener("click", handleBookmark);


loadImages();

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    if (searchTerm) {
      loadImages(searchTerm);
      currentPage++;
    } else {
      loadImages();
      currentPage++;
    }
  }
};

window.addEventListener("scroll", handleScroll);
