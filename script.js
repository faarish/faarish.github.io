
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


fetch('https://ipinfo.io/json?token=350f28f6e72809')
  .then(response => response.json())
  .then(data => {
    console.log("Visitor IP Address:", data.ip);
    // You can also display it or send it to your server
    // Example: document.getElementById("visitor-ip").textContent = data.ip;
  })
  .catch(error => {
    console.error("Error fetching IP address:", error);
  });



document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);
  const successModal = document.getElementById("success-modal");
  const closeSuccess = document.getElementById("close-success");

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


const infoModal = document.getElementById("info-modal");
const closeInfo = document.getElementById("close-info");



function openModal(projectName) {
  const modal = document.getElementById("project-modal");
  const title = document.getElementById("project-title");
  const description = document.getElementById("project-description");

  // Set dynamic content
  title.textContent = projectName;

  // You can customize descriptions per project
  const descriptions = {
    "Inventory Web Application": "Developed a role-based inventory management system using ASP.NET MVC, Razor Pages, and Entity Framework (.NET 8). Implemented responsive UI with Bootstrap and jQuery, and used SQLite for development and SQL Server for production. Enabled stock tracking, requisitions, and departmental-level access controls..",
    "Fuel Bunk Billing Application": "Created a Windows-based billing application using VB.NET and Microsoft Access (via OLEDB). The system supports invoice generation, transaction recording, and daily expense tracking for a fuel station environment."
  };

  description.textContent = descriptions[projectName] || "No description available.";

  // Show modal
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








