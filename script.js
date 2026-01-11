document.addEventListener("DOMContentLoaded", () => {

  // ===== LOGIN HANDLER =====
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    const messageEl = document.getElementById("login-message");

    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const username = document.getElementById("username")?.value?.trim() || "";
      const password = document.getElementById("password")?.value || "";

      if (!username || !password) {
        alert("Please enter both username and password.");
        return;
      }

      if (messageEl) {
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
          alert("Invalid username or password.");
        }
      }, 1500);
    });
  }

  // ===== DASHBOARD HANDLERS =====
  const sendForm = document.getElementById("send-money-form");
  const toggleBtn = document.getElementById("toggle-transfer-btn");
  const balanceEl = document.querySelector(".balance");
  const transactionsList = document.querySelector(".transactions-card ul");
  let totalBalance = balanceEl ? parseFloat(balanceEl.textContent.replace(/[$,]/g, "")) : 0;

  // Restore from localStorage
  let savedBalance = localStorage.getItem("totalBalance");
  if (savedBalance) {
  totalBalance = parseFloat(savedBalance);
  balanceEl.textContent = "$" + totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
  let savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
  savedTransactions.forEach(tx => {
  const li = document.createElement("li");
  li.classList.add(tx.type);
  li.innerHTML = `<span>${tx.text}</span><span>${tx.amount}</span>`;
  transactionsList.insertBefore(li, transactionsList.firstChild);
});

// Save to localStorage
localStorage.setItem("totalBalance", totalBalance);
savedTransactions.unshift({
  type: "expense",
  text: `Transfer to ${recipient} (${bank})${note ? " — " + note : ""}`,
  amount: "-$" + amount.toLocaleString()
});
localStorage.setItem("transactions", JSON.stringify(savedTransactions));
  
  // Toggle Transfer Form
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

  // Send Money Form Submission
  if (sendForm && balanceEl && transactionsList) {
    const amountInput = document.getElementById("amount");
    const recipientInput = document.getElementById("recipient");
    const bankSelect = document.getElementById("bank");
    const noteInput = document.getElementById("note");
    const sendBtn = document.getElementById("send-btn");

    sendForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const amount = parseFloat(amountInput.value);
      const recipient = recipientInput.value.trim();
      const bank = bankSelect.value;
      const note = noteInput.value.trim();

      if (!bank || !recipient || isNaN(amount) || amount <= 0) {
        alert("Please fill all required fields correctly.");
        return;
      }
      if (amount > totalBalance) {
        alert("Insufficient funds.");
        return;
      }

      sendBtn.disabled = true;
      const originalText = sendBtn.textContent;
      let dots = 0;
      sendBtn.textContent = "Processing";
      const loader = setInterval(() => {
        dots = (dots + 1) % 4;
        sendBtn.textContent = "Processing" + ".".repeat(dots);
      }, 400);

      setTimeout(() => {
        clearInterval(loader);

        // Update balance
        totalBalance -= amount;
        balanceEl.textContent = "$" + totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        // Add transaction
        const li = document.createElement("li");
        li.classList.add("expense");
        li.innerHTML = `<span>Transfer to ${recipient} (${bank})${note ? " — " + note : ""}</span><span>-$${amount.toLocaleString()}</span>`;
        transactionsList.insertBefore(li, transactionsList.firstChild);

        alert(`Transfer of $${amount.toLocaleString()} to ${recipient}${note ? " — " + note : ""} successful ✔`);

        sendForm.reset();
        sendBtn.disabled = false;
        sendBtn.textContent = originalText;
      }, 2000);
    });
  }

  // Logout Handler
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

});
