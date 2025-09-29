// Jikan API (GET)
const api = "https://api.jikan.moe/v4";

// Local storage for follow and watchlist
let followed = JSON.parse(localStorage.getItem("followed")) || [];
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

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
  });
});

// Fetch Top Anime for limit of 6 at the moment
async function fetchTopAnime() {
  let result = await axios.get(`${api}/top/anime?limit=6`);
  displayAnime(result.data.data, "top-anime");
  console.log(result.data.data);
}

// Display Anime Cards in grid
function displayAnime(animeList, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  // Anime grid
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
      `}
    `;
    // Follow button for calender
    // const followBtn = card.querySelector(".follow-btn");
    // followBtn.addEventListener("click", () => {
    //   addToFollowed(anime.mal_id, anime.title);
    // });

    // Watchlist button for watchlist
    const watchlistBtn = card.querySelector(".watchlist-btn");
    watchlistBtn.addEventListener("click", () => {
      addToWatchlist(anime.mal_id, anime.title);
    });
    container.appendChild(card);
  });
}

// Add to Follow list
// function addToFollowed(id, title) {
//   if (!followed.find((a) => a.mal_id === id)) {
//     followed.push({mal_id: id, title});
//     localStorage.setItem("followed", JSON.stringify(followed));
//     //update();
//     alert(`${title} added to Followed!`);
//   }
// }

// Add to Watchlist
function addToWatchlist(id, title) {
  if (!watchlist.find((a) => a.mal_id === id)) {
    watchlist.push({mal_id: id, title});
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    //update();
    console.log(JSON.parse(localStorage.getItem("watchlist")));
    alert(`${title} added to Watchlist!`);
  }
}

fetchTopAnime();
