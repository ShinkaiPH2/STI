document.addEventListener("DOMContentLoaded", () => {
  fetchAllHeroes();
  setupDragAndDrop();
  document.getElementById("reset-button").addEventListener("click", resetSlots);

  // Add search functionality
  const searchInput = document.getElementById('hero-search');
  searchInput.addEventListener('input', filterHeroes);

  function filterHeroes() {
    const query = searchInput.value.toLowerCase();
    const heroes = document.querySelectorAll('.hero');

    heroes.forEach(hero => {
      const heroNameElement = hero.querySelector('p');
      if (heroNameElement) {
        const heroName = heroNameElement.textContent.toLowerCase();
        if (heroName.includes(query)) {
          hero.style.display = 'block';
        } else {
          hero.style.display = 'none';
        }
      }
    });
  }
});

function fetchAllHeroes() {
  const lanes = {
    "1": "exp-lane",
    "2": "mid-lane",
    "3": "roam-lane",
    "4": "jungle-lane",
    "5": "gold-lane"
  };

  for (let heroId = 1; heroId <= 126; heroId++) {
    fetch("https://api.gms.moontontech.com/api/gms/source/2669606/2756564", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageSize: 20,
        filters: [{ field: "hero_id", operator: "eq", value: heroId }],
        sorts: [],
        pageIndex: 1,
        object: [],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const heroData = data.data.records[0].data.hero.data;
        const laneId = heroData.roadsort[0].data.road_sort_id;
        const lane = lanes[laneId];
        const laneDiv = document.getElementById(lane);

        const heroDiv = document.createElement("div");
        heroDiv.classList.add("hero");
        heroDiv.draggable = true;
        heroDiv.id = `hero-${heroId}`;
        heroDiv.innerHTML = `<img class="hero-img" src="${heroData.head}" alt="${heroData.name}" /><p class="hero-name">${heroData.name}</p>`;
        laneDiv.appendChild(heroDiv);

        // Prevent default drag behavior on the image
        const img = heroDiv.querySelector("img");
        img.addEventListener("dragstart", (e) => {
          e.preventDefault();
        });

        // Add drag event listeners to the newly created hero element
        heroDiv.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", e.target.id);
        });

        // Add click event listener to place the hero in the first available slot
        heroDiv.addEventListener("click", () => {
          placeHeroInSlot(heroDiv);
        });
      })
      .catch((error) => console.error("Error:", error));
  }
}

function setupDragAndDrop() {
  const slots = document.querySelectorAll(".slot");
  const banSlots = document.querySelectorAll(".ban-slot");

  slots.forEach((slot) => {
    slot.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    slot.addEventListener("drop", (e) => {
      e.preventDefault();
      const heroId = e.dataTransfer.getData("text/plain");
      const hero = document.getElementById(heroId);
      if (slot.children.length === 0) {
        const clone = hero.cloneNode(true);
        clone.id = `${heroId}-clone`;
        clone.querySelector("p").remove(); // Remove hero name
        const img = clone.querySelector("img");
        img.style.width = "100%"; // Adjust image size
        slot.appendChild(clone);
        disableHero(heroId);

        // Add click event listener to remove the hero from the slot
        clone.addEventListener("click", () => {
          slot.removeChild(clone);
          enableHero(heroId);
          filterHeroes(); // Reapply the search filter
        });
      }
    });
  });

  banSlots.forEach((banSlot) => {
    banSlot.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    banSlot.addEventListener("drop", (e) => {
      e.preventDefault();
      const heroId = e.dataTransfer.getData("text/plain");
      const hero = document.getElementById(heroId);
      if (banSlot.children.length < 5) {
        const clone = hero.cloneNode(true);
        clone.id = `${heroId}-clone`;
        clone.querySelector("p").remove(); // Remove hero name
        const img = clone.querySelector("img");
        img.style.width = "100%"; // Adjust image size
        banSlot.appendChild(clone);
        disableHero(heroId);

        // Add click event listener to remove the hero from the ban slot
        clone.addEventListener("click", () => {
          banSlot.removeChild(clone);
          enableHero(heroId);
          filterHeroes(); // Reapply the search filter
        });
      }
    });
  });
}

function placeHeroInSlot(hero) {
  const slots = document.querySelectorAll(".slot");
  for (const slot of slots) {
    if (slot.children.length === 0) {
      const clone = hero.cloneNode(true);
      clone.id = `${hero.id}-clone`;
      clone.querySelector("p").remove(); // Remove hero name
      const img = clone.querySelector("img");
      img.style.width = "100%"; // Adjust image size
      slot.appendChild(clone);
      disableHero(hero.id);

      // Add click event listener to remove the hero from the slot
      clone.addEventListener("click", () => {
        slot.removeChild(clone);
        enableHero(hero.id);
        filterHeroes(); // Reapply the search filter
      });
      break;
    }
  }
}

function enableHero(heroId) {
  const hero = document.getElementById(heroId);
  hero.classList.remove("disabled");
  hero.draggable = true;
}

function disableHero(heroId) {
  const hero = document.getElementById(heroId);
  hero.classList.add("disabled");
  hero.draggable = false;
}

function resetSlots() {
  const slots = document.querySelectorAll(".slot");
  const banSlots = document.querySelectorAll(".ban-slot");
  const lanes = document.querySelectorAll(".lane");

  slots.forEach((slot) => {
    while (slot.firstChild) {
      slot.removeChild(slot.firstChild);
    }
  });

  banSlots.forEach((banSlot) => {
    while (banSlot.firstChild) {
      banSlot.removeChild(banSlot.firstChild);
    }
  });

  lanes.forEach((lane) => {
    const heroes = lane.querySelectorAll(".hero");
    heroes.forEach((hero) => {
      hero.classList.remove("disabled");
      hero.draggable = true;
    });
  });

  // Reapply the search filter after resetting
  filterHeroes();
}   