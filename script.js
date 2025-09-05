// Typing effect
const typedText = document.getElementById("typed-text");
const phrases = ["Digital Craftsman", "Product Builder", "Creative Designer", "Technology Explorer", "Future Innovator", "Full-Stack Developer"];
let index = 0, charIndex = 0;

function type() {
  if (charIndex < phrases[index].length) {
    typedText.textContent += phrases[index].charAt(charIndex++);
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typedText.textContent = phrases[index].substring(0, --charIndex);
    setTimeout(erase, 50);
  } else {
    index = (index + 1) % phrases.length;
    setTimeout(type, 500);
  }
}

document.addEventListener("DOMContentLoaded", type);

// Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Fetch IP and store in hidden input
function fetchIP() {
  return fetch("https://ipinfo.io/json?token=350f28f6e72809")
    .then(response => response.json())
    .then(data => {
      console.log("Visitor IP Address:", data.ip);
      document.getElementById("ip_address").value = data.ip;
      return data.ip;
    })
    .catch(error => {
      console.error("Error fetching IP address:", error);
      return null;
    });
}

// Contact form submission
document.getElementById("contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const successModal = document.getElementById("success-modal");
  const closeSuccess = document.getElementById("close-success");

  // Ensure IP is filled before sending
  let ip = document.getElementById("ip_address").value;
  if (!ip) {
    ip = await fetchIP();
    if (ip) document.getElementById("ip_address").value = ip;
  }

  const data = new FormData(form);

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: data
  })
    .then(response => {
      if (response.ok) {
        form.reset();
        successModal.style.display = "flex";
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    })
    .catch(error => {
      alert("⚠️ Network error. Please check your connection.");
    });

  closeSuccess.onclick = () => {
    successModal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === successModal) {
      successModal.style.display = "none";
    }
  };
});

// Project modal logic
function openModal(projectName) {
  const modal = document.getElementById("project-modal");
  const title = document.getElementById("project-title");
  const description = document.getElementById("project-description");

  title.textContent = projectName;

  const descriptions = {
    "Inventory Web Application": "Developed a role-based inventory management system using ASP.NET MVC, Razor Pages, and Entity Framework (.NET 8). Implemented responsive UI with Bootstrap and jQuery, and used SQLite for development and SQL Server for production. Enabled stock tracking, requisitions, and departmental-level access controls.",
    "Fuel Bunk Billing Application": "Created a Windows-based billing application using VB.NET and Microsoft Access (via OLEDB). The system supports invoice generation, transaction recording, and daily expense tracking for a fuel station environment."
  };

  description.textContent = descriptions[projectName] || "No description available.";

  modal.style.display = "flex";
}

// Close modal logic
document.getElementById("close-project").onclick = () => {
  document.getElementById("project-modal").style.display = "none";
};

window.onclick = (event) => {
  const modal = document.getElementById("project-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

const skillsContainer = document.querySelector(".skills-container");
const topGradient = document.querySelector(".top-gradient");
const bottomGradient = document.querySelector(".bottom-gradient");

skillsContainer.addEventListener("scroll", () => {
  // Hide top gradient when scrolled to top
  if (skillsContainer.scrollTop === 0) {
    topGradient.style.opacity = "0";
  } else {
    topGradient.style.opacity = "1";
  }

  // Hide bottom gradient when scrolled to bottom
  if (skillsContainer.scrollHeight - skillsContainer.scrollTop === skillsContainer.clientHeight) {
    bottomGradient.style.opacity = "0";
  } else {
    bottomGradient.style.opacity = "1";
  }
});

// Initialize on load
skillsContainer.dispatchEvent(new Event("scroll"));
