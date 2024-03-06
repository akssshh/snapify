document.addEventListener("DOMContentLoaded", () => {
  const bookmarkedImagesContainer = document.querySelector(".grid");

  const loadBookmarksFromLocalStorage = () => {
    const bookmarks = localStorage.getItem("bookmarkedImages");
    if (bookmarks) {
      return JSON.parse(bookmarks);
    }
    return [];
  };

  const macyInstance = Macy({
    container: bookmarkedImagesContainer,
    margin: {
      x: 17,
      y: 17,
    },
    columns: 3,
    breakAt: {
      1600: 5,
      1500: 4,
      1200: 4,
      900: 3,
      600: 2,
      400: 1,
    },
  });

  const displayBookmarkedImages = async () => {
    const bookmarkedImages = loadBookmarksFromLocalStorage();
    bookmarkedImagesContainer.innerHTML = "";

    for (const imgId of bookmarkedImages) {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/${imgId}?client_id=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch image data");
        }
        const img = await response.json();

        bookmarkedImagesContainer.innerHTML += `
                  <div class="grid-item card" data-img-id="${img.id}">
                    <img src="${img.urls.small}" class="fetch-img" />

                    <div class="icons top-icons">
                    <button class="bookmark-btn" id="bookmarkBtn" >
                    <i class="uil uil-trash"></i>
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
                `;
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    }
    macyInstance.runOnImageLoad(() => {
      macyInstance.recalculate(true, true);
    });
  };

  displayBookmarkedImages();

  
  const handleBookmarkRemoval = (e) => {
    const button = e.target.closest(".bookmark-btn");
    if (button) {
      const gridItem = button.closest(".grid-item");
      const imgId = gridItem.getAttribute("data-img-id");
      
  
      const bookmarks = loadBookmarksFromLocalStorage();
      const updatedBookmarks = bookmarks.filter(id => id !== imgId);
      localStorage.setItem("bookmarkedImages", JSON.stringify(updatedBookmarks));
      
     
      gridItem.remove();

     
      macyInstance.recalculate(true, true);
    }
  };

  
  bookmarkedImagesContainer.addEventListener("click", handleBookmarkRemoval);
});
