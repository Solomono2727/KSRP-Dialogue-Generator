const templates = [
  "👋 | Hello! My name is {name}, I am from the KSRP {rank} team. How may I help / assist you today?",
  "⚠ | Please show me a clip or proof or at least 3 witnesses are needed or we cannot do anything.",
  "❔ | Is there anything else I can help you with today?",
  "📶 | Make sure to join our communications server! And rate me in #feedback, I hope you enjoy!",
  "🧡 | Hope you have a great time in KSRP!"
];

const container = document.getElementById('dialogues');

function render() {
  container.innerHTML = '';
  const name = document.getElementById('name').value || '[Name]';
  const rank = document.getElementById('rank').value;

  templates.forEach((template, index) => {
    let text = template
      .replace('{name}', name)
      .replace('{rank}', rank);

    const div = document.createElement('div');
    div.className = 'dialogue';

    div.innerHTML = `
      <button class="copy-btn" onclick="copyText(${index})">Copy</button>
      <div class="dialogue-text" id="text-${index}">${text}</div>
    `;

    container.appendChild(div);
  });
}

function copyText(index) {
  const text = document.getElementById(`text-${index}`).innerText;
  navigator.clipboard.writeText(text);
  showToast();
}

function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1500);
}

document.getElementById('name').addEventListener('input', render);
document.getElementById('rank').addEventListener('change', render);

render();
