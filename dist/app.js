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
      body: "I almost left the old chair outside for collection. Then I noticed the pencil marks under the seat: the dates my father had repaired it before. I brought it back inside. I did not know how to mend the loose leg, but I knew I wanted to learn.",
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
      body: "I miss the market beside our old apartment. Every Saturday, the air smelled of oranges and warm bread. The bread seller used to wrap one extra piece for the walk home. The market is gone now, but I can still remember the warmth through the paper.",
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
      body: "I wanted company, but I did not have the energy to explain my day. I wondered whether being together could mean reading in the same room, listening to the same rain, and saying very little. I wrote that thought here in case someone else felt it too.",
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
      body: "After the first heavy rain, I noticed a small pool beside the greenhouse. While everyone hurried inside, I stayed to watch the water find its way between the stones. I drew its path on the back of a receipt. It was the first page of our garden notebook.",
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
      body: "My aunt used an expression I had never heard outside our family. I could translate each word, but the feeling disappeared. I wanted to remember more than its dictionary meaning: her voice, the kitchen light, and the moment she chose to say it.",
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
      body: "On my first day here, I walked past the same doorway three times because I was afraid to ask where to go. A neighbor noticed and walked with me. I kept thinking about how small that kindness was for them, and how much it changed the day for me.",
      promptTitle: "Make the first step smaller",
      prompt:
        "Imagine you just arrived in your neighborhood. What is one thing a kind neighbor could explain? That knowledge could become your first seed.",
    },
  ];
  const earlierChapters = {
    "seed-01": [
      "I kept the chair with the loose leg. My neighbor showed me how to look for the worn joint before reaching for a tool.",
      "We repaired it together. Now it sits by the greenhouse door, ready for the next person who needs a rest.",
    ],
    "seed-02": [
      "I told a neighbor about the old market. She remembered the bread stall too, from a different childhood.",
      "We baked that bread together. Next Saturday, we are leaving an extra place at the table.",
    ],
    "seed-03": [
      "I asked a friend to sit with me while we each worked. We agreed that neither of us needed to fill the silence.",
      "That afternoon became our quiet Thursday. Sometimes we draw; sometimes we simply watch the light change.",
    ],
    "seed-04": [
      "We drew the paths rain took through the garden. An older neighbor remembered where water collected before the new paths were built.",
      "We left a shared notebook by the door. Each season brings a new observation, including the ideas that did not work.",
    ],
    "seed-05": [
      "I asked my aunt when she used the expression. She answered with a story about waiting for someone to come home.",
      "With her permission, I wrote down the story beside the word. Now it holds a moment, not just a definition.",
    ],
    "seed-06": [
      "I remembered how confusing my first week had felt. I drew a small map of the places where people had helped me.",
      "A new neighbor added a quiet route to the map. The next welcome will carry both of our experiences.",
    ],
  };
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
  const rawChapters = storage.get("chapters", {});
  const chapters =
    rawChapters &&
    typeof rawChapters === "object" &&
    !Array.isArray(rawChapters)
      ? rawChapters
      : {};
  const notesFor = (seed) =>
    Array.isArray(chapters[seed.id])
      ? chapters[seed.id].filter(
          (note) =>
            note &&
            typeof note.text === "string" &&
            typeof note.date === "string",
        )
      : [];
  const stageFor = (seed) =>
    seed.local ? Math.min(2, notesFor(seed).length) : 2;
  const chapterForm = document.querySelector("#chapter-form");
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

  const landscape = document.querySelector("#garden-landscape");
  const plantBed = document.querySelector("#garden-plants");
  let gardenView = "garden";
  const activeCollection = () =>
    gardenView === "garden" ? plantBed : seedGrid;
  document.querySelectorAll("[data-view]").forEach((button) =>
    button.addEventListener("click", () => {
      gardenView = button.dataset.view;
      landscape.hidden = gardenView !== "garden";
      seedGrid.hidden = gardenView !== "list";
      document
        .querySelectorAll("[data-view]")
        .forEach((control) =>
          control.setAttribute(
            "aria-pressed",
            String(control.dataset.view === gardenView),
          ),
        );
    }),
  );
  function renderLandscape(visible) {
    plantBed.replaceChildren();
    if (!visible.length) {
      const message = element("div", "garden-empty");
      message.append(
        element(
          "h3",
          "",
          currentFilter === "mine"
            ? "You haven’t planted anything yet."
            : "No plants here yet.",
        ),
        element(
          "p",
          "",
          currentFilter === "pocket"
            ? "Save a plant to find it here later."
            : "Use Plant something above to add your first one.",
        ),
      );
      plantBed.append(message);
    }
    visible.forEach((seed) => {
      const plant = element("button", "garden-plant");
      plant.type = "button";
      plant.setAttribute("aria-label", `Open seed: ${seed.title}`);
      const drawing = element("span", "garden-flower");
      drawing.setAttribute("aria-hidden", "true");
      GardenGrowth.mount(drawing, seed.type, stageFor(seed));
      const label = element("span", "plant-sign");
      label.append(
        element("span", "plant-title", seed.title),
        element(
          "span",
          "plant-owner",
          `${seed.person} · ${GardenGrowth.labels[stageFor(seed)]}`,
        ),
      );
      plant.append(drawing, label);
      plant.addEventListener("click", () => openSeed(seed, plant));
      plantBed.append(plant);
    });
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
          : currentFilter === "mine"
            ? seed.local
            : seed.type === currentFilter),
    );
    document.querySelector("#seed-count").textContent =
      `${visible.length} ${visible.length === 1 ? "seed" : "seeds"} ${currentFilter === "pocket" ? "in your pocket" : "to discover"}`;
    renderLandscape(visible);
    seedGrid.replaceChildren();
    if (!visible.length) {
      const empty = element("div", "empty-state");
      empty.append(
        element(
          "h2",
          "",
          currentFilter === "mine"
            ? "You haven’t planted anything yet."
            : "Nothing saved here yet.",
        ),
        element(
          "p",
          "",
          currentFilter === "mine"
            ? "Choose Plant something above. Write a thought, then return to add its next chapter."
            : "Open a seed and keep it in your pocket. It will be waiting here.",
        ),
      );
      seedGrid.append(empty);
    }
    visible.forEach((seed, index) => {
      const card = element("article", "seed-card");
      card.dataset.type = seed.type;
      const art = element("div", "seed-art");
      const image = element("div", "living-flower");
      GardenGrowth.mount(image, seed.type, stageFor(seed));
      image.setAttribute("aria-hidden", "true");
      art.append(
        image,
        element(
          "span",
          "seed-code",
          seed.local ? "YOUR STORY" : "FICTIONAL STORY",
        ),
        element("span", "stage-badge", GardenGrowth.labels[stageFor(seed)]),
      );
      const content = element("div", "seed-content");
      const bottom = element("div", "seed-bottom");
      const open = element("button", "open-seed", "Read & grow ↗");
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
        element(
          "span",
          "seed-type",
          `${seed.type} · ${(seed.local ? 1 : 3) + notesFor(seed).length} ${!seed.local || notesFor(seed).length ? "chapters" : "chapter"}`,
        ),
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

    document.querySelector("#detail-type").textContent =
      `${seed.type} / ${seed.local ? "Your seed" : "An imagined neighbor"}`;
    document.querySelector("#detail-title").textContent = seed.title;
    document.querySelector("#detail-person").textContent =
      `Planted by ${seed.person}`;
    document.querySelector("#detail-body").textContent = seed.body;

    document.querySelector("#detail-prompt-title").textContent =
      seed.promptTitle || "Your notes";
    document.querySelector("#detail-prompt-body").textContent =
      seed.prompt ||
      "This seed lives in your own browser. Keep it in your pocket, or remove it whenever you like.";
    removeButton.hidden = !seed.local;
    chapterForm.reset();
    document.querySelector("#chapter-status").textContent = "";
    updateGrowth();
    updatePocketButton();
    seedDialog.showModal();
  }
  function updateGrowth() {
    const stage = stageFor(selectedSeed);
    GardenGrowth.mount(
      document.querySelector("#detail-art"),
      selectedSeed.type,
      stage,
    );
    const progress = document.querySelector("#detail-growth");
    progress.replaceChildren();
    GardenGrowth.labels.forEach((label, index) => {
      const step = element(
        "span",
        index <= stage ? "growth-step reached" : "growth-step",
        `${index + 1}. ${label}`,
      );
      if (index === stage) step.setAttribute("aria-current", "step");
      progress.append(step);
    });
    const history = document.querySelector("#chapter-history");
    history.replaceChildren();
    const original = element("li");
    original.append(
      element(
        "span",
        "micro",
        selectedSeed.local
          ? "01 / Your first chapter"
          : "01 / Fictional starting story",
      ),
      element("p", "", selectedSeed.body),
    );
    history.append(original);
    if (!selectedSeed.local)
      (earlierChapters[selectedSeed.id] || []).forEach((text, index) => {
        const entry = element("li");
        entry.append(
          element("span", "micro", `0${index + 2} / Fictional chapter`),
          element("p", "", text),
        );
        history.append(entry);
      });
    notesFor(selectedSeed).forEach((note, index) => {
      const entry = element("li");
      entry.append(
        element(
          "span",
          "micro",
          `${String(index + (selectedSeed.local ? 2 : 4)).padStart(2, "0")} / Your chapter · ${note.date}`,
        ),
        element("p", "", note.text),
      );
      const remove = element("button", "chapter-remove", "Remove this chapter");
      remove.type = "button";
      remove.addEventListener("click", () => {
        chapters[selectedSeed.id] = notesFor(selectedSeed).filter(
          (_, i) => i !== index,
        );
        const saved = storage.set("chapters", chapters);
        updateGrowth();
        chapterForm.querySelector("textarea").focus();
        document.querySelector("#chapter-status").textContent = saved
          ? "Chapter removed. Your flower reflects the remaining chapters."
          : "Removed for this visit; browser storage could not be updated.";
      });
      entry.append(remove);
      history.append(entry);
    });
    document.querySelector("#detail-body").hidden = true;
    document.querySelector("#chapter-note").textContent = selectedSeed.local
      ? (stage === 0
          ? "Add a chapter to turn your seed into a bud."
          : stage === 1
            ? "Add a chapter to see your flower bloom."
            : "Your flower is in bloom. Its story can keep growing.") +
        " Saved only in this browser."
      : "Continue this fictional story with your own response. Only your browser saves it; nothing is sent to the fictional author.";
  }
  chapterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = chapterForm.elements.namedItem("chapter");
    const text = input.value.trim();
    if (!text) {
      document.querySelector("#chapter-status").textContent =
        "Write a few words for this chapter.";
      input.focus();
      return;
    }
    chapters[selectedSeed.id] = [
      ...notesFor(selectedSeed),
      {
        text: text.slice(0, 700),
        date: new Date().toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      },
    ];
    const saved = storage.set("chapters", chapters);
    chapterForm.reset();
    updateGrowth();
    document.querySelector("#chapter-status").textContent = saved
      ? `Chapter added. ${GardenGrowth.labels[stageFor(selectedSeed)]}: your story has grown.`
      : "Chapter added for this visit. Browser storage is unavailable.";
  });

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
          : "Saved to My pocket."
        : "Kept for this visit. Browser storage is unavailable.",
    );
  });
  // Re-render only after the modal closes; return focus to the matching card.
  seedDialog.addEventListener("close", () => {
    const oldTitle = selectedSeed?.title;
    renderSeeds();
    const matchingButton = [
      ...activeCollection().querySelectorAll("button"),
    ].find(
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
    delete chapters[selectedSeed.id];
    storage.set("chapters", chapters);
    const saved = storage.set("seeds", personalSeeds);
    storage.set("pocket", [...pocket]);
    seedDialog.close();
    announce(
      saved
        ? "Your seed has been removed from this garden."
        : "Removed for this visit. Browser storage could not be updated.",
    );
  });
  document
    .querySelectorAll("#plant-open, [data-plant-open]")
    .forEach((button) =>
      button.addEventListener("click", () => {
        form.querySelector(".form-status").textContent = "";
        plantDialog.showModal();
      }),
    );
  document.querySelectorAll("[data-prompt]").forEach((button) =>
    button.addEventListener("click", () => {
      const prompts = {
        memory: ["A place I miss", "One detail I remember is…"],
        knowledge: [
          "Something I learned",
          "I used to think… Then I discovered…",
        ],
        care: [
          "A kindness I can offer",
          "I could make someone’s day easier by…",
        ],
      };
      const [title, placeholder] = prompts[button.dataset.prompt];
      form.elements.namedItem("type").value = button.dataset.prompt;
      // Keep visitors' writing intact when choosing another prompt.
      if (!form.elements.namedItem("title").value.trim())
        form.elements.namedItem("title").value = title;
      form.elements.namedItem("body").placeholder = placeholder;
      form.elements.namedItem("body").focus();
    }),
  );
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
    currentFilter = "mine";
    renderSeeds();
    form.reset();
    plantDialog.close();
    activeCollection().querySelector("button").focus({ preventScroll: true });
    activeCollection().scrollIntoView({
      behavior: motionOff ? "instant" : "smooth",
      block: "start",
    });
    announce(
      saved
        ? "Planted. You can find it under My seeds."
        : "Your seed is here for this visit. Browser storage is unavailable.",
    );
  });
  renderSeeds();
}
