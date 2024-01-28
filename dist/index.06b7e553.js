document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.getElementById("nav");
    const mainContent = document.getElementById("main-content");
    window.addEventListener("scroll", function() {
        if (window.scrollY >= mainContent.offsetTop) navbar.classList.add("scroll");
        else navbar.classList.remove("scroll");
    });
});

//# sourceMappingURL=index.06b7e553.js.map
