document.getElementById("adminLoginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Dummy credentials
  if (username === "chaand" && password === "354061") {
    alert("Login successful! Redirecting to dashboard...");
    window.location.href = "admin-dashboard.html";
  } else {
    alert("Invalid credentials. Please try again.");
  }
});

// For demo: handle action buttons
document.querySelectorAll(".confirm-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Booking confirmed!");
  });
});

document.querySelectorAll(".reschedule-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Redirecting to reschedule...");
  });
});

document.querySelectorAll(".contact-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Opening contact options...");
  });
});

