// app.test.js
const axios = require("axios");
// const { displayImages } = require("../helpers"); // Adjust if needed based on your project structure

jest.mock("axios");

describe("TV Shows App", () => {
  // Test displayImages function
  test("displayImages should render images for shows with images", () => {
    document.body.innerHTML = `
      <div id="image-container"></div>
    `;

    const shows = [{ show: { image: { medium: "https://example.com/image1.jpg" } } }, { show: { image: { medium: "https://example.com/image2.jpg" } } }];

    displayImages(shows);

    const images = document.querySelectorAll("#image-container img");
    expect(images).toHaveLength(2);
    expect(images[0].src).toBe("https://example.com/image1.jpg");
    expect(images[1].src).toBe("https://example.com/image2.jpg");
  });

  test("displayImages should not render anything for shows without images", () => {
    document.body.innerHTML = `
      <div id="image-container"></div>
    `;

    const shows = [{ show: { image: null } }];

    displayImages(shows);

    const images = document.querySelectorAll("#image-container img");
    expect(images).toHaveLength(0);
  });

  // Test API request
  test("should call the API and return data", async () => {
    const mockData = { data: [{ show: { name: "Test Show", image: { medium: "https://example.com/test.jpg" } } }] };
    axios.get.mockResolvedValueOnce(mockData);

    const config = { params: { q: "test" } };
    const req = await axios.get("https://api.tvmaze.com/search/shows", config);

    expect(req).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith("https://api.tvmaze.com/search/shows", config);
  });
});
