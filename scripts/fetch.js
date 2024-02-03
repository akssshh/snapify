let currentPage = 1;
let isFetching = false;
let hasMore = true;

const grid = document.querySelector(".grid");

const macyInstance = Macy({
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

const fixStartUpBug = () => {
  macyInstance.runOnImageLoad(function () {
    macyInstance.recalculate(true, true);
    var evt = document.createEvent("UIEvents");
    evt.initUIEvent("resize", true, false, window, 0);
    window.dispatchEvent(evt);
  }, true);
};

const fetchData = async () => {
  if (isFetching || !hasMore) {
    return;
  }

  isFetching = true;

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos?client_id=12gZb1rLsA7rqFgAOuzVaj9Tyi1vpCmsoz1SLzgm_Os&page=${currentPage}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.length === 0) {
      hasMore = false;
      return;
    }

    for (let post of data) {
      let div = document.createElement("div");
      let img = document.createElement("img");
      img.src = post.urls.small;

      div.append(img);
      grid.append(div);
    }
    currentPage++;
    fixStartUpBug();
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isFetching = false;
  }
};

fetchData();

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    fetchData();
  }
};

window.addEventListener("scroll", handleScroll);


