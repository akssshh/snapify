// Get the slide container and the array of car names
const sliderContainer = document.getElementById('slider-container');
const carNames = ['Cool Tones', 'Wallpapers', 'Nature', '3D Renders', 'Travel', 'Architecture & Interiors', 'Textures & Patterns', 'Street Photography', 'Film', 'Archival', 'Experimental', 'Animals', 'Fashion & Beauty', 'People', 'Spirituality', 'Business & Work', 'Food & Drink', 'Health & Wellness', 'Sports', 'Current Events'];

// Function to display the slides
function displaySlides() {
  // Clear the slider container
  sliderContainer.innerHTML = '';

  // Iterate over the car names array and create a slide for each
  carNames.forEach((carName) => {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    const heading = document.createElement('h4');
    heading.textContent = carName;
    slide.appendChild(heading);
    sliderContainer.appendChild(slide);
  });
}

// Call the displaySlides function to initially display the slides
displaySlides();


function prev(){
    document.getElementById('slider-container').scrollLeft -= 270;
}

function next()
{
    document.getElementById('slider-container').scrollLeft += 270;
}


