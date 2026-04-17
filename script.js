const templates = [
  "👋 | Hello! My name is {name}, I am from the KSRP {rank} team. How may I help / assist you today? Say 'void' if I am late or you no longer need assistance",
  "⚠ | Please show me a clip it is neccessary to have proof or I cannot do anything.",
  "❔ | Is there anything else I can help you with today?",
  "📶 | Make sure to join our communications server! And rate me in #feedback, I hope you enjoy!",
  "🧡 | Hope you have a great time in KSRP!"
];

const hmMessages = [
  ":h ⚠️| Reminder, please report any rule breaking to our staff team. Use !mod or !help to call for assistance.",

  ":h 🚨| We ask all members to balence out the team as we have an unequal amount. Failure to do so will result in forced balancing.",

  ":h 🏢| Reminder to go outside of safe zones (Spawn Areas) to role-play! Failure to do so will result in punishments.",

  ":h 📝| We ask all members to check our community rules to ensure a safe and uninterrupted role-play. Save you the trouble of a punishment!",

  ":h 🚗| Reminder, all Exotic, Electric, and Classic Vehicles are for Server Boosters, VIP, and whitelisted members only!",

  ":h 🔫| The AK47 and Heavy Guns are whitelisted to players with specific roles. Using without permission can lead to punishments.",

  ":h 🛠️| Our apologies for the delayed responses. We have many calls and limited staff available. Please bear with us.",

  ":h 🛡️| Our staff team’s job is to enforce the rules of the community. Please bear with them if they end up interfering with your role-plays!",


  ":m 👋 | Hello, welcome to Keystone Role-play. If you enjoy our server, ensure to join our comms! Invite code:\nkeystonerp",

  ":m ‼️| The priority timer is now active! All crimes are prohibited and will result in punishments, faced to a kick on the first offense. Follow all laws, pull over for Law Enforcement, Ect.",

  ":m 💎| Due to an enlarged amount of rule violations, we will be starting to enforce harsher penalties for rule violators. We ask you to follow the rules.",

  ":m ⚠️| If you see any hackers, exploiters, scammers, or any other member performing activities outside of the TOS, please immediately inform the staff team. !mod or !help.",

  ":m 🛡️| If you are interested in joining our staff team or departments, please head to the communications server. Invite code: keystonerp"
];

const favContainer = document.getElementById("favorites");
let favorites = JSON.parse(localStorage.getItem("favs")) || [];

/* ================= MAIN RENDER ================= */

function render() {
  const container = document.getElementById("dialogues");
  container.innerHTML = "";

  const name = document.getElementById("name").value || "[Name]";
  const rank = document.getElementById("rank").value;

  templates.forEach(t => {
    let text = t.replace("{name}", name).replace("{rank}", rank);
    createCard(container, text);
  });
}

/* ================= H&M ================= */

function renderHM() {
  const container = document.getElementById("hm-messages");
  container.innerHTML = "";

  hmMessages.forEach(msg => createCard(container, msg));
}

/* ================= FAVORITES ================= */

function renderFavs() {
  favContainer.innerHTML = "";
  favorites.forEach(f => createCard(favContainer, f));
}

/* ================= CARD CREATION ================= */

function createCard(container, text) {
  const div = document.createElement("div");
  div.className = "dialogue";

  const isFav = favorites.includes(text);

  div.innerHTML = `
    <button class="fav-btn ${isFav ? 'active' : ''}">⭐</button>
    <button class="copy-btn">Copy</button>
    <div>${text}</div>
  `;

  // Copy
  div.querySelector(".copy-btn").onclick = () => {
    navigator.clipboard.writeText(text);
    showToast();
  };

  // ⭐ Toggle Favorite
  div.querySelector(".fav-btn").onclick = () => {
    if (favorites.includes(text)) {
      favorites = favorites.filter(f => f !== text);
    } else {
      favorites.push(text);
    }

    localStorage.setItem("favs", JSON.stringify(favorites));

    // Re-render everything
    render();
    renderHM();
    renderFavs();
  };

  container.appendChild(div);
}

/* ================= TOAST ================= */

function showToast() {
  const t = document.getElementById("toast");
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1200);
}

/* ================= EVENTS ================= */

document.getElementById("name").addEventListener("input", () => {
  render();
  renderHM();
});

document.getElementById("rank").addEventListener("change", () => {
  render();
  renderHM();
});

/* ================= INIT ================= */

render();
renderHM();
renderFavs();
