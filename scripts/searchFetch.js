let currPage = 1;
let isFetch = false;
let hasAny = true;

const grid = document.querySelector(".grid");

const macInstnce = Macy({
    container: grid,
    breakAt: {
      1600: 5,
      1200: 4,
      900: 3,
      600: 2,
      400: 1,
    },
    margin: {
      x: 15,
      y: 15,
    },
  });

const fixUpBug = () => {
  macInstnce.runOnImageLoad(function () {
    macInstnce.recalculate(true, true);
    var evt = document.createEvent("UIEvents");
    evt.initUIEvent("resize", true, false, window, 0);
    window.dispatchEvent(evt);
  }, true);
};


function search(event){
  event.preventDefault(); // Prevents form submission
  const value = document.getElementById("search-input").value;
  console.log(value);
  return value;
}


async function searchFetchData(event) {
  const value = search(event);
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?client_id=12gZb1rLsA7rqFgAOuzVaj9Tyi1vpCmsoz1SLzgm_Os&page=1&query=${value}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.results)

    if (data.results.length === 0) {
      hasAny = false;
      return;
    }

    data.results.forEach(post => {
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = post.urls.small;
    div.append(img);
    grid.append(div); 
  });

  currPage++;
  fixUpBug();
    
  } catch (error) {
    console.error("Error fetching data:", error);
  } 
};







