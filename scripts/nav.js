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
  modeToggle = document.querySelectorAll(".dark-light"),
  searchToggle = document.querySelectorAll(".searchToggle"),
  sidebarOpen = document.querySelectorAll(".sidebarOpen"), 
  siderbarClose = document.querySelectorAll(".siderbarClose"); 

function toggleSidebar() {
  nav.classList.toggle("active");
}


sidebarOpen.forEach((element) => {
  element.addEventListener("click", (e) => {
    toggleSidebar();
    console.log("clicked");
    e.stopPropagation(); 
  });
});

siderbarClose.forEach((element) => {
  element.addEventListener("click", (e) => {
    toggleSidebar();
    e.stopPropagation(); 
  });
});

body.addEventListener("click", (e) => {
  // if (!nav.contains(e.target) && !sidebarOpen.contains(e.target)) {
  //   nav.classList.remove("active");
  // }
});


