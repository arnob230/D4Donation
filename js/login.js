function handleLogin(e) {
  e.preventDefault();

  var role = document.getElementById("login-role").value;
  var username = document.getElementById("login-email").value.trim().toLowerCase();
  var password = document.getElementById("login-password").value;

  if (role === "admin" && username === "admin" && password === "admin123") {
    localStorage.setItem("d4d_role", "admin");
    localStorage.removeItem("d4d_charity_id");
    showToast("Admin login successful.");
    setTimeout(function() { window.location.href = "admin-dashboard.html"; }, 500);
    return;
  }

  var charities = {
    "asha": "asha",
    "prottasha": "prottasha",
    "alor": "alor-pathshala",
    "sheba": "sheba-sangstha",
    "manobik": "manobik-shakti",
    "notunbhor": "notun-bhor"
  };

  if (role === "charity" && password === "charity123" && charities[username]) {
    localStorage.setItem("d4d_role", "charity");
    localStorage.setItem("d4d_charity_id", charities[username]);
    showToast("Charity login successful.");
    setTimeout(function() { window.location.href = "charity-dashboard.html"; }, 500);
    return;
  }

  showToast("Incorrect username, password, or account type.", true);
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("login-form").addEventListener("submit", handleLogin);
});
