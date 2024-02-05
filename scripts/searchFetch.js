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

function search(event) {
  event.preventDefault();
  const value = document.getElementById("search-input").value;
  console.log(value);
  return value;
}

async function searchFetchData(event) {
  if (isFetch || !hasAny) {
    return;
  }

  isFetch = true;
  const value = search(event);
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?client_id=12gZb1rLsA7rqFgAOuzVaj9Tyi1vpCmsoz1SLzgm_Os&page=${currPage}&query=${value}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.results.length === 0) {
      hasAny = false;
      return;
    }

    data.results.forEach((post) => {
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
  } finally {
    isFetch = false;
  }
}

const handleScroll = (event) => {
  console.log("Scroll event fired!");
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    console.log("Calling searchFetchData...");
    searchFetchData(event)
  }
};


window.addEventListener("scroll", handleScroll);


