function loadCharityGrid() {
  fetch("charity-details.html")
    .then(function(response) { return response.text(); })
    .then(function(html) {
      var doc = new DOMParser().parseFromString(html, "text/html");
      var cards = doc.querySelectorAll(".charity-data");
      var box = document.getElementById("charity-grid");
      var output = "";

      for (var i = 0; i < cards.length; i++) {
        output += createCharityCard(cards[i]);
      }

      box.innerHTML = output;
    })
    .catch(function() {
      document.getElementById("charity-grid").innerHTML =
        '<div class="empty-box">Charity information could not be loaded.</div>';
    });
}

function createCharityCard(card) {
  var id = card.getAttribute("data-id");
  var name = card.getAttribute("data-name");
  var category = card.getAttribute("data-category");
  var location = card.getAttribute("data-location");
  var image = card.querySelector("img").getAttribute("src");
  var description = card.querySelector(".description").textContent;

  return '<div class="card">' +
    '<img src="' + image + '" alt="' + name + '">' +
    '<div class="card-body">' +
      '<div class="tag">' + category + '</div>' +
      '<h3>' + name + '</h3>' +
      '<p>' + location + '</p>' +
      '<p>' + description + '</p>' +
      '<div class="card-footer">' +
        '<a href="charity-details.html?id=' + id + '" class="btn btn-secondary btn-small">View charity</a>' +
      '</div>' +
    '</div>' +
  '</div>';
}

document.addEventListener("DOMContentLoaded", function() {
  loadCharityGrid();
});
