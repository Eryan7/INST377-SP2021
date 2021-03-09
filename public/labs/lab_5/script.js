function mapInit() {
  const mymap = L.map("mapid").setView([38.98, -76.93], 13);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiZXJ5YW43IiwiYSI6ImNrbTExeGRkcjBlZmcycXF0YWxhazFtODQifQ.tJt9DSVEHtrGH3xuEUDfIw",
    }
  ).addTo(mymap);
  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
  function findMatches(wordToMatch, results) {
    return results.filter((location) => {
      const regex = new RegExp(wordToMatch, "gi");
      return location.zip.match(regex) && location.geocoded_column_1 != undefined;
    });
  }

  //title case function from w3docs
  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  async function windowActions() {
    const search = document.querySelector("#search");
    const form = document.querySelector(".form");
    const resultslist = document.querySelector(".resultslist");

    const request = await fetch("/api");
    const results = await request.json();

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const matchArray = findMatches(search.value, results).slice(0,5);
      for (match in matchArray){
        const coords=matchArray[match].geocoded_column_1.coordinates
        const marker = L.marker([coords[1], coords[0]]).addTo(mapObjectFromFunction);
      }
      const html = matchArray
        .map((location) => {
          return `
          <div class="box"
            <li>
                <div>
                  <span class="name">${location.name}</span>
                </div>
                <div>
                  <span class="category">${location.category}</span>
                </div>
                <div>
                  <span class="address">${toTitleCase(
                    location.address_line_1
                  )}</span>
                </div>
                <div>
                  <span class="zip">${location.zip}</span>
                </div>
            </li>
          </div>
        `;
        })
        .join("");
      resultslist.innerHTML = html;
    });
  }

  window.onload = windowActions();
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;
