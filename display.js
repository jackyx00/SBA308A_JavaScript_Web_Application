// Display all anime sections

// Local storage for follow and watchlist
//let followed = JSON.parse(localStorage.getItem("followed")) || [];
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

// Display Anime Cards in grid format
export function displayAnime(animeList, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  // Anime grid
  animeList.forEach((anime) => {
    let card = document.createElement("div");
    card.className = "anime-card";
    card.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h4>${anime.title}</h4>
      <p>Rating: ${anime.score || "N/A"}</p>
      ${`
        <button class="add-btn follow-btn">Follow</button>
        <button class="add-btn watchlist-btn">Watchlist</button>
      `}
    `;

    /*  
        Follow feature is similar to watchlist 
        but it is to remind user when anime next episode comes out. 
        Will try to complete the feature after due date.
    */
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

// Add to Watchlist Section
function addToWatchlist(id, title) {
  const exists = watchlist.find((a) => a.mal_id === id);
  if (exists) {
    alert(`${title} is already in your Watchlist!`);
    return;
  }
  if (!watchlist.find((a) => a.mal_id === id)) {
    watchlist.push({ mal_id: id, title });
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    updateWatchlist();
    console.log(JSON.parse(localStorage.getItem("watchlist")));
    alert(`${title} added to Watchlist!`);
  }
}

// Update Watchlist Section
export function updateWatchlist() {
  const list = document.getElementById("watchlist-list");
  list.innerHTML = "";
  watchlist.forEach((anime) => {
    let li = document.createElement("li");
    li.textContent = anime.title;
    let btn = document.createElement("button");
    btn.textContent = "❌";
    btn.style.margin = "5px";
    btn.addEventListener("click", () => removeWatchlist(anime.mal_id));
    li.appendChild(btn);
    list.appendChild(li);
  });
}

// Remove from Watchlist Section
function removeWatchlist(id) {
  watchlist = watchlist.filter((a) => a.mal_id !== id);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  updateWatchlist();
}