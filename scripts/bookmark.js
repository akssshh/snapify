document.addEventListener("DOMContentLoaded", () => {
    const bookmarkedImagesContainer = document.getElementById("home-section");

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
        columns: 3, // Set the number of columns as per your design
        breakAt: {
            1200: 3,
            900: 2,
            600: 1,
        },
    });

    const displayBookmarkedImages = async () => {
        const bookmarkedImages = loadBookmarksFromLocalStorage();
        bookmarkedImagesContainer.innerHTML = "";
    
        for (const imgId of bookmarkedImages) {
            try {
                const response = await fetch(`https://api.unsplash.com/photos/${imgId}?client_id=${apiKey}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch image data");
                }
                const img = await response.json();
    
                const imgElement = document.createElement("div");
                imgElement.classList.add("grid-item"); // Add the grid-item class
                imgElement.innerHTML = `
                    <img src="${img.urls.small}" class="fetch-img" />
                `;
                bookmarkedImagesContainer.appendChild(imgElement);
            } catch (error) {
                console.error("Error fetching image data:", error);
            }
        }
        macyInstance.runOnImageLoad(() => {
            macyInstance.recalculate(true, true);
        });
    };

    displayBookmarkedImages();
});
