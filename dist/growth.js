/* Original procedural flowers. Growth follows chapters, never clicks or streaks. */
"use strict";
window.GardenGrowth = (() => {
  const palettes = {
    knowledge: ["#c6adff", "#8755dd"],
    memory: ["#ffc2db", "#d94e95"],
    care: ["#99f4d0", "#2c9f91"],
  };
  const labels = ["Planted", "Growing", "Blooming"];
  function flower(type, stage = 2) {
    const [light, dark] = palettes[type] || palettes.memory;
    let petals = "";
    if (stage === 2) {
      for (let i = 0; i < 12; i++)
        petals += `<ellipse cx="0" cy="-34" rx="18" ry="45" transform="rotate(${i * 30})" fill="url(#petal)" stroke="${light}" stroke-width=".5"/>`;
      for (let i = 0; i < 8; i++)
        petals += `<ellipse cx="0" cy="-19" rx="12" ry="28" transform="rotate(${i * 45 + 15})" fill="url(#inner)"/>`;
      petals +=
        '<circle r="18" fill="url(#gold)"/><g fill="#fff4b9"><circle cx="-5" cy="-6" r="2"/><circle cx="5" cy="-3" r="2"/><circle cy="5" r="2"/></g>';
    } else if (stage === 1) {
      petals =
        '<path d="M0 26C-55 0-30-50 0-61C32-42 49 0 0 26" fill="url(#petal)"/><path d="M0 26Q-17-21 0-61Q19-20 0 26" fill="url(#inner)"/><path d="M0 30Q-28 22-28-1Q-7 4 0 30Q9 6 29-1Q27 24 0 30" fill="url(#leaf)"/>';
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 310"><defs><radialGradient id="petal" cx="25%" cy="15%" r="90%"><stop stop-color="#fff7ff"/><stop offset=".3" stop-color="${light}"/><stop offset=".8" stop-color="${dark}"/><stop offset="1" stop-color="#452655"/></radialGradient><linearGradient id="inner" x2="1" y2="1"><stop stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></linearGradient><radialGradient id="gold" cx="30%" cy="20%"><stop stop-color="#fffbdc"/><stop offset=".45" stop-color="#e3f697"/><stop offset="1" stop-color="#7e9b37"/></radialGradient><linearGradient id="leaf" x2="1" y2="1"><stop stop-color="#d7ffac"/><stop offset=".5" stop-color="#89c98b"/><stop offset="1" stop-color="#2d665e"/></linearGradient></defs><ellipse cx="140" cy="275" rx="98" ry="21" fill="${dark}" opacity=".12"/><ellipse cx="140" cy="274" rx="92" ry="18" fill="none" stroke="${light}" stroke-opacity=".3"/><path d="M140 272Q155 213 ${stage === 0 ? "146 211" : "137 112"}" stroke="url(#leaf)" stroke-width="5" fill="none"/><path d="M146 238Q98 235 97 200Q135 197 146 238M146 216Q151 178 186 180Q186 210 146 216" fill="url(#leaf)"/><path d="M146 238L105 207M146 216L179 186" stroke="#e8ffd0" stroke-opacity=".55" fill="none"/><g transform="translate(138 ${stage === 1 ? "142" : "113"})">${petals}</g>${stage === 0 ? '<ellipse cx="141" cy="270" rx="13" ry="8" fill="url(#gold)"/>' : ""}<circle cx="105" cy="207" r="3" fill="#edfffc" opacity=".8"/><g fill="${light}" opacity=".7"><circle cx="51" cy="154" r="2"/><circle cx="225" cy="190" r="2"/><path d="M216 73h10m-5-5v10" stroke="${light}"/></g></svg>`;
  }
  // Inline SVG contains only fixed palette values and numerical stages, never user input.
  let illustrationId = 0;
  function mount(container, type, stage) {
    const prefix = `flower-${++illustrationId}-`;
    container.innerHTML = flower(type, stage)
      .replace(/id="([^"]+)"/g, (_, id) => `id="${prefix}${id}"`)
      .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}${id})`);
  }
  return { flower, mount, labels };
})();

const demo = document.querySelector("#demo-flower");
if (demo) {
  const chapters = [
    [
      "First chapter · A remembered place",
      "“I miss the market beside our old apartment. Every Saturday, the air smelled of oranges and warm bread.”",
      "Amara plants one detail she does not want to lose. A small thought is enough.",
    ],
    [
      "Second chapter · A new connection",
      "“I told my neighbor about the market. She remembered it too—the same bread stall, a different childhood.”",
      "A conversation adds another layer. The seed becomes a bud.",
    ],
    [
      "Third chapter · A memory becomes an invitation",
      "“This morning we baked that bread together. Next Saturday, we’re leaving an extra place at the table.”",
      "The past makes room for something new. Three chapters, one flowering story.",
    ],
  ];
  function showChapter(index) {
    GardenGrowth.mount(demo, "memory", index);
    document.querySelector("#demo-stage").textContent =
      `0${index + 1} / ${GardenGrowth.labels[index]}`;
    ["#demo-time", "#demo-quote", "#demo-caption"].forEach(
      (id, i) => (document.querySelector(id).textContent = chapters[index][i]),
    );
    document
      .querySelectorAll("[data-chapter]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(Number(button.dataset.chapter) === index),
        ),
      );
  }
  document
    .querySelectorAll("[data-chapter]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        showChapter(Number(button.dataset.chapter)),
      ),
    );
  showChapter(0);
}
