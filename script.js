// Lightweight client-side handlers.
// IMPORTANT: This example assumes real auth/transactions are handled on the server.
// Do NOT keep real credentials or transaction logic entirely in front-end code.

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const logoutBtn = document.getElementById("logout-btn");
  const sendForm = document.getElementById("send-form");

  if (loginForm) loginForm.addEventListener("submit", handleLogin);
  if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);
  if (sendForm) sendForm.addEventListener("submit", handleSendMoney);
});

function handleLogin(event) {
  event.preventDefault();

  const username = (document.getElementById("username") || {}).value?.trim() || "";
  const password = (document.getElementById("password") || {}).value || "";
  const messageEl = document.getElementById("login-message");

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  // Show loading message first
  messageEl.style.color = "blue";
  messageEl.textContent = "Checking credentials...";

  // Simulate server delay (e.g., 1.5 seconds)
  setTimeout(() => {
    if (username === "John Williams" && password === "Password123") {
      messageEl.style.color = "green";
      messageEl.textContent = "Login successful! Redirecting...";

      setTimeout(() => {
        window.location.href = "dashboard.html"; // redirect after a short pause
      }, 1000); // 1 second delay before redirect
    } else {
      messageEl.style.color = "red";
      messageEl.textContent = "Invalid username or password.";
    }
  }, 1500); // 1.5 seconds loading
}


function handleLogout(event) {
  // If you use server-side sessions, call logout endpoint first (optional).
  // Example:
  // await fetch('/api/logout', { method: 'POST', credentials: 'same-origin' });
  window.location.href = "index.html";
}

document.getElementById("send-money-form").addEventListener("submit", function(e) {
  e.preventDefault(); // prevent form from reloading page

  const bank = document.getElementById("bank").value;
  const account = document.getElementById("account").value;
  const recipient = document.getElementById("recipient").value;
  const amount = document.getElementById("amount").value;
  const note = document.getElementById("note").value;

  if (!bank || !account || !recipient || !amount) {
    alert("Please fill all required fields!");
    return;
  }

  alert(`Successfully sent $${amount} to ${recipient} (${bank})`);
  this.reset(); // clear form
});
