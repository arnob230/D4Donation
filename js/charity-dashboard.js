function loadCharityDashboard() {
  var role = localStorage.getItem("d4d_role");
  var charityId = localStorage.getItem("d4d_charity_id");

  if (role !== "charity" || !charityId) {
    window.location.href = "login.html";
    return;
  }

  var donations = JSON.parse(localStorage.getItem("d4d_donations")) || [];
  var requests = JSON.parse(localStorage.getItem("d4d_requests")) || [];

  donations = donations.filter(function(item) { return item.charityId === charityId; });
  requests = requests.filter(function(item) { return item.charityId === charityId; });

  document.getElementById("charity-title").textContent = "Charity dashboard";
  renderStats(donations, requests);
  renderDonations(donations);
  renderRequests(requests);

  document.getElementById("tab-btn-donations").addEventListener("click", function() { showDashboardTab("donations"); });
  document.getElementById("tab-btn-requests").addEventListener("click", function() { showDashboardTab("requests"); });
}

function renderStats(donations, requests) {
  var pendingDonations = donations.filter(function(x) { return x.status === "Pending"; }).length;
  var pendingRequests = requests.filter(function(x) { return x.status === "Pending"; }).length;
  var acceptedDonations = donations.filter(function(x) { return x.status === "Accepted"; }).length;
  var completedDonations = donations.filter(function(x) { return x.status === "Completed"; }).length;
  var acceptedRequests = requests.filter(function(x) { return x.status === "Accepted"; }).length;
  var completedRequests = requests.filter(function(x) { return x.status === "Completed"; }).length;

  document.getElementById("stat-row").innerHTML =
    '<div class="stat-box"><b>' + donations.length + '</b>Total donations</div>' +
    '<div class="stat-box"><b>' + requests.length + '</b>Total help requests</div>' +
    '<div class="stat-box"><b>' + (pendingDonations + pendingRequests) + '</b>Pending reviews</div>' +
    '<div class="stat-box"><b>' + (acceptedDonations + completedDonations + acceptedRequests + completedRequests) + '</b>Accepted / completed</div>';
}

function renderDonations(donations) {
  var donationHtml = '';

  for (var i = 0; i < donations.length; i++) {
    var donation = donations[i];
    var status = donation.status || "Pending";
    var actions = '';

    if (status === "Pending") {
      actions =
        '<button type="button" class="btn btn-primary btn-small" onclick="updateDonationStatus(' + donation.id + ', \'Accepted\')">Accept</button>' +
        '<button type="button" class="btn btn-danger btn-small" onclick="updateDonationStatus(' + donation.id + ', \'Denied\')">Deny</button>';
    } else if (status === "Accepted") {
      actions = '<button type="button" class="btn btn-primary btn-small" onclick="updateDonationStatus(' + donation.id + ', \'Completed\')">Complete</button>';
    }

    donationHtml +=
      '<div class="record">' +
        '<div class="record-details">' +
          '<b>' + donation.itemType + ': ' + donation.description + '</b>' +
          '<small>From: ' + donation.donorName + ' - ' + donation.phone + '</small>' +
          '<small>Quantity: ' + donation.quantity + ' - Pickup: ' + donation.address + '</small>' +
        '</div>' +
        '<div class="record-actions">' +
          '<b class="badge ' + getStatusClass(status) + '">' + status + '</b>' +
          actions +
        '</div>' +
      '</div>';
  }

  if (!donationHtml) donationHtml = '<div class="empty-box">No donations submitted yet.</div>';
  document.getElementById("donations-list").innerHTML = donationHtml;
}

function renderRequests(requests) {
  var requestHtml = '';

  for (var i = 0; i < requests.length; i++) {
    var request = requests[i];
    var actions = '';

    if (request.status === "Pending") {
      actions =
        '<button type="button" class="btn btn-primary btn-small" onclick="updateRequestStatus(' + request.id + ', \'Accepted\')">Accept</button>' +
        '<button type="button" class="btn btn-danger btn-small" onclick="updateRequestStatus(' + request.id + ', \'Denied\')">Deny</button>';
    } else if (request.status === "Accepted") {
      actions = '<button type="button" class="btn btn-primary btn-small" onclick="updateRequestStatus(' + request.id + ', \'Completed\')">Complete</button>';
    }

    requestHtml +=
      '<div class="record">' +
        '<div class="record-details">' +
          '<b>' + request.itemNeeded + ': ' + request.description + '</b>' +
          '<small>From: ' + request.requesterName + ' - ' + request.phone + '</small>' +
          '<small>Address: ' + request.address + '</small>' +
        '</div>' +
        '<div class="record-actions">' +
          '<b class="badge ' + getStatusClass(request.status) + '">' + request.status + '</b>' +
          actions +
        '</div>' +
      '</div>';
  }

  if (!requestHtml) requestHtml = '<div class="empty-box">No help requests submitted yet.</div>';
  document.getElementById("requests-list").innerHTML = requestHtml;
}

function getStatusClass(status) {
  if (status === "Accepted") return "badge-accepted";
  if (status === "Completed") return "badge-completed";
  if (status === "Denied") return "badge-rejected";
  return "badge-pending";
}

function updateDonationStatus(donationId, newStatus) {
  var donations = JSON.parse(localStorage.getItem("d4d_donations")) || [];
  var changed = false;

  for (var i = 0; i < donations.length; i++) {
    if (donations[i].id === donationId) {
      donations[i].status = newStatus;
      changed = true;
      break;
    }
  }

  if (!changed) return;

  localStorage.setItem("d4d_donations", JSON.stringify(donations));
  showToast("Donation marked as " + newStatus + ".");
  reloadCharityDashboardData();
}

function updateRequestStatus(requestId, newStatus) {
  var requests = JSON.parse(localStorage.getItem("d4d_requests")) || [];
  var changed = false;

  for (var i = 0; i < requests.length; i++) {
    if (requests[i].id === requestId) {
      requests[i].status = newStatus;
      changed = true;
      break;
    }
  }

  if (!changed) return;

  localStorage.setItem("d4d_requests", JSON.stringify(requests));
  showToast("Request marked as " + newStatus + ".");
  reloadCharityDashboardData();
}

function reloadCharityDashboardData() {
  var charityId = localStorage.getItem("d4d_charity_id");
  var donations = JSON.parse(localStorage.getItem("d4d_donations")) || [];
  var requests = JSON.parse(localStorage.getItem("d4d_requests")) || [];

  donations = donations.filter(function(item) { return item.charityId === charityId; });
  requests = requests.filter(function(item) { return item.charityId === charityId; });

  renderStats(donations, requests);
  renderDonations(donations);
  renderRequests(requests);
}

function showDashboardTab(tabName) {
  document.getElementById("tab-btn-donations").className = tabName === "donations" ? "tab-button active" : "tab-button";
  document.getElementById("tab-btn-requests").className = tabName === "requests" ? "tab-button active" : "tab-button";
  document.getElementById("donations-list").style.display = tabName === "donations" ? "block" : "none";
  document.getElementById("requests-list").style.display = tabName === "requests" ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", loadCharityDashboard);
