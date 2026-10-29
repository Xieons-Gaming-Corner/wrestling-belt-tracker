"use strict";

// All completion state lives in memory. No storage or network writes.
const weapons = [
  ["CODA 9", "Eidskallen Landing"],
  ["Echo 12", "Eidskallen Landing"],
  ["MPC-25", "Eidskallen Square"],
  ["M10 Breacher", "Blodheim Hall"],
  ["MXR-17", "Fishery Island"],
  ["Peacekeeper Mk 1", "Eidskallen Market"],
  ["M8A1", "Eidskallen Stave Church"],
  ["Shadow SK", "Tyr’s Shoulder"],
  ["RK-9", "Dry Dock"],
  ["X9 Maverick", "Dry Dock"],
  ["VS Recon", "Core Foundry"],
  ["DS20 Mirage", "War Factory"],
  ["Warden 309", "Tyr’s Foot"],
  ["XM325", "Beacon Island"],
  ["M34 Novaline", "Von List’s Castle — secret room through Tyr’s Head"],
  ["AK-27", "Ava’s Room — secret room through Tyr’s Head"],
  ["Dravec 45", "Requiem Sacrifice Room — secret room through Tyr’s Head"],
  ["Jotunn Star", "Wonder Weapon quest or Mystery Box"]
];
const completed = new Set();
const list = document.querySelector("#weapons");
const remaining = document.querySelector("#remaining");
const resetButton = document.querySelector("#reset");
const progress = document.querySelector("#progress");
const cards = [];
progress.max = weapons.length;

weapons.forEach(([weapon, location], index) => {
  const card = document.createElement("label");
  card.className = "weapon";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `weapon-${index + 1}`;
  checkbox.checked = false;
  const details = document.createElement("span");
  const title = document.createElement("strong");
  title.textContent = `${String(index + 1).padStart(2, "0")}. ${weapon}`;
  const subtitle = document.createElement("span");
  subtitle.className = "location";
  subtitle.textContent = location;
  details.append(title, subtitle);
  card.append(checkbox, details);
  list.append(card);
  cards.push({card, checkbox});
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) completed.add(index);
    else completed.delete(index);
    update();
    if (remaining.checked && checkbox.checked) {
      const next = cards.slice(index + 1).find(item => !item.card.hidden)
        || cards.find(item => !item.card.hidden);
      (next ? next.checkbox : remaining).focus();
    }
  });
});

function update() {
  const count = completed.size;
  const total = weapons.length;
  const percent = Math.round(count / total * 100);
  document.querySelector("#progress-text").textContent = `${count}/${total} completed`;
  document.querySelector("#percent").textContent = `${percent}%`;
  progress.value = count;
  document.querySelector("#status").textContent = count === total
    ? "🏆 All weapons checked off — checklist complete!"
    : count === 0 ? "Ready to start your run?" : `${total - count} weapons remaining. Keep going!`;
  document.body.classList.toggle("complete", count === total);
  cards.forEach(({card, checkbox}, index) => {
    const done = completed.has(index);
    checkbox.checked = done;
    card.classList.toggle("done", done);
    card.hidden = remaining.checked && done;
  });
  document.querySelector("#empty").hidden = !(remaining.checked && count === total);
  resetButton.disabled = count === 0;
}

remaining.checked = false;
remaining.addEventListener("change", update);
resetButton.addEventListener("click", () => {
  if (!window.confirm("Reset all weapon progress in this page?")) return;
  completed.clear();
  update();
});

// Reset if the browser restores this document from its back/forward cache.
window.addEventListener("pageshow", event => {
  if (event.persisted) {
    completed.clear();
    remaining.checked = false;
    update();
  }
});
update();
