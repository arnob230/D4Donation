function showNav() {
  var box = document.getElementById("nav-auth-slot");
  if (!box) { return; }

  box.innerHTML = '<a class="btn btn-secondary btn-small" href="login.html">Charity / Admin login</a>';
}

function showToast(message, isError) {
  var box = document.getElementById("toast");
  if (!box) {
    box = document.createElement("div");
    box.id = "toast";
    document.body.appendChild(box);
  }
  box.textContent = message;
  box.className = isError ? "show error" : "show";
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(function() { box.className = ""; }, 2500);
}

document.addEventListener("DOMContentLoaded", function() {
  showNav();
  var yearBox = document.getElementById("year");
  if (yearBox) { yearBox.textContent = new Date().getFullYear(); }
});
