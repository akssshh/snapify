const exploreBtn = document.getElementById("explore-button");
const homeBtn = document.getElementById("home-button");
const homeSection = document.getElementById("home-section");
const exploreSection = document.querySelector(".explore");

homeSection.style.display = "block";
exploreSection.style.display = "none";

exploreBtn.addEventListener("click", () => {
  homeSection.style.display = "none";
  exploreSection.style.display = "block";
});
