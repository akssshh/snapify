var headers = document.getElementsByClassName('box');

function fadeOutOnScroll(elements) {
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    
    if (!element) {
      continue;
    }
  
    var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top - 40;
    var elementHeight = element.offsetHeight;
    var scrollTop = document.documentElement.scrollTop;
    
    var opacity = 1;
    
    if (scrollTop > distanceToTop) {
      opacity = 0.8 - (scrollTop - distanceToTop) / elementHeight;
    }
    
    if (opacity >= 0) {
      element.style.opacity = opacity;
    }
  }
}

function scrollHandler() {
  fadeOutOnScroll(headers);
}

window.addEventListener('scroll', scrollHandler);
