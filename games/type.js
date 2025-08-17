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

const container = document.getElementById("lines-container");
const input = document.getElementById("input");
const feedback = document.getElementById("feedback");
let currentIndex = 0;

lines.forEach((line, i) => {
  const div = document.createElement("div");
  div.className = "line";
  div.id = `line-${i}`;
  div.textContent = line;
  container.appendChild(div);
});

input.addEventListener("input", () => {
  const userInput = input.value.trim();
  const currentLine = lines[currentIndex];

  if (userInput.toLowerCase() === currentLine.toLowerCase()) {
    document.getElementById(`line-${currentIndex}`).classList.add("correct");
    currentIndex++;
    input.value = "";
    feedback.textContent = "Nice! Keep going.";

    if (currentIndex === lines.length) {
      feedback.textContent = "🎉 You did it!";
      launchConfetti();
    }
  } else {
    feedback.textContent = "Keep trying...";
  }
});

// 🎉 Confetti animation
function launchConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 10,
    color: ["#FFCF00", "#EAAB00", "#1E4488", "#1B365F"][
      Math.floor(Math.random() * 4)
    ],
    tilt: Math.floor(Math.random() * 10) - 10,
    tiltAngle: 0,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    update();
  }

  function update() {
    particles.forEach((p) => {
      p.y += Math.cos(p.d) + 1 + p.r / 2;
      p.x += Math.sin(p.d);
      if (p.y > canvas.height) p.y = -10;
    });
  }

  setInterval(draw, 30);
}
