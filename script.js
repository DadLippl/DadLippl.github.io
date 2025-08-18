fetch("./nav.txt")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("nav-placeholder").innerHTML = html;

    // Now bind menu toggle AFTER nav is in place
    const menuToggle = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        // Accessibility
        menuToggle.setAttribute(
          "aria-expanded",
          navLinks.classList.contains("active")
        );
      });
    }
  })
  .catch((err) => console.error("Nav load failed:", err));
