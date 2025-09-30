import { displayAnime, updateWatchlist } from "./display.js";
// Jikan API (GET)
const api = "https://api.jikan.moe/v4";

// Hide all sections
function hideAllSections() {
  document.querySelectorAll(".section").forEach((sec) => {
    sec.classList.remove("active");
  });
}

// Attach event listeners to nav buttons
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Each button class matches a section
    const sectionClass = [...btn.classList].find((c) =>
      ["top", "season", "calendar", "watchlist"].includes(c)
    );

    if (sectionClass) {
      hideAllSections();
      document
        .querySelector(`.section.${sectionClass}`)
        .classList.add("active");
    }
    if (sectionClass === "watchlist") {
      updateWatchlist();
    }
  });
});

// Fetch Top Anime for limit of 6 at the moment
async function fetchTopAnime() {
  let result = await axios.get(`${api}/top/anime?limit=6`);
  displayAnime(result.data.data, "top-anime");
  console.log(result.data.data);
}

fetchTopAnime();
