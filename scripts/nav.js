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
      sidebarOpen = document.querySelector(".sidebarOpen"),
      siderbarClose = document.querySelector(".siderbarClose");

      


 
      
//   js code to toggle sidebar
sidebarOpen.addEventListener("click" , () =>{
    nav.classList.add("active");
});

body.addEventListener("click" , e =>{
    let clickedElm = e.target;

    if(!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")){
        nav.classList.remove("active");
    }
});

