document.addEventListener("DOMContentLoaded", async () => {
  const awardsList = document.getElementById("awards-list");
  const projectsList = document.getElementById("projects-list");
  const successList = document.getElementById("success-list");

  if (!awardsList || !projectsList || !successList) return;

  try {
    const res = await fetch("http://localhost:5000/api/achievements");
    const achievements = await res.json();

    awardsList.innerHTML = "";
    projectsList.innerHTML = "";
    successList.innerHTML = "";
    

    achievements.forEach((a) => {
      const card = document.createElement("div");
      card.className = "card";
      if (a.imageUrl) {
        card.innerHTML += `<img src="${a.imageUrl}" alt="${a.title}" style="width:100%;max-height:180px;object-fit:cover;border-radius:10px;margin-bottom:12px;">`;
      }
      card.innerHTML += `<h3>${a.title}</h3><p>${a.description}</p>`;

      if (a.type === "award") awardsList.appendChild(card);
      else if (a.type === "project") projectsList.appendChild(card);
      else if (a.type === "story") successList.appendChild(card);
    });
  } catch (err) {
    awardsList.innerHTML =
      projectsList.innerHTML =
      successList.innerHTML =
        "<p>Failed to load achievements.</p>";
  }
});

// Navbar hamburger and side nav functionality (same as home.js)
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const sideNav = document.getElementById("sideNav");
  const sideNavOverlay = document.getElementById("sideNavOverlay");
  const sideNavCloseBtn = document.getElementById("sideNavCloseBtn");

  function openSideNav() {
    if (sideNav && sideNavOverlay) {
      sideNav.classList.add("open");
      sideNavOverlay.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  }

  function closeSideNav() {
    if (sideNav && sideNavOverlay) {
      sideNav.classList.remove("open");
      sideNavOverlay.style.display = "none";
      document.body.style.overflow = "";
    }
  }


  if (hamburgerBtn) hamburgerBtn.addEventListener("click", openSideNav);
  if (sideNavOverlay) sideNavOverlay.addEventListener("click", closeSideNav);
  if (sideNavCloseBtn) sideNavCloseBtn.addEventListener("click", closeSideNav);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSideNav();
  });
});
