document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const menu = document.getElementById("mainNavbar");
  const navLinks = document.querySelectorAll(".navbar .nav-link");

  /*  Navbar shadow after scrolling */
  const handleScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  };
  handleScroll();
  window.addEventListener("scroll", handleScroll);

  /*  Close the mobile menu when a link is clicked */
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  /*  Highlight the nav link of the section in view */
  const watched = document.querySelectorAll(".hero, section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.classList.contains("hero")
          ? "top"
          : entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  watched.forEach((section) => observer.observe(section));

  /* 4. Contact form validation */
  const form = document.querySelector("#contact form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const submitBtn = form.querySelector("button[type='submit']");

  form.noValidate = true; // browser's popups off so ours show instead

  const status = document.createElement("div");
  status.className = "form-status";
  status.setAttribute("role", "status");
  form.appendChild(status);

  function showError(input, text) {
    input.classList.add("is-invalid");
    let msg = input.parentElement.querySelector(".invalid-feedback");
    if (!msg) {
      msg = document.createElement("div");
      msg.className = "invalid-feedback";
      input.parentElement.appendChild(msg);
    }
    msg.textContent = text;
  }

  function clearError(input) {
    input.classList.remove("is-invalid");
    const msg = input.parentElement.querySelector(".invalid-feedback");
    if (msg) msg.remove();
  }

  function validate() {
    let valid = true;
    [nameInput, emailInput, messageInput].forEach(clearError);

    if (nameInput.value.trim().length < 2) {
      showError(nameInput, "Please enter your name (at least 2 characters).");
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, "Please enter a valid email address.");
      valid = false;
    }

    if (messageInput.value.trim().length < 10) {
      showError(messageInput, "Please tell us a little more (at least 10 characters).");
      valid = false;
    }

    return valid;
  }

  // Remove an error as soon as the user starts fixing it
  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", () => clearError(input));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    if (!validate()) return;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    setTimeout(() => {
      status.textContent =
        "Thank you, " + nameInput.value.trim() + "! We'll reply to " +
        emailInput.value.trim() + " soon.";
      status.className = "form-status success";
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send enquiry <i class="bi bi-arrow-up-right"></i>';
    }, 900);
  });
});
