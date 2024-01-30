const API_KEY = "12gZb1rLsA7rqFgAOuzVaj9Tyi1vpCmsoz1SLzgm_Os";

const API_URL = `https://api.unsplash.com/photos?client_id=${API_KEY}`;
const searchResluts = document.getElementById('main-content');

async function fetchPhotos() {
    
  const res = await fetch(API_URL);
  const data = await res.json();
  
  data.map((result) => {
    const imageWrapper = document.createElement('div')
    imageWrapper.classList.add("box")
    const image = document.createElement('img')
    image.src = result.urls.regular;
    image.alt = result.alt_description

    imageWrapper.appendChild(image);
    searchResluts.appendChild(imageWrapper);
  })


}
fetchPhotos(API_URL);
