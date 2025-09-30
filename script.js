import { displayAnime, updateWatchlist } from "./display.js";
import { searchByImage } from "./searchImg.js";
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
      ["top", "season", "calendar", "watchlist", "searchImg"].includes(c)
    );

    if (sectionClass) {
      hideAllSections();
      document
        .querySelector(`.section.${sectionClass}`)
        .classList.add("active");
    }

    if (sectionClass !== "searchImg") {
      const resultsDiv = document.getElementById("searchImg-results");
      const resultsInput = document.getElementById("searchImg-upload");
      resultsDiv.innerHTML = "";
      resultsInput.value = "";
    }
  });
});

// Fetch Top Anime for limit of 6 at the moment
async function fetchTopAnime() {
  try {
    let result = await axios.get(`${api}/top/anime?limit=6`);
    displayAnime(result.data.data, "top-anime");
  } catch (e) {
    console.error("Error fetching Top Anime:", e);
    const section = document.getElementById("top-anime");
    section.innerHTML =
      "<p>Failed to load top hit anime. Please try again later.</p>";
  }
}

// Upload Image for Trace Moe API search
document.getElementById("searchImg-upload").addEventListener("change", (e) => {
  if (e.target.files.length > 0) {
    searchByImage(e.target.files[0]);
  }
});

fetchTopAnime();
updateWatchlist();
