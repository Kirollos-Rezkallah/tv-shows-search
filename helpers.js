// helpers.js
function displayImages(shows) {
  const imageContainer = document.querySelector("#image-container");
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
