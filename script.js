// Jikan API (GET)
const api = "https://api.jikan.moe/v4";

// Local storage for follow and watchlist
//let followed = JSON.parse(localStorage.getItem("followed")) || [];
//let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

// Hide all sections
function hideAllSections() {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
  });
}

// Attach event listeners to nav buttons
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    // Each button class matches a section
    const sectionClass = [...btn.classList].find(c =>
      ["top", "season", "calendar", "watchlist"].includes(c)
    );

    if (sectionClass) {
      hideAllSections();
      document.querySelector(`.section.${sectionClass}`).classList.add("active");
    }
  });
});

// Fetch Top Anime
async function fetchTopAnime() {
  let result = await axios.get(`${api}/top/anime?limit=6`);
  displayAnime(result.data.data, "top-anime");
}

// Display Anime Cards
function displayAnime(animeList, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  animeList.forEach((anime) => {
    let card = document.createElement("div");
    card.className = "anime-card";
    card.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h4>${anime.title}</h4>
      <p>Score: ${anime.score || "N/A"}</p>
      ${`
        <button class="add-btn follow-btn">Follow</button>
        <button class="add-btn watchlist-btn">Watchlist</button>
      `
      }
    `;
    container.appendChild(card);
  });
}

fetchTopAnime();