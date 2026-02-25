const chapters = [
  { title: "Understanding How Money Works", tag: "budgeting" },
  { title: "Mastering Your Expenses", tag: "budgeting" },
  { title: "Building Emergency Fund", tag: "investing" },
  { title: "Investing 101", tag: "investing" },
  { title: "Stock Market Basics", tag: "investing" },
  { title: "Mutual Funds Simplified", tag: "investing" },
  { title: "Crypto Without Hype", tag: "crypto" },
  { title: "Smart Tax Planning", tag: "taxation" },
  { title: "Passive Income Streams", tag: "investing" },
  { title: "Wealth Mindset", tag: "investing" }
];

let completed = 0;
let xp = 0;

const container = document.getElementById("cardContainer");

function renderCards(filter = "all") {
  container.innerHTML = "";
  chapters.forEach((chapter, index) => {
    if (filter === "all" || chapter.tag === filter) {
      container.innerHTML += `
        <div class="card" data-index="${index}">
          <span class="tag">${chapter.tag}</span>
          <h3>${chapter.title}</h3>
          <div class="card-footer">
            <button onclick="completeChapter(${index})">Start</button>
            <span class="like-btn" onclick="likeChapter(this)">❤️ 0</span>
          </div>
        </div>
      `;
    }
  });
}

function completeChapter(index) {
  completed++;
  xp += 10;
  document.getElementById("completedCount").innerText = completed;
  document.getElementById("xpPoints").innerText = xp;
}

function likeChapter(el) {
  let current = parseInt(el.innerText.split(" ")[1]);
  el.innerText = "❤️ " + (current + 1);
}

function filterCards(tag) {
  document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
  renderCards(tag);
}

renderCards();
