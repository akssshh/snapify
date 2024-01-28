document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const mainContent = document.getElementById('main-content');

    window.addEventListener('scroll', function() {
        if (window.scrollY > mainContent.offsetTop) {
            navbar.classList.add('scroll')
        } else {
            navbar.classList.remove('scroll')
        }
    })
})