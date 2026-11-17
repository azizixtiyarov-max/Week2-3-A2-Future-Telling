/* Common Ground: browser-local interactions, no dependencies or network calls. */
"use strict";

const storage = {
  get(key, fallback) {
    try {
      return (
        JSON.parse(localStorage.getItem(`common-ground:${key}`)) ?? fallback
      );
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(`common-ground:${key}`, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
};

const toast = document.querySelector(".toast");
let toastTimer;
function announce(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toastTimer = setTimeout(() => {
    toast.textContent = "";
  }, 6000);
}

// Respect the system preference until a visitor makes an explicit choice.
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let motionOff = storage.get("motion", null) ?? motionQuery.matches;
const motionButton = document.querySelector(".motion-button");
function updateMotion() {
  document.documentElement.dataset.motion = motionOff ? "off" : "on";
  motionButton.textContent = `Motion: ${motionOff ? "off" : "on"}`;
  motionButton.setAttribute("aria-pressed", String(motionOff));
  motionButton.setAttribute(
    "aria-label",
    `Reduce motion: ${motionOff ? "on" : "off"}`,
  );
}
updateMotion();
motionButton.addEventListener("click", () => {
  motionOff = !motionOff;
  storage.set("motion", motionOff);
  updateMotion();
});
motionQuery.addEventListener("change", (event) => {
  if (storage.get("motion", null) === null) {
    motionOff = event.matches;
    updateMotion();
  }
});

// A quiet, opt-in synthesized chord. No audio file, microphone, or autoplay.
const soundButton = document.querySelector(".sound-button");
if (soundButton) {
  let audioContext;
  let master;
  let soundOn = false;
  const label = soundButton.querySelector(".sound-label");
  function updateSound() {
    soundButton.setAttribute("aria-pressed", String(soundOn));
    label.textContent = soundOn ? "Soundscape on" : "Soundscape off";
  }
  soundButton.addEventListener("click", async () => {
    soundButton.disabled = true;
    try {
      const AudioAPI = window.AudioContext || window.webkitAudioContext;
      if (!AudioAPI) throw new Error("Audio unavailable");
      if (!audioContext) {
        audioContext = new AudioAPI();
        master = audioContext.createGain();
        master.gain.value = 0;
        master.connect(audioContext.destination);
        [130.81, 196, 261.63, 329.63].forEach((frequency, index) => {
          const oscillator = audioContext.createOscillator();
          const gain = audioContext.createGain();
          oscillator.type = "sine";
          oscillator.frequency.value = frequency;
          oscillator.detune.value = index % 2 ? 3 : -3;
          gain.gain.value = 0.12;
          oscillator.connect(gain).connect(master);
          oscillator.start();
        });
      }
      soundOn = !soundOn;
      if (soundOn) await audioContext.resume();
      master.gain.setTargetAtTime(
        soundOn ? 0.22 : 0,
        audioContext.currentTime,
        0.25,
      );
      updateSound();
    } catch {
      soundOn = false;
      updateSound();
      announce(
        "Sound is unavailable in this browser. The garden is still yours to explore.",
      );
    } finally {
      soundButton.disabled = false;
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && audioContext) {
      soundOn = false;
      master.gain.setValueAtTime(0, audioContext.currentTime);
      audioContext.suspend();
      updateSound();
    }
  });
}

const seedGrid = document.querySelector("#seed-grid");
if (seedGrid) {
  const foundingSeeds = [
    {
      id: "seed-01",
      type: "knowledge",
      title: "A second life for small things",
      short:
        "Learn the quiet art of repair. Start with the things you almost threw away.",
      person: "Ren",
      place: "Repair greenhouse",
      art: "bloom",
      body: "Ren’s corner of the 2086 commons holds repair memories: how fabric feels before a seam gives way, or how a loose chair sounds. You can replay a technique slowly, read its steps, or bring an object to the neighborhood workshop.",
      promptTitle: "A small beginning, today",
      prompt:
        "Look for one worn object you still love. Write down what it needs. You do not have to know how to fix it yet.",
    },
    {
      id: "seed-02",
      type: "memory",
      title: "The sound of a place called home",
      short:
        "A street market, a familiar voice, rain on a tin roof. Places live in us.",
      person: "Amara",
      place: "Memory conservatory",
      art: "pink",
      body: "Amara remembers a market that no longer exists. In the future garden, she chooses which fragments to share and which to keep private. Captions and sensory descriptions let someone enter the memory without needing to hear it. Her story stays hers.",
      promptTitle: "Keep a place alive",
      prompt:
        "Think of somewhere you miss. Describe one small detail you would want a future neighbor to know. Ask permission before including someone else’s story.",
    },
    {
      id: "seed-03",
      type: "care",
      title: "Company, without conversation",
      short:
        "A quiet corner for doing your own thing, in the gentle presence of others.",
      person: "Sol",
      place: "The quiet canopy",
      art: "orbit",
      body: "Some days, connection means sitting together without speaking. Sol’s imagined canopy welcomes remote visitors and local neighbors into the same quiet room. A text check-in is optional. There are no cameras to turn on and no explanations to give.",
      promptTitle: "An invitation you can borrow",
      prompt:
        "“Would you like to do our own things together for a little while?” A small, specific invitation can make it easier to say yes—or no.",
    },
    {
      id: "seed-04",
      type: "knowledge",
      title: "A garden that remembers rain",
      short:
        "Neighborhood growing knowledge, passed between generations and climates.",
      person: "Ivo",
      place: "Water commons",
      art: "sun",
      body: "Ivo’s future garden combines a community’s growing notes with local environmental observations. Neighbors can trace where an idea came from and adapt it together. The network shares the story behind a method, including the times it did not work.",
      promptTitle: "Observe before you optimize",
      prompt:
        "Spend five minutes noticing where water collects after rain. Sketch what you see. Local observation is knowledge worth keeping.",
    },
    {
      id: "seed-05",
      type: "memory",
      title: "Words we almost forgot",
      short:
        "An open space for the expressions that make a language feel like home.",
      person: "Mei",
      place: "Language grove",
      art: "blue",
      body: "Mei tends a grove of expressions that resist easy translation. In this imagined network, speakers explain words in their own way, with context and permission. A phrase can hold several meanings without one version replacing all the others.",
      promptTitle: "Leave room for a meaning",
      prompt:
        "Choose a word or expression you love. Instead of translating it, describe a moment when you would use it.",
    },
    {
      id: "seed-06",
      type: "care",
      title: "Your first day, together",
      short:
        "For anyone starting again. A neighbor, a question, a little less unknown.",
      person: "Noor",
      place: "The welcome relay",
      art: "lilac",
      body: "Noor imagines a welcome relay for people arriving in a new community. Visitors choose what help to request and how to meet. Paid local stewards support introductions, and leaving a conversation is always an option. Belonging does not require telling your whole story.",
      promptTitle: "Make the first step smaller",
      prompt:
        "Imagine you just arrived in your neighborhood. What is one thing a kind neighbor could explain? That knowledge could become your first seed.",
    },
  ];
  const validTypes = ["knowledge", "memory", "care"];
  const storedSeeds = storage.get("seeds", []);
  let personalSeeds = Array.isArray(storedSeeds)
    ? storedSeeds
        .filter(
          (seed) =>
            seed &&
            typeof seed.id === "string" &&
            seed.id.startsWith("local-") &&
            validTypes.includes(seed.type) &&
            typeof seed.title === "string" &&
            typeof seed.body === "string" &&
            typeof seed.person === "string",
        )
        .map((seed) => ({
          ...seed,
          local: true,
          art: { knowledge: "bloom", memory: "pink", care: "orbit" }[seed.type],
        }))
    : [];
  const storedPocket = storage.get("pocket", []);
  const pocket = new Set(
    Array.isArray(storedPocket)
      ? storedPocket.filter((id) => typeof id === "string")
      : [],
  );
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const typeFromURL = new URLSearchParams(location.search).get("type");
  let currentFilter = validTypes.includes(typeFromURL) ? typeFromURL : "all";
  let selectedSeed;
  let seedOpener;
  const seedDialog = document.querySelector("#seed-dialog");
  const plantDialog = document.querySelector("#plant-dialog");
  const form = document.querySelector("#plant-form");
  const pocketButton = document.querySelector("#pocket-button");
  const removeButton = document.querySelector("#remove-button");
  const allSeeds = () => [...personalSeeds, ...foundingSeeds];

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderSeeds() {
    filterButtons.forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === currentFilter),
      ),
    );
    const visible = allSeeds().filter(
      (seed) =>
        currentFilter === "all" ||
        (currentFilter === "pocket"
          ? pocket.has(seed.id)
          : seed.type === currentFilter),
    );
    document.querySelector("#seed-count").textContent =
      `${visible.length} ${visible.length === 1 ? "seed" : "seeds"} ${currentFilter === "pocket" ? "in your pocket" : "to discover"}`;
    seedGrid.replaceChildren();
    if (!visible.length) {
      const empty = element("div", "empty-state");
      empty.append(
        element("h2", "", "A little room for possibility."),
        element(
          "p",
          "",
          "Open a seed and keep it in your pocket. It will be waiting here.",
        ),
      );
      seedGrid.append(empty);
    }
    visible.forEach((seed, index) => {
      const card = element("article", "seed-card");
      card.dataset.type = seed.type;
      const art = element("div", "seed-art");
      const image = element("img");
      image.src = `assets/${seed.art}.svg`;
      image.alt = "";
      image.width = 200;
      image.height = 170;
      image.loading = "lazy";
      art.append(
        image,
        element(
          "span",
          "seed-code",
          seed.local
            ? "YOUR SEED / LOCAL"
            : `SPECIMEN / ${seed.id.slice(-2).padStart(3, "0")}`,
        ),
        element("span", "seed-orbit", pocket.has(seed.id) ? "✓" : "✧"),
      );
      const content = element("div", "seed-content");
      const bottom = element("div", "seed-bottom");
      const open = element("button", "open-seed", "Open seed ↗");
      open.type = "button";
      open.setAttribute("aria-label", `Open seed: ${seed.title}`);
      open.addEventListener("click", () => openSeed(seed, open));
      bottom.append(
        element(
          "span",
          "seed-person",
          `${seed.person} · ${seed.local ? "Your device" : seed.place}`,
        ),
        open,
      );
      content.append(
        element("span", "seed-type", seed.type),
        element("h2", "", seed.title),
        element("p", "", seed.short || seed.body.slice(0, 110)),
        bottom,
      );
      card.append(art, content);
      seedGrid.append(card);
    });
  }

  function openSeed(seed, opener) {
    selectedSeed = seed;
    seedOpener = opener;
    document.querySelector("#detail-type").textContent =
      `${seed.type} / ${seed.local ? "Your seed" : "An imagined neighbor"}`;
    document.querySelector("#detail-title").textContent = seed.title;
    document.querySelector("#detail-person").textContent =
      `Planted by ${seed.person}`;
    document.querySelector("#detail-body").textContent = seed.body;
    document.querySelector("#detail-art").src = `assets/${seed.art}.svg`;
    document.querySelector("#detail-prompt-title").textContent =
      seed.promptTitle || "A beginning worth keeping";
    document.querySelector("#detail-prompt-body").textContent =
      seed.prompt ||
      "This seed lives in your own browser. Keep it in your pocket, or remove it whenever you like.";
    removeButton.hidden = !seed.local;
    updatePocketButton();
    seedDialog.showModal();
  }
  function updatePocketButton() {
    const kept = pocket.has(selectedSeed.id);
    pocketButton.textContent = kept
      ? "In your pocket · Remove −"
      : "Keep in my pocket +";
    pocketButton.setAttribute("aria-pressed", String(kept));
  }

  filterButtons.forEach((button) =>
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;
      renderSeeds();
    }),
  );
  pocketButton.addEventListener("click", () => {
    const kept = pocket.has(selectedSeed.id);
    kept ? pocket.delete(selectedSeed.id) : pocket.add(selectedSeed.id);
    const saved = storage.set("pocket", [...pocket]);
    updatePocketButton();
    announce(
      saved
        ? kept
          ? "Seed removed from your pocket."
          : "A little possibility, saved in your pocket."
        : "Kept for this visit. Browser storage is unavailable.",
    );
  });
  // Re-render only after the modal closes; return focus to the matching card.
  seedDialog.addEventListener("close", () => {
    const oldTitle = selectedSeed?.title;
    renderSeeds();
    const matchingButton = [...seedGrid.querySelectorAll("button")].find(
      (button) =>
        button.getAttribute("aria-label") === `Open seed: ${oldTitle}`,
    );
    (
      matchingButton ||
      filterButtons.find((button) => button.dataset.filter === currentFilter)
    ).focus({ preventScroll: true });
  });
  removeButton.addEventListener("click", () => {
    personalSeeds = personalSeeds.filter((seed) => seed.id !== selectedSeed.id);
    pocket.delete(selectedSeed.id);
    const saved = storage.set("seeds", personalSeeds);
    storage.set("pocket", [...pocket]);
    seedDialog.close();
    announce(
      saved
        ? "Your seed has been removed from this garden."
        : "Removed for this visit. Browser storage could not be updated.",
    );
  });
  document.querySelector("#plant-open").addEventListener("click", () => {
    form.querySelector(".form-status").textContent = "";
    plantDialog.showModal();
  });
  document
    .querySelectorAll(".close-dialog")
    .forEach((button) =>
      button.addEventListener("click", () => button.closest("dialog").close()),
    );
  [seedDialog, plantDialog].forEach((dialog) =>
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      )
        dialog.close();
    }),
  );
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const title = String(data.get("title")).trim();
    const body = String(data.get("body")).trim();
    if (!title || !body) {
      form.querySelector(".form-status").textContent =
        "Give your seed a name and a few words before planting.";
      form.elements.namedItem(!title ? "title" : "body").focus();
      return;
    }
    const type = String(data.get("type"));
    const seed = {
      id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      title: title.slice(0, 65),
      body: body.slice(0, 700),
      person: String(data.get("name")).trim().slice(0, 30) || "A neighbor",
      art: { knowledge: "bloom", memory: "pink", care: "orbit" }[type],
      local: true,
    };
    personalSeeds.unshift(seed);
    const saved = storage.set("seeds", personalSeeds);
    currentFilter = "all";
    renderSeeds();
    form.reset();
    plantDialog.close();
    seedGrid.querySelector("button").focus({ preventScroll: true });
    seedGrid.scrollIntoView({
      behavior: motionOff ? "instant" : "smooth",
      block: "start",
    });
    announce(
      saved
        ? "Your seed is planted. This little corner of the future is yours."
        : "Your seed is here for this visit. Browser storage is unavailable.",
    );
  });
  renderSeeds();
}
