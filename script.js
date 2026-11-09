
// ☁️ THE FLOATING WORLDS
// Ein kleines Universum voller Überraschungen!

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

let stars = 0;
let gameScore = 0;
let gameTimer = 20;
let gameInterval;
let cloudInterval;
let secretClicks = 0;

// START
$("#startButton").addEventListener("click", () => {
  $("#welcome").classList.add("fade");
  $("#main").classList.remove("hidden");

  setTimeout(() => {
    $("#welcome").style.display = "none";
  }, 950);

  showToast("WILLKOMMEN!", "Deine Reise durch die schwebenden Welten beginnt. Viel Spass beim Entdecken!");
  createParticles();
});

// STERNE SAMMELN
function addStar(amount = 1) {
  stars += amount;
  $("#starCount").textContent = stars;
}

$("#starButton").addEventListener("click", () => {
  showToast("DEINE SAMMLUNG ✨", `Du hast bereits ${stars} Entdeckungssterne gesammelt!`);
});

// HIMMELSKARTE UND INSELN
const islandData = {
  blumen: {
    number: "INSEL 01 · BLÜTENBUCHT",
    picture: "🌷🌼🌸",
    title: "Blütenbucht",
    description: "Willkommen in einem Meer aus Blumen! Die Pflanzen hier werden so gross wie Bäume. Kleine Blütenelfen wohnen in den Blütenkelchen und sammeln Morgentau.",
    fact: "GEHEIMNIS: Einmal im Jahr blüht eine goldene Blume. Wer sie findet, darf sich eine neue Farbe für den Himmel wünschen."
  },
  regenbogen: {
    number: "INSEL 02 · REGENBOGENREICH",
    picture: "🌈🦋🎨",
    title: "Regenbogenreich",
    description: "Hier regnet es manchmal Konfetti und die Flüsse schimmern in allen Farben. Die Bewohner können Farben mischen, die es auf keiner anderen Welt gibt.",
    fact: "GEHEIMNIS: Am Ende des Regenbogenflusses steht eine Tür. Sie führt immer an einen anderen Ort."
  },
  kristall: {
    number: "INSEL 03 · KRISTALLKAMM",
    picture: "💎🔮✨",
    title: "Kristallkamm",
    description: "Eine Welt aus glitzernden Bergen, funkelnden Höhlen und leuchtenden Steinen. Manche Kristalle speichern Geräusche und spielen sie Jahre später wieder ab.",
    fact: "GEHEIMNIS: Der grösste Kristall heisst Lumina. Er leuchtet auch dann, wenn alle anderen Lichter ausgehen."
  },
  nacht: {
    number: "INSEL 04 · MONDSCHLAF",
    picture: "🌙⭐🪐",
    title: "Mondschlaf",
    description: "Ein friedlicher Ort unter einem violetten Himmel. Sternenfische schwimmen durch die Luft und die Bäume tragen kleine Monde als Früchte.",
    fact: "GEHEIMNIS: Hier kann man auf einer Wolke schlafen und beim Aufwachen einen neuen Traum finden."
  },
  pilz: {
    number: "INSEL 05 · PILZWALD",
    picture: "🍄🌿🧚",
    title: "Der Pilzwald",
    description: "Ein riesiger Wald aus bunten Pilzen. In den grössten Pilzen gibt es ganze Dörfer mit kleinen Brücken, winzigen Läden und geheimen Tunneln.",
    fact: "GEHEIMNIS: Die blauen Pilze leuchten, wenn jemand in der Nähe eine gute Idee hat."
  },
  meer: {
    number: "INSEL 06 · WOLKENMEER",
    picture: "🐚🐳🫧",
    title: "Wolkenmeer",
    description: "Ein Meer aus weichen, weissen Wolken. Riesige Himmelswale gleiten hindurch und hinterlassen glitzernde Luftblasen.",
    fact: "GEHEIMNIS: In einer dieser Blasen befindet sich eine ganze kleine Welt."
  },
  geheim: {
    number: "INSEL 07 · GEHEIMNISVOLLER SEKTOR",
    picture: "❔🗝️✨",
    title: "Die Unbekannte",
    description: "Du hast sie gefunden! Diese Insel war auf keiner Karte verzeichnet. Niemand weiss, wer dort wohnt. Vielleicht wartet dort ein neues Abenteuer.",
    fact: "GEHEIMNIS: Die Insel erscheint nur Menschen, die mindestens eine andere Insel besucht haben."
  }
};

function visitIsland(id) {
  const island = islandData[id];
  if (!island) return;

  $("#modalNumber").textContent = island.number;
  $("#modalPicture").textContent = island.picture;
  $("#modalTitle").textContent = island.title;
  $("#modalDescription").textContent = island.description;
  $("#modalFact").textContent = island.fact;

  $("#islandModal").classList.add("show");
  addStar();

  if (id === "geheim") {
    showToast("GEHEIME INSEL ENTDECKT!", "Du hast den unbekannten Sektor gefunden. Das ist eine ganz besondere Entdeckung!");
  }
}

$$("[data-island]").forEach(button => {
  button.addEventListener("click", () => {
    visitIsland(button.dataset.island);
  });
});

$("#modalClose").addEventListener("click", closeIsland);
$("#modalDone").addEventListener("click", closeIsland);

$("#islandModal").addEventListener("click", event => {
  if (event.target === $("#islandModal")) closeIsland();
});

function closeIsland() {
  $("#islandModal").classList.remove("show");
}

// LEXIKON
const lexicon = {
  wesen: [
    ["🦊", "Der Wolkenfuchs", "Ein flauschiger Bewohner des Wolkenmeeres. Sein Fell verändert seine Farbe je nach Wetter. Er sammelt verlorene Träume in seinem buschigen Schwanz."],
    ["🐉", "Der Glitzerdrache", "Ein freundlicher Drache aus Kristallkamm. Er niest kleine Sternchen und kann mit seinen Flügeln Regenbögen erzeugen."],
    ["🧚", "Die Blütenfee", "Sie wohnt in den grossen Blumen der Blütenbucht. Ihre Flügel leuchten in der Farbe ihrer Lieblingsblume."],
    ["🐳", "Der Himmelswal", "Ein riesiger, friedlicher Wal, der durch die Wolken schwimmt. Sein Gesang ist auf allen Inseln zu hören."],
    ["🐰", "Der Sternenhase", "Er lebt auf Mondschlaf und sammelt Sternenstaub. Seine Ohren leuchten, wenn er besonders glücklich ist."]
  ],
  pflanzen: [
    ["🌳", "Der Wolkenbaum", "Seine Blätter sind weich wie Watte. Er wächst ohne Erde und schwebt über den Inseln. Seine Früchte schmecken nach Honig."],
    ["🌷", "Die Riesen-Tulpe", "Eine Blume, die grösser als ein Haus werden kann. Bei Sonnenaufgang öffnet sie sich und gibt kleine Lichtkugeln frei."],
    ["🍄", "Der Leuchtpilz", "Er wächst in den Schatten des Pilzwaldes. Nachts leuchtet er in Blau, Rosa und Violett."],
    ["🌟", "Das Sternenkraut", "Eine seltene Pflanze, die nur auf Mondschlaf wächst. Ihre Blüten sehen aus wie kleine Sterne."]
  ],
  orte: [
    ["🏰", "Das Wolkenschloss", "Ein Schloss, das ständig seine Form verändert. Es besitzt angeblich 100 Fenster, aber niemand hat sie je alle gleichzeitig gesehen."],
    ["🌉", "Die Regenbogenbrücke", "Sie verbindet zwei Inseln. Die Brücke erscheint nur, wenn die Sonne scheint und gleichzeitig ein paar Regentropfen fallen."],
    ["💎", "Die Kristallhöhle", "Ein unterirdischer Ort, in dem Kristalle alte Geschichten speichern. Wenn man sie berührt, hört man manchmal ein Flüstern."]
  ]
};

function showLexicon(category, index = 0) {
  const item = lexicon[category][index];

  $("#lexiconDisplay").innerHTML = `
    <div class="lexicon-emoji">${item[0]}</div>
    <div>
      <span class="lexicon-label">HIMMELSLEXIKON · EINTRAG ${String(index + 1).padStart(3, "0")}</span>
      <h3>${item[1]}</h3>
      <p>${item[2]}</p>
      <div class="lexicon-navigation">
        ${lexicon[category].map((_, i) =>
          `<button class="lexicon-dot ${i === index ? "active" : ""}" data-entry="${i}">${i + 1}</button>`
        ).join("")}
      </div>
    </div>
  `;

  $$("#lexiconDisplay [data-entry]").forEach(button => {
    button.addEventListener("click", () => {
      showLexicon(category, Number(button.dataset.entry));
    });
  });
}

$$(".lexicon-tabs button").forEach(button => {
  button.addEventListener("click", () => {
    $$(".lexicon-tabs button").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    showLexicon(button.dataset.category);
  });
});

// Extra Styling für die Lexikon-Auswahl
const lexiconStyle = document.createElement("style");
lexiconStyle.textContent = `
.lexicon-navigation {
  display: flex;
  gap: 7px;
  margin-top: 17px;
}
.lexicon-dot {
  width: 27px;
  height: 27px;
  border: 0;
  border-radius: 50%;
  background: #e9f2ed;
  color: #71958d;
  font-size: 10px;
}
.lexicon-dot.active {
  background: #79b9b4;
  color: white;
}
`;
document.head.appendChild(lexiconStyle);

// WOLKENSPIEL
$("#gameStart").addEventListener("click", startGame);

function startGame() {
  clearInterval(gameInterval);
  clearInterval(cloudInterval);

  gameScore = 0;
  gameTimer = 20;

  $("#gameScore").textContent = gameScore;
  $("#gameTime").textContent = gameTimer;
  $("#gameMessage").classList.add("hidden");

  $$(".game-cloud").forEach(cloud => cloud.remove());

  cloudInterval = setInterval(createGameCloud, 550);

  gameInterval = setInterval(() => {
    gameTimer--;
    $("#gameTime").textContent = gameTimer;

    if (gameTimer <= 0) endGame();
  }, 1000);
}

function createGameCloud() {
  const area = $("#gameArea");
  const cloud = document.createElement("button");

  cloud.className = "game-cloud";
  cloud.textContent = ["☁️", "🌥️", "💭"][Math.floor(Math.random() * 3)];

  const maxX = Math.max(0, area.clientWidth - 55);
  const maxY = Math.max(0, area.clientHeight - 55);

  cloud.style.left = Math.random() * maxX + "px";
  cloud.style.top = Math.random() * maxY + "px";

  cloud.addEventListener("click", () => {
    gameScore++;
    $("#gameScore").textContent = gameScore;
    cloud.remove();

    if (gameScore % 5 === 0) {
      addStar();
    }
  });

  area.appendChild(cloud);

  setTimeout(() => cloud.remove(), 1700);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(cloudInterval);

  $$(".game-cloud").forEach(cloud => cloud.remove());

  const message = $("#gameMessage");
  message.classList.remove("hidden");

  const resultText = gameScore >= 15
    ? "WOW! Du bist eine echte Wolkenfängerin! 🏆"
    : gameScore >= 7
      ? "Sehr gut! Du hast viele Wolken gerettet! ☁️"
      : "Gut gemacht! Die Wolken sagen Danke! 💙";

  message.innerHTML = `
    <span>🏆</span>
    <p>${resultText}</p>
    <p>Du hast ${gameScore} Wolken gefangen!</p>
    <button id="gameAgain">NOCH EINMAL SPIELEN</button>
  `;

  $("#gameAgain").addEventListener("click", startGame);
}

// INSEL-GENERATOR
let chosenClimate = "sunny";
let chosenCreature = "🦊";
let chosenFeature = "🌳 🏡 🌷";

$$("[data-climate]").forEach(button => {
  button.addEventListener("click", () => {
    $$("#climateChoices button").forEach(b => b.classList.remove("selected"));
    button.classList.add("selected");
    chosenClimate = button.dataset.climate;
  });
});

$$("[data-creature]").forEach(button => {
  button.addEventListener("click", () => {
    $$("#creatureChoices button").forEach(b => b.classList.remove("selected"));
    button.classList.add("selected");
    chosenCreature = button.dataset.creature;
  });
});

$$("[data-feature]").forEach(button => {
  button.addEventListener("click", () => {
    $$("#featureChoices button").forEach(b => b.classList.remove("selected"));
    button.classList.add("selected");
    chosenFeature = button.dataset.feature;
  });
});

$("#islandName").addEventListener("input", () => {
  const name = $("#islandName").value.trim();
  $("#previewName").textContent = name || "Wolkenheim";
});

$("#createIsland").addEventListener("click", () => {
  const name = $("#islandName").value.trim() || "Wolkenheim";

  const climates = {
    sunny: "linear-gradient(150deg, #a8e2fa, #fff0b8)",
    rainbow: "linear-gradient(150deg, #ffcee3, #d7c8ff, #c6f1dc)",
    night: "linear-gradient(150deg, #65649c, #b5a1d9)"
  };

  $("#islandPreview").style.background = climates[chosenClimate];
  $("#previewItems").textContent = chosenFeature + " " + chosenCreature;
  $("#previewName").textContent = name;

  $("#creatorResult").textContent =
    "✨ " + name + " wurde erschaffen! Deine Insel ist jetzt Teil des Himmelreichs.";

  addStar(3);
  showToast("NEUE INSEL ERSCHAFFEN!", name + " ist jetzt auf der Himmelskarte eingetragen. Du erhältst drei Entdeckungssterne!");
});

// ZUFALLSÜBERRASCHUNG
const surprises = [
  ["EIN WOLKENPOSTBOTE!", "Ein kleiner Vogel bringt dir eine Nachricht: Auf Mondschlaf gibt es heute Sternschnuppen!"],
  ["EIN NEUES WESEN!", "Ein winziger Glitzerdrache wurde in deinem Atlas entdeckt. Er heisst Funkel."],
  ["GEHEIME ENTDECKUNG!", "Unter der Blütenbucht befindet sich eine winzige Stadt. Niemand wusste davon!"],
  ["MAGISCHER FUND!", "Du hast eine Wolkenperle gefunden. Sie leuchtet in sieben verschiedenen Farben."],
  ["EINE NACHRICHT!", "Der Himmel lässt ausrichten: Du bist eine ausgezeichnete Entdeckerin."]
];

$("#surpriseButton").addEventListener("click", () => {
  const surprise = surprises[Math.floor(Math.random() * surprises.length)];
  showToast(surprise[0], surprise[1]);
  addStar();
});

// EASTER EGG: KLEINER GEHEIMKNOPF
$("#tinySecret").addEventListener("click", () => {
  secretClicks++;

  if (secretClicks >= 5) {
    secretClicks = 0;
    showToast("PSSST ...", "Es gibt eine achte Insel. Sie ist so klein, dass sie auf keiner Karte Platz hat. Suche unter dem Regenbogen!");
    addStar(2);
  }
});

// EASTER EGG: REGENBOGEN
$(".rainbow").addEventListener("click", () => {
  showToast("REGENBOGEN-MAGIE!", "Du hast den geheimen Regenbogen berührt. Für einen kurzen Moment leuchtet der ganze Himmel!");
  document.body.classList.add("rainbow-magic");
  setTimeout(() => document.body.classList.remove("rainbow-magic"), 1800);
});

// EASTER EGG: DOPPELKLICK AUF DIE SONNE
$(".sun").addEventListener("dblclick", () => {
  showToast("DIE SONNE HAT EINEN WUNSCH!", "Sie wünscht sich, dass du heute etwas Neues entdeckst. ☀️");
  addStar();
});

// POPUP
let toastTimeout;

function showToast(title, text) {
  $("#toastTitle").textContent = title;
  $("#toastText").textContent = text;
  $("#toast").classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    $("#toast").classList.remove("show");
  }, 6000);
}

$("#toastClose").addEventListener("click", () => {
  $("#toast").classList.remove("show");
});

// SCHWEBENDE STERNCHEN
function createParticles() {
  const container = $("#particles");

  for (let i = 0; i < 25; i++) {
    const particle = document.createElement("span");
    particle.textContent = ["✦", "✧", "·", "✺"][Math.floor(Math.random() * 4)];

    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 5 + "s";
    particle.style.fontSize = (8 + Math.random() * 14) + "px";

    container.appendChild(particle);
  }
}

// ZURÜCK-TASTE UND ESC
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeIsland();
    $("#toast").classList.remove("show");
  }
});

// GEHEIMNISVOLLER TASTENCODE: F W
let secretCode = "";

document.addEventListener("keydown", event => {
  secretCode += event.key.toLowerCase();
  secretCode = secretCode.slice(-2);

  if (secretCode === "fw") {
    showToast("DIE ACHTE WELT!", "Du hast den Code gefunden. Die achte Insel heisst Funkelwipfel. Dort wohnen die Hüter der Sterne.");
    addStar(5);
    secretCode = "";
  }
});
