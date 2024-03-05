document.addEventListener("DOMContentLoaded", () => {
    const bookmarkedImagesContainer = document.getElementById("bookmarked-images");

    const loadBookmarksFromLocalStorage = () => {
        const bookmarks = localStorage.getItem("bookmarkedImages");
        if (bookmarks) {
            return JSON.parse(bookmarks);
        }
        return [];
    };
    

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
                imgElement.innerHTML = `
                    <div class="grid-item">
                        <img src="${img.urls.small}" class="fetch-img" />
                    </div>
                `;
                bookmarkedImagesContainer.appendChild(imgElement);
            } catch (error) {
                console.error("Error fetching image data:", error);
            }
        }
    };
    

    displayBookmarkedImages();
});


