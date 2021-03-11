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
      return (
        location.zip.match(regex) && location.geocoded_column_1 != undefined
      );
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
    const markers = [];
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    const request = await fetch("/api");
    const results = await request.json();

    form.addEventListener("submit", (event) => {
      const resultslist = document.querySelector(".resultslist");
      const matchArray = findMatches(search.value, results).slice(0, 5);
      if (matchArray.length < 1 || search.value.length < 1) {
        for (marker in markers) {
          mapObjectFromFunction.removeLayer(markers[marker]);
        }
        resultslist.innerHTML = `<p>No results found</p>`;
      } else {
        resultslist.innerHTML = ``;
        mapObjectFromFunction.panTo(
          new L.LatLng(
            matchArray[0].geocoded_column_1.coordinates[1],
            matchArray[0].geocoded_column_1.coordinates[0]
          )
        );
        for (marker in markers) {
          mapObjectFromFunction.removeLayer(markers[marker]);
        }
        for (value in matchArray) {
          const coords = matchArray[value].geocoded_column_1.coordinates;
          const marker = L.marker([coords[1], coords[0]]).addTo(
            mapObjectFromFunction
          );
          markers.push(marker);
          mapObjectFromFunction.addLayer(marker);
          const valueList = document.createElement("li");
          valueList.classList.add("block");
          valueList.innerHTML = `
            <div class="box has-background-primary-dark has-text-white ml-4"
              <li>
                  <div>
                    <span class="name">${matchArray[value].name}</span>
                  </div>
                  <div>
                    <span class="category">${matchArray[value].category}</span>
                  </div>
                  <div>
                    <span class="address">${toTitleCase(
                      matchArray[value].address_line_1
                    )}</span>
                  </div>
              </li>
            </div>
          `;
          resultslist.append(valueList);
        }
      }
    });
  }

  window.onload = windowActions();
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;
