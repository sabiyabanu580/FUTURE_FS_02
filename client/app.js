const API = "http://localhost:5000/api/leads";

/* =====================================================
   ADD LEAD (INDEX PAGE)
===================================================== */
async function addLead() {

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");

  if (!nameInput) return;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !email || !phone) {
    alert("Please fill all fields");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone })
  });

  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";

  loadLeads();
  loadDashboard();
}


/* =====================================================
   LOAD LEADS LIST (INDEX PAGE)
===================================================== */
async function loadLeads() {

  const list = document.getElementById("leadList");
  if (!list) return; // only run on leads page

  const res = await fetch(API + "?t=" + Date.now());
  const leads = await res.json();

  list.innerHTML = "";

  leads.forEach(l => {
    list.innerHTML += `
      <li>
        <strong>${l.name}</strong><br>
        ${l.email} | ${l.phone}

        <button class="delete-btn"
          onclick="deleteLead('${l._id}')">
          Delete
        </button>
      </li>
    `;
  });
}


/* =====================================================
   DELETE LEAD
===================================================== */
async function deleteLead(id) {

  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  loadLeads();
  loadDashboard();
}


/* =====================================================
   DASHBOARD STATS
===================================================== */
async function loadStats() {

  const totalEl = document.getElementById("totalLeads");
  if (!totalEl) return; // dashboard only

  const res = await fetch(API + "/stats?t=" + Date.now());
  const stats = await res.json();

  document.getElementById("totalLeads").innerText =
    stats.totalLeads;

  document.getElementById("newLeads").innerText =
    stats.newLeads;

  const conversion =
    stats.totalLeads === 0
      ? 0
      : Math.round((stats.newLeads / stats.totalLeads) * 100);

  document.getElementById("conversion").innerText =
    conversion + "%";
}


/* =====================================================
   RECENT LEADS TABLE (DASHBOARD)
===================================================== */
async function loadRecent() {

  const table = document.getElementById("recentLeads");
  if (!table) return;

  const res = await fetch(API + "?t=" + Date.now());
  const data = await res.json();

  table.innerHTML = data.slice(0, 5).map(l => `
    <tr>
      <td>${l.name}</td>
      <td>${l.phone}</td>
      <td>
        <span class="badge new">${l.status}</span>
      </td>
    </tr>
  `).join("");
}


/* =====================================================
   LOAD DASHBOARD
===================================================== */
async function loadDashboard() {
  await loadStats();
  await loadRecent();
}


/* =====================================================
   AUTO PAGE DETECTION ⭐
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

  // Leads page
  if (document.getElementById("leadList")) {
    loadLeads();
  }

  // Dashboard page
  if (document.getElementById("recentLeads")) {
    loadDashboard();
    setInterval(loadDashboard, 2000);
  }
});