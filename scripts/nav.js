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


