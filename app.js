// const { displayImages } = require("./helpers.js");
const form = document.querySelector("form");
const imageContainer = document.querySelector("#image-container");
const clearButton = document.querySelector("#clear");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const value = form.elements.query.value;
  const config = { params: { q: value } };
  const req = await axios.get(`https://api.tvmaze.com/search/shows`, config);
  displayImages(req.data);
  form.elements.query.value = "";
});

clearButton.addEventListener("click", function () {
  imageContainer.innerHTML = "";
});

function displayImages(shows) {
  imageContainer.innerHTML = "";
  for (let result of shows) {
    if (result.show.image) {
      const img = document.createElement("IMG");
      img.src = result.show.image.medium;
      imageContainer.append(img);
    }
  }
}

module.exports = { displayImages };
