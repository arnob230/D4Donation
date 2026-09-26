function loadFeaturedCharities() {
  fetch("charity-detail.html")
    .then(function(response) { return response.text(); })
    .then(function(html) {
      var doc = new DOMParser().parseFromString(html, "text/html");
      var cards = doc.querySelectorAll(".charity-data");
      var box = document.getElementById("featured-charities");
      var output = "";

      for (var i = 0; i < cards.length && i < 3; i++) {
        var card = cards[i];
        output += createCharityCard(card);
      }

      box.innerHTML = output;
    })
    .catch(function() {
      document.getElementById("featured-charities").innerHTML =
        '<div class="empty-box">Charity information could not be loaded.</div>';
    });
}

function createCharityCard(card) {
  var id = card.getAttribute("data-id");
  var name = card.getAttribute("data-name");
  var category = card.getAttribute("data-category");
  var image = card.querySelector("img").getAttribute("src");
  var description = card.querySelector(".description").textContent;

  return '<div class="card">' +
    '<img src="' + image + '" alt="' + name + '">' +
    '<div class="card-body">' +
      '<div class="tag">' + category + '</div>' +
      '<h3>' + name + '</h3>' +
      '<p>' + description + '</p>' +
      '<div class="card-footer">' +
        '<a href="charity-detail.html?id=' + id + '" class="btn btn-secondary btn-small">View charity</a>' +
      '</div>' +
    '</div>' +
  '</div>';
}

document.addEventListener("DOMContentLoaded", function() {
  loadFeaturedCharities();
});
