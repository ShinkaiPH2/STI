function fetchHeroDetails() {
  const heroId = document.getElementById("hero-id-input").value;
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
      console.log("API Response:", data); // Log the entire response

      const heroData = data.data.records[0].data.hero.data;
      const relationData = data.data.records[0].data.relation;
      console.log("Hero Data:", heroData); // Log the hero data
      console.log("Relation Data:", relationData); // Log the relation data

      document.getElementById("hero-image").src = heroData.head;
      document.getElementById("hero-name").textContent = heroData.name;
      document.getElementById("hero-difficulty").value = heroData.difficulty;
      document.getElementById("hero-story").textContent = heroData.story;

      const skillsContainer = document.getElementById("hero-skills");
      skillsContainer.innerHTML = "";
      heroData.heroskilllist[0].skilllist.forEach((skill) => {
        const skillDiv = document.createElement("div");
        skillDiv.innerHTML = `<img src="${skill.skillicon}" alt="${skill.skillname}"><span>${skill.skillname}: ${skill.skilldesc}</span>`;
        skillsContainer.appendChild(skillDiv);
      });

      const equipmentsContainer = document.getElementById("hero-equipments");
      equipmentsContainer.innerHTML = "";
      heroData.recommendmasterplan[0].equiplist.forEach((equip) => {
        const equipDiv = document.createElement("div");
        equipDiv.innerHTML = `<img src="${equip.equipicon}" alt="${equip.equipname}"><span>${equip.equipname}: ${equip.equiptips}</span>`;
        equipmentsContainer.appendChild(equipDiv);
      });

      const recommendMasterPlanContainer = document.getElementById(
        "recommend-master-plan"
      );
      recommendMasterPlanContainer.innerHTML = "";
      heroData.recommendmasterplan.forEach((plan) => {
        const planDiv = document.createElement("div");
        planDiv.innerHTML = `
                        <h3>${plan.description}</h3>
                        <div>
                            <img src="${plan.battleskill.__data.skillicon}" alt="${plan.battleskill.__data.skillname}">
                            <span>${plan.battleskill.__data.skillname}: ${plan.battleskill.__data.skilldesc}</span>
                        </div>
                        <div>
                            <img src="${plan.emblemplan.emblemplan.attriicon}" alt="${plan.emblemplan.emblemplan.emblemname}">
                            <span>${plan.emblemplan.emblemplan.emblemname}: ${plan.emblemplan.emblemplan.emblemattr.emblemattr}</span>
                        </div>
                    `;
        recommendMasterPlanContainer.appendChild(planDiv);
      });

      const relationsContainer = document.getElementById("hero-relations");
      relationsContainer.innerHTML = "";

      const createRelationDiv = (title, heroes, description) => {
        const relationDiv = document.createElement("div");
        relationDiv.classList.add("relation-section");
        relationDiv.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        const heroesContainer = document.createElement("div");
        heroesContainer.classList.add("relation-heroes");
        heroes.forEach((hero) => {
          if (hero.data) {
            const heroDiv = document.createElement("div");
            heroDiv.classList.add("relation-hero");
            heroDiv.innerHTML = `<img src="${hero.data.head}" alt="Hero"><span>${title}</span>`;
            heroesContainer.appendChild(heroDiv);
          }
        });
        relationDiv.appendChild(heroesContainer);
        relationsContainer.appendChild(relationDiv);
      };

      if (relationData.assist) {
        createRelationDiv(
          "Assist",
          relationData.assist.target_hero,
          relationData.assist.desc
        );
      }
      if (relationData.strong) {
        createRelationDiv(
          "Strong Against",
          relationData.strong.target_hero,
          relationData.strong.desc
        );
      }
      if (relationData.weak) {
        createRelationDiv(
          "Weak Against",
          relationData.weak.target_hero,
          relationData.weak.desc
        );
      }

    })
    .catch((error) => console.error("Error:", error));
}