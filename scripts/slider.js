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

  titles.forEach((title) => {
    const slide = document.createElement("div");
    slide.classList.add("slide");
    const heading = document.createElement("h4");
    heading.textContent = title;

    slide.addEventListener("click", () => {
      window.location.href = `search.html?query=${encodeURIComponent(title)}`;
    });

    slide.appendChild(heading);
    sliderContainer.appendChild(slide);
  });
}


displaySlides();

function prev() {
  document.getElementById("slider-container").scrollLeft -= 270;
}

function next() {
  document.getElementById("slider-container").scrollLeft += 270;
}
