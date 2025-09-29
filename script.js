// Jikan API
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

