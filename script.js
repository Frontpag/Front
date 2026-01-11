document.addEventListener("DOMContentLoaded", () => {
  // ----- Toggle Transfer Form -----
  const toggleBtn = document.getElementById("toggle-transfer-btn");
  const sendForm = document.getElementById("send-money-form");

  if (toggleBtn && sendForm) {
    toggleBtn.addEventListener("click", () => {
      if (sendForm.style.display === "none") {
        sendForm.style.display = "block";
        toggleBtn.textContent = "Hide Transfer Form";
      } else {
        sendForm.style.display = "none";
        toggleBtn.textContent = "Transfer Funds";
      }
    });
  }

  // ----- Balance Element -----
  const balanceEl = document.querySelector(".balance");
  let totalBalance = parseFloat(balanceEl.textContent.replace(/[$,]/g, ""));

  // ----- Recent Transactions List -----
  const transactionsList = document.querySelector(".transactions-card ul");

  // ----- Send Money Form -----
  if (sendForm) {
  const amountInput = document.getElementById("amount");
  const recipientInput = document.getElementById("recipient");
  const bankSelect = document.getElementById("bank");
  const noteInput = document.getElementById("note"); // optional note field
  const sendBtn = document.getElementById("send-btn");

  sendForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const recipient = recipientInput.value;
    const bank = bankSelect.value;
    const note = noteInput.value.trim(); // grab note text

    // Validation
    if (!bank) {
      alert("Please select a bank.");
      return;
    }
    if (!recipient) {
      alert("Enter recipient name.");
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      alert("Enter a valid amount.");
      return;
    }
    if (amount > totalBalance) {
      alert("Insufficient funds.");
      return;
    }

    // Disable button and show processing animation
    sendBtn.disabled = true;
    let dots = 0;
    const originalText = sendBtn.textContent;
    sendBtn.textContent = "Processing";

    const loader = setInterval(() => {
      dots = (dots + 1) % 4;
      sendBtn.textContent = "Processing" + ".".repeat(dots);
    }, 400);

    setTimeout(() => {
      clearInterval(loader);

      // Deduct balance
      totalBalance -= amount;
      balanceEl.textContent =
        "$" +
        totalBalance.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

      // Add to Recent Transactions with note
      const li = document.createElement("li");
      li.classList.add("expense");
      li.innerHTML = `<span>Transfer to ${recipient} (${bank})${
        note ? " — " + note : ""
      }</span><span>-$${amount.toLocaleString()}</span>`;
      transactionsList.insertBefore(li, transactionsList.firstChild);

      // Success alert including note
      alert(
        `Transfer of $${amount.toLocaleString()} to ${recipient}${
          note ? " — " + note : ""
        } successful ✔`
      );

      // Reset form
      sendForm.reset();
      sendBtn.disabled = false;
      sendBtn.textContent = originalText;
    }, 2000);
  });
}

  // ----- Logout handler -----
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username")?.value?.trim() || "";
    const password = document.getElementById("password")?.value || "";
    const messageEl = document.getElementById("login-message");

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    if (messageEl) { // ✅ check exists
      messageEl.style.color = "blue";
      messageEl.textContent = "Checking credentials...";
    }

    setTimeout(() => {
      if (username === "John Williams" && password === "Password123") {
        if (messageEl) { 
          messageEl.style.color = "green";
          messageEl.textContent = "Login successful! Redirecting...";
        }
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1000);
      } else {
        if (messageEl) {
          messageEl.style.color = "red";
          messageEl.textContent = "Invalid username or password.";
        }
        alert("Invalid username or password."); // fallback if no messageEl
      }
    }, 1500);
  });
}
