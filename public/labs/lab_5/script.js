function findMatches(wordToMatch, results) {
  return results.filter((location) => {
    const regex = new RegExp(wordToMatch, "gi");
    return (
      location.zip.match(regex)
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
  const suggestions = document.querySelector(".suggestions");
  const form = document.querySelector(".form");

  const request = await fetch("/api");
  const results = await request.json();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  search.addEventListener("keyup", () => {
    const matchArray = findMatches(search.value, results);
    const html = matchArray
      .map((location) => {
        return `
        <div class="box is-half my-4 ml-4"
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
          </li>
        </div>
      `;
      })
      .join("");
    suggestions.innerHTML = html;
  });
}

window.onload = windowActions();

var mymap = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXJ5YW43IiwiYSI6ImNrbTExeGRkcjBlZmcycXF0YWxhazFtODQifQ.tJt9DSVEHtrGH3xuEUDfIw'
}).addTo(mymap);