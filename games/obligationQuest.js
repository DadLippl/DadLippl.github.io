const lines = [
  "I promise to uphold the teachings of DeMolay.",
  "I will strive to be loyal to my friends and family.",
  "I will honor my obligations with sincerity and courage.",
  "I will respect the beliefs and rights of others.",
  "I will be faithful to my country and its laws.",
  "I will seek truth and wisdom in all my actions.",
  "I will support my fellow DeMolays in their journey.",
  "I will live a life of service, integrity, and honor.",
];

let currentLine = 0;
let xp = 0;

document.getElementById("totalLines").textContent = lines.length;
updateXPBar();
showHint();

const affirmations = [
  "You're crushing it! 💪",
  "Honor and courage—you're living it!",
  "Keep going, future Master!",
  "Your memory is a fortress 🏰",
  "DeMolay would be proud!",
];

function checkAnswer() {
  const input = document.getElementById("userInput").value.trim();
  const feedback = document.getElementById("feedback");

  if (input.toLowerCase() === lines[currentLine].toLowerCase()) {
    const message =
      affirmations[Math.floor(Math.random() * affirmations.length)];
    feedback.textContent = `✅ Correct! ${message}`;
    feedback.style.color = "#99ff99";
    xp += 10;
    updateXPBar();
    showBadge(xp);

    // Auto-advance after 1 second
    setTimeout(() => {
      nextLine();
    }, 1000);
  } else {
    feedback.textContent = "❌ Try again!";
    feedback.style.color = "#ff6666";
  }
}

function nextLine() {
  currentLine++;
  const progress = document.getElementById("progress");
  const feedback = document.getElementById("feedback");

  if (currentLine < lines.length) {
    document.getElementById("linePrompt").textContent = `Line ${
      currentLine + 1
    }: Memorize and type the:`;
    document.getElementById("userInput").value = "";
    feedback.textContent = "";
    showHint();
    progress.textContent = `Progress: ${currentLine} / ${lines.length}`;
    document.getElementById("lineReveal").textContent = "";
  } else {
    feedback.textContent = "";
    progress.textContent = `Progress: ${lines.length} / ${lines.length}`;
    document.getElementById("congratsMessage").style.display = "block";
    document.getElementById("restartBtn").style.display = "inline-block";
    launchConfetti();
  }
}

function playAudio() {
  const line = lines[currentLine];
  const utterance = new SpeechSynthesisUtterance(line);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

function showHint() {
  const hint = document.getElementById("hint");
  const words = lines[currentLine].split(" ");
  hint.textContent = `Hint: Starts with "${words[0]}" and ends with "${
    words[words.length - 1]
  }"`;
}

function seeLine() {
  const lineReveal = document.getElementById("lineReveal");
  lineReveal.textContent = `"${lines[currentLine]}"`;
  lineReveal.style.color = "#FFCF00";
  lineReveal.style.fontStyle = "italic";
}

function showBadge(xp) {
  const badgeArea = document.getElementById("badgeArea");
  badgeArea.innerHTML = "";

  let badgeHTML = "";
  if (xp >= 20 && xp < 50) {
    badgeHTML = `<div class="badge animated">🎖️ Apprentice</div>`;
  } else if (xp >= 50 && xp < 80) {
    badgeHTML = `<div class="badge animated">🏅 Knight</div>`;
  } else if (xp >= 80) {
    badgeHTML = `<div class="badge animated">👑 Master of Obligation</div>`;
  }

  badgeArea.innerHTML = badgeHTML;
}

function updateXPBar() {
  const xpBar = document.getElementById("xpBar");
  if (xpBar) {
    xpBar.style.width = `${(xp / 80) * 100}%`;
  }
}

function launchConfetti() {
  const colors = ["#FFCF00", "#EAAB00", "#1E4488", "#1B365F"];
  for (let i = 0; i < 120; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.top = "-10px";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = Math.random() * 2 + 2.2 + "s";
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 5200);
  }
}

function restartGame() {
  currentLine = 0;
  xp = 0;
  document.getElementById("userInput").value = "";
  document.getElementById(
    "linePrompt"
  ).textContent = `Line 1: Memorize and type the:`;
  document.getElementById(
    "progress"
  ).textContent = `Progress: 0 / ${lines.length}`;
  document.getElementById("feedback").textContent = "";
  document.getElementById("hint").textContent = "";
  document.getElementById("badgeArea").innerHTML = "";
  document.getElementById("congratsMessage").style.display = "none";
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("lineReveal").textContent = "";
  updateXPBar();
  showHint();
}

// Mobile menu toggle (guarded in case elements don't exist)
const mobileToggle = document.getElementById("mobile-menu");
const navLinks = document.getElementById("nav-links");
if (mobileToggle && navLinks) {
  mobileToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}
