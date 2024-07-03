const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// const initialFacts = [
//   {
//     id: 1,
//     text: "React is being developed by Meta (formerly facebook)",
//     source: "https://opensource.fb.com/",
//     category: "technology",
//     votesInteresting: 24,
//     votesMindblowing: 9,
//     votesFalse: 4,
//     createdIn: 2021,
//   },
//   {
//     id: 2,
//     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
//     source:
//       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
//     category: "society",
//     votesInteresting: 11,
//     votesMindblowing: 2,
//     votesFalse: 0,
//     createdIn: 2019,
//   },
//   {
//     id: 3,
//     text: "Lisbon is the capital of Portugal",
//     source: "https://en.wikipedia.org/wiki/Lisbon",
//     category: "society",
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015,
//   },
// ];

const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");
const categoryList = document.querySelector(".category-template");

loadFacts();
async function loadFacts() {
  const res = await fetch(
    "https://ddplnohlnejcgtkowqnz.supabase.co/rest/v1/fact",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkcGxub2hsbmVqY2d0a293cW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwMTUyNzAsImV4cCI6MjAzNTU5MTI3MH0.FlhGHKkSuqfzNAXjr0ZFlnd6kvpU6a1zaVtp2mW68p0",
        authorization:
          "Beare eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkcGxub2hsbmVqY2d0a293cW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwMTUyNzAsImV4cCI6MjAzNTU5MTI3MH0.FlhGHKkSuqfzNAXjr0ZFlnd6kvpU6a1zaVtp2mW68p0",
      },
    }
  );
  const data = await res.json();
  console.log(data);
  const filteredData = data.filter((fact) => fact.category === "technology");

  createFactsList(data);
}
factsList.innerHTML = "";
// createFactsList(initialFacts);
function createFactsList(dataArray) {
  const htmlArr = dataArray.map(
    (fact) => `<li class="fact">
      <p>
      ${fact.text}
          <a
            class="source"
            href=${fact.source}
            target="_blank"
            >(Source)</a>
        </p>
        <span class="tag" style="background-color:
        ${CATEGORIES[checkColour(fact.category)].color}">
          ${fact.category}<span>
    </li>`
  );
  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);

  function checkColour(cat) {
    return CATEGORIES.findIndex(function (item) {
      return item.name == cat;
    });
  }
}

createCategoriesList(CATEGORIES);
function createCategoriesList(dataArray) {
  for (let i = 0; i < dataArray.length; i++) {
    let c = categoryList.children[0].cloneNode(true);

    c.innerText = dataArray[i]["name"];
    c.style.backgroundColor = dataArray[i]["color"];
    c.style.margin = "6px";
    categoryList.before(c);
  }
  categoryList.children[0].style.display = "none";
}

btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    form.classList.add("visible");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    form.classList.remove("visible");
    btn.textContent = "Share a fact";
  }
});
