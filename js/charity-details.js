function getCharityFromPage(id, doc) {
  var cards = doc.querySelectorAll(".charity-data");

  for (var i = 0; i < cards.length; i++) {
    if (cards[i].getAttribute("data-id") === id) {
      return cards[i];
    }
  }

  return null;
}

function loadCharityDetail() {
  var id = new URLSearchParams(window.location.search).get("id");
  var box = document.getElementById("charity-detail-box");

  if (!id) {
    box.innerHTML = '<div class="empty-box">Choose a charity from the <a href="charities.html">Charities</a> page.</div>';
    return;
  }

  fetch("charity-details.html")
    .then(function(response) { return response.text(); })
    .then(function(html) {
      var doc = new DOMParser().parseFromString(html, "text/html");
      var charity = getCharityFromPage(id, doc);

      if (!charity) {
        box.innerHTML = '<div class="empty-box">This charity could not be found. <a href="charities.html">Go back</a>.</div>';
        return;
      }

      var name = charity.getAttribute("data-name");
      var category = charity.getAttribute("data-category");
      var location = charity.getAttribute("data-location");
      var image = charity.querySelector("img").getAttribute("src");
      var description = charity.querySelector(".description").textContent;
      var mission = charity.querySelector(".mission").textContent;
      var contact = charity.querySelector(".contact").textContent;

      box.innerHTML =
        '<div class="detail-top">' +
          '<img src="' + image + '" alt="' + name + '">' +
          '<div class="detail-info">' +
            '<div class="tag">' + category + '</div>' +
            '<h1>' + name + '</h1>' +
            '<p><b>' + location + '</b></p>' +
            '<p>' + description + '</p>' +
            '<p>' + mission + '</p>' +
            '<p>' + contact + '</p>' +
            '<div class="hero-buttons" style="justify-content:flex-start;">' +
              '<a href="donate.html?charity=' + id + '" class="btn btn-primary">Donate something</a>' +
              '<a href="request.html?charity=' + id + '" class="btn btn-secondary">Request help</a>' +
            '</div>' +
          '</div>' +
        '</div>';

      document.title = name + " - D4Donation";
    });
}

document.addEventListener("DOMContentLoaded", function() {
  loadCharityDetail();
});
