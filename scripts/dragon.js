function updateFooterDate() {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;
}

function validateApplicationForm() {
  const name = document.getElementById("name").value.trim();
  const age = parseInt(document.getElementById("age").value, 10);
  const dragonSelect = document.getElementById("dragonType").value;

  if (!name) return { valid: false, message: "Name is required." };
  if (!age || age < 13) return { valid: false, message: "Age must be 13 or older." };
  if (!dragonSelect) return { valid: false, message: "Please select a dragon type." };

  return { valid: true };
}

function saveApplicationData() {
  const formData = {
    name: document.getElementById("name").value.trim(),
    age: document.getElementById("age").value,
    dragonType: document.getElementById("dragonType").value
  };
  localStorage.setItem("applicationData", JSON.stringify(formData));
}

function loadApplicationData() {
  const saved = localStorage.getItem("applicationData");
  if (!saved) return;
  const formData = JSON.parse(saved);

  document.getElementById("name").value = formData.name || "";
  document.getElementById("age").value = formData.age || "";
  document.getElementById("dragonType").value = formData.dragonType || "";
}

const dragons = [
  { name: "Fire Drake", element: "Fire", difficulty: "Intermediate" },
  { name: "Storm Wyvern", element: "Air", difficulty: "Advanced" },
  { name: "Frost Wyrm", element: "Ice", difficulty: "Beginner" }
];

function populateDragonList() {
  const container = document.getElementById("dragonList");
  if (!container) return;

  container.innerHTML = dragons.map(dragon => 
    `<li><strong>${dragon.name}</strong> — Element: ${dragon.element}, Difficulty: ${dragon.difficulty}</li>`
  ).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  updateFooterDate();
  loadApplicationData();
  populateDragonList();

  const form = document.getElementById("applicationForm");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const validation = validateApplicationForm();
      if (!validation.valid) {
        alert(`Error: ${validation.message}`);
        return;
      }
      saveApplicationData();
      alert(`Thank you, ${document.getElementById("name").value}, for applying to Skyborn Academy!`);
      form.reset();
    });
  }
});
