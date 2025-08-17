const reference = " ";

const textLines = [
  "I promise to uphold the teachings of DeMolay.",
  "I will strive to be loyal to my friends and family.",
  "I will honor my obligations with sincerity and courage.",
  "I will respect the beliefs and rights of others.",
  "I will be faithful to my country and its laws.",
  "I will seek truth and wisdom in all my actions.",
  "I will support my fellow DeMolays in their journey.",
  "I will live a life of service, integrity, and honor.",
];

let words = [];
let hiddenIndexes = new Set();

const refEl = document.getElementById("reference");
const textEl = document.getElementById("text");
const hideBtn = document.getElementById("hideBtn");
const resetBtn = document.getElementById("resetBtn");
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");

function initGame() {
  refEl.textContent = reference;
  words = textLines.join(" ").split(" ");
  hiddenIndexes.clear();
  renderText();
  hideBtn.disabled = false;
  stopConfetti();
}

function renderText() {
  const display = words
    .map((word, i) => (hiddenIndexes.has(i) ? "_".repeat(word.length) : word))
    .join(" ");
  textEl.textContent = display;
}

function hideRandomWords(count = 3) {
  let availableIndexes = words
    .map((_, i) => i)
    .filter((i) => !hiddenIndexes.has(i));

  for (let i = 0; i < count && availableIndexes.length > 0; i++) {
    const randIndex =
      availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    hiddenIndexes.add(randIndex);
    availableIndexes = availableIndexes.filter((x) => x !== randIndex);
  }

  renderText();

if (hiddenIndexes.size === words.length) {
  hideBtn.disabled = true;
  textEl.innerHTML += "<br>🎉 All words are now hidden!";
  launchConfetti();
}

}

// 🎉 Confetti logic
let confettiParticles = [];
let confettiInterval;

function launchConfetti() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  confettiParticles = Array.from({ length: 150 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height - confettiCanvas.height,
    r: Math.random() * 6 + 4,
    color: ["#FFCF00", "#EAAB00", "#1E4488", "#1B365F"][
      Math.floor(Math.random() * 4)
    ],
    tilt: Math.random() * 10 - 10,
    tiltAngle: 0,
  }));
  if (confettiInterval) clearInterval(confettiInterval);
  confettiInterval = setInterval(drawConfetti, 30);
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach((p) => {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  updateConfetti();
}

function updateConfetti() {
  confettiParticles.forEach((p) => {
    p.y += 2;
    p.x += Math.sin(p.tiltAngle);
    p.tiltAngle += 0.05;
    if (p.y > confettiCanvas.height) {
      p.y = -10;
      p.x = Math.random() * confettiCanvas.width;
    }
  });
}

function stopConfetti() {
  if (confettiInterval) clearInterval(confettiInterval);
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

hideBtn.addEventListener("click", () => hideRandomWords(3));
resetBtn.addEventListener("click", initGame);

initGame();
