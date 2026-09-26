var charityId = new URLSearchParams(window.location.search).get("charity");

function loadSelectedCharity() {
  if (!charityId) {
    document.getElementById("charity-name").textContent = "a charity";
    return;
  }

  fetch("charity-detail.html")
    .then(function(response) { return response.text(); })
    .then(function(html) {
      var doc = new DOMParser().parseFromString(html, "text/html");
      var cards = doc.querySelectorAll(".charity-data");
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].getAttribute("data-id") === charityId) {
          document.getElementById("charity-name").textContent = cards[i].getAttribute("data-name");
          return;
        }
      }
    });
}

function saveRequest() {
  var requests = JSON.parse(localStorage.getItem("d4d_requests")) || [];

  var request = {
    id: Date.now(),
    charityId: charityId,
    itemNeeded: document.getElementById("itemNeeded").value,
    description: document.getElementById("description").value,
    requesterName: document.getElementById("requesterName").value,
    phone: document.getElementById("phone").value,
    quantity: document.getElementById("quantity").value,
    address: document.getElementById("address").value,
    status: "Pending"
  };

  requests.push(request);
  localStorage.setItem("d4d_requests", JSON.stringify(requests));
}

document.addEventListener("DOMContentLoaded", function() {
  loadSelectedCharity();

  document.getElementById("request-form").addEventListener("submit", function(e) {
    e.preventDefault();
    if (!charityId) {
      showToast("Please choose a charity first.", true);
      return;
    }

    saveRequest();
    showToast("Help request sent for review.");
    this.reset();
  });
});
