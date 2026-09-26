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

function saveDonation() {
  var donations = JSON.parse(localStorage.getItem("d4d_donations")) || [];

  var donation = {
    id: Date.now(),
    charityId: charityId,
    itemType: document.getElementById("itemType").value,
    description: document.getElementById("description").value,
    donorName: document.getElementById("donorName").value,
    phone: document.getElementById("phone").value,
    quantity: document.getElementById("quantity").value,
    address: document.getElementById("address").value,
    pickupTime: document.getElementById("pickupTime").value,
    status: "Pending"
  };

  donations.push(donation);
  localStorage.setItem("d4d_donations", JSON.stringify(donations));
}

document.addEventListener("DOMContentLoaded", function() {
  loadSelectedCharity();

  document.getElementById("donate-form").addEventListener("submit", function(e) {
    e.preventDefault();
    if (!charityId) {
      showToast("Please choose a charity first.", true);
      return;
    }

    saveDonation();
    showToast("Donation submitted successfully.");
    this.reset();
  });
});
