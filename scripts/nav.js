window.addEventListener('scroll', function() {
    let header = document.getElementById('header');
    let floatNav = document.getElementById('float-nav');

    let headerRect = header.getBoundingClientRect();
    if (headerRect.bottom <= 0) {
        floatNav.classList.add('active');
    } else {
        floatNav.classList.remove('active');
    }
});


const body = document.querySelector("body"),
  nav = document.querySelector("nav"),
  modeToggle = document.querySelector(".dark-light"),
  searchToggle = document.querySelector(".searchToggle"),
  sidebarOpen = document.querySelectorAll(".sidebarOpen"), // Select all elements with class sidebarOpen
  siderbarClose = document.querySelectorAll(".siderbarClose"); // Select all elements with class siderbarClose

// Function to toggle sidebar
function toggleSidebar() {
  nav.classList.toggle("active");
}

// Event listener for sidebarOpen elements
sidebarOpen.forEach((element) => {
  element.addEventListener("click", (e) => {
    toggleSidebar();
    console.log("clicked");
    e.stopPropagation(); // Prevents the event from bubbling up to the body
  });
});

// Event listener for siderbarClose elements
siderbarClose.forEach((element) => {
  element.addEventListener("click", (e) => {
    toggleSidebar();
    e.stopPropagation(); // Prevents the event from bubbling up to the body
  });
});

// Event listener for clicks outside of the menus to close them
body.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !sidebarOpen.contains(e.target)) {
    nav.classList.remove("active");
  }
});


