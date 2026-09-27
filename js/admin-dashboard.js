function loadCharityNames(callback) {
  fetch("charity-detail.html")
    .then(function(response) { return response.text(); })
    .then(function(html) {
      var doc = new DOMParser().parseFromString(html, "text/html");
      var cards = doc.querySelectorAll(".charity-data");
      var names = {};

      for (var i = 0; i < cards.length; i++) {
        names[cards[i].getAttribute("data-id")] = cards[i].getAttribute("data-name");
      }

      callback(names);
    });
}

function loadAdminData() {
  var donations = JSON.parse(localStorage.getItem("d4d_donations")) || [];
  var requests = JSON.parse(localStorage.getItem("d4d_requests")) || [];

  var pendingDonations = donations.filter(function(x){ return (x.status || "Pending") === "Pending"; }).length;
  var pendingRequests = requests.filter(function(x){ return (x.status || "Pending") === "Pending"; }).length;

  document.getElementById("stat-row").innerHTML =
    '<div class="stat-box"><b>6</b>Charity accounts</div>' +
    '<div class="stat-box"><b>' + donations.length + '</b>Donations</div>' +
    '<div class="stat-box"><b>' + requests.length + '</b>Help requests</div>' +
    '<div class="stat-box"><b>' + (pendingDonations + pendingRequests) + '</b>Pending reviews</div>';

  loadCharityNames(function(names) {
    var rows = '';

    for (var i = 0; i < donations.length; i++) {
      rows += '<tr>' +
        '<td>' + donations[i].donorName + '</td>' +
        '<td>' + donations[i].phone + '</td>' +
        '<td>Donation</td>' +
        '<td>' + (names[donations[i].charityId] || donations[i].charityId) + '</td>' +
        '<td><b class="badge ' + (donations[i].status === 'Accepted' ? 'badge-accepted' : donations[i].status === 'Completed' ? 'badge-completed' : donations[i].status === 'Denied' ? 'badge-rejected' : 'badge-pending') + '">' + (donations[i].status || 'Pending') + '</b></td>' +
      '</tr>';
    }

    for (var j = 0; j < requests.length; j++) {
      rows += '<tr>' +
        '<td>' + requests[j].requesterName + '</td>' +
        '<td>' + requests[j].phone + '</td>' +
        '<td>Help request</td>' +
        '<td>' + (names[requests[j].charityId] || requests[j].charityId) + '</td>' +
        '<td><b class="badge ' + (requests[j].status === 'Accepted' ? 'badge-accepted' : requests[j].status === 'Completed' ? 'badge-completed' : requests[j].status === 'Denied' ? 'badge-rejected' : 'badge-pending') + '">' + requests[j].status + '</b></td>' +
      '</tr>';
    }

    if (!rows) {
      rows = '<tr><td colspan="5">No donation or help request has been submitted yet.</td></tr>';
    }

    var table = document.querySelector("table");
    table.querySelector("thead").innerHTML = '<tr><th>Name</th><th>Phone</th><th>Type</th><th>Charity</th><th>Status</th></tr>';
    document.getElementById("user-table-body").innerHTML = rows;
  });
}

document.addEventListener("DOMContentLoaded", loadAdminData);
