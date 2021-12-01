const form = document.querySelector("#form");
const list = document.querySelector("#list");
const errorTitle = document.querySelector("#errorTitle");
const errorAuthor = document.querySelector("#errorAuthor");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const category = document.querySelector("#category");
const prio = document.querySelectorAll('input[name="priority"]');

let books = [];
let prioChecked = 0;
prio.forEach((el) => {
  if (el.checked) prioChecked = el.value;
});

if (localStorage.getItem("books")) {
  books = [...JSON.parse(localStorage.getItem("books"))];
  console.log(books);
  books.forEach((el) => addDomElement(el.title, el.author, el.prio, el.category));
}

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  let validation = 0;
  prio.forEach((el) => {
    if (el.checked) prioChecked = el.value;
  });

  if (title.value.length > 0) {
    validation += 1;
    errorTitle.innerText = "";
  } else {
    errorTitle.innerText = "co najmniej 1 znak";
  }
  if (author.value.length > 2) {
    validation += 1;
    errorAuthor.innerText = "";
  } else {
    errorAuthor.innerText = "co najmniej 3 znaki";
  }

  if (validation === 2) {
    addToLocalStorage(title.value, author.value, prioChecked, category.value);
    addDomElement(title.value, author.value, prioChecked, category.value);

    title.value = "";
    author.value = "";
    prio[0].checked = true;
    category.value = "epic";
  }
});

function addDomElement(title, author, prio, category) {
  const newArticle = document.createElement("article");
  const newDiv = document.createElement("div");
  newDiv.classList.add("col");
  const newDiv2 = document.createElement("div");
  newDiv2.classList.add("col");
  const newH3 = document.createElement("h3");
  newH3.innerText = title;
  const newPAuthor = document.createElement("p");
  newPAuthor.innerText = author;
  const newPCategory = document.createElement("p");
  newPCategory.innerText = category;
  const newPPrio = document.createElement("p");
  newPPrio.innerText = "priorytet: " + prio;

  list.appendChild(newArticle);
  newArticle.appendChild(newDiv);
  newDiv.appendChild(newH3);
  newDiv.appendChild(newPAuthor);
  newArticle.appendChild(newDiv2);
  newDiv2.appendChild(newPCategory);
  newDiv2.appendChild(newPPrio);
}

function addToLocalStorage(title, author, prioChecked, category) {
  if (localStorage.getItem("books") === null) {
    books.push({
      title: title,
      author: author,
      prio: prioChecked,
      category: category,
    });
    localStorage.setItem("books", JSON.stringify(books));
  } else {
    books.push({
      title: title,
      author: author,
      prio: prioChecked,
      category: category,
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
