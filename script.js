// To-Do List Logic
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const list = document.getElementById("taskList");
  if (list) {
    list.innerHTML = "";
    tasks.forEach((task, index) => {
      list.innerHTML += `<li>${task} <button onclick="deleteTask(${index})">X</button></li>`;
    });
  }
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(input.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    loadTasks();
  }
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

// Product Data
const products = [
  { name: "T-Shirt", price: 250, category: "clothing" },
  { name: "Headphones", price: 1000, category: "tech" },
  { name: "Jeans", price: 500, category: "clothing" },
  { name: "Laptop", price: 90000, category: "tech" },
  { name: "Smartwatch", price: 1950, category: "tech" },
  { name: "Jacket", price: 1200, category: "clothing" },
  { name: "Sneakers", price: 8000, category: "clothing" },
  { name: "Tablet", price: 10000, category: "tech" },
  { name: "Graphic Hoodie", price: 1000, category: "clothing" },
  { name: "Gaming Mouse", price: 500, category: "tech" },
  { name: "Sunglasses", price: 350, category: "accessories" },
  { name: "Wireless Charger", price: 400, category: "tech" },
  { name: "Cap", price: 200, category: "clothing" },
  { name: "Backpack", price: 500, category: "accessories" },
  { name: "Fitness Tracker", price: 1000, category: "tech" }
];

// Helper to generate stars from rating
function getStars(rating) {
  return "⭐".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "⭐" : "");
}

// Product Rendering with ₹ and Ratings
function renderProducts() {
  const category = document.getElementById("categoryFilter")?.value || "all";
  const sort = document.getElementById("sortPrice")?.value || "asc";

  let filtered = category === "all"
    ? products
    : products.filter(p => p.category === category);

  filtered.sort((a, b) => sort === "asc" ? a.price - b.price : b.price - a.price);

  const list = document.getElementById("productList");
  if (list) {
    list.innerHTML = "";
    filtered.forEach(product => {
      const rating = (Math.random() * 2 + 3).toFixed(1); // Random rating between 3.0 - 5.0
      const stars = getStars(rating);
      list.innerHTML += `
        <div class="product-card">
          <h4>${product.name}</h4>
          <p>₹${product.price}</p>
          <p>${stars} (${rating})</p>
        </div>`;
    });
  }
}

// Event Listeners
document.getElementById("categoryFilter")?.addEventListener("change", renderProducts);
document.getElementById("sortPrice")?.addEventListener("change", renderProducts);

// Load data on startup
window.onload = () => {
  loadTasks();
  renderProducts();
};
