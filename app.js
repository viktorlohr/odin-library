const myLibrary = [];

function Book(title, author, pageCount) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.isRead = false;
  this.info = function () {
    function createIsReadInfoString() {
      if (this.isRead) {
        return "already read";
      } else {
        return "not read yet";
      }
    }
    let infoString =
      this.title +
      " by " +
      this.author +
      " is " +
      this.pageCount +
      " pages long, " +
      createIsReadInfoString();
    console.log(infoString);
  };
}

// dummy books
let someBook = new Book("Some Title", "Some Author", 100);
let someOtherBook = new Book("Some Other Book", "Some Other Author", 100);
myLibrary.push(someBook, someOtherBook);

function addBookToLibrary(title, author, pageCount) {
  let book = new Book(title, author, pageCount);
  myLibrary.push(book);
}

function removeBookById(id) {
  const idx = myLibrary.findIndex((b) => b.id == id);
  if (idx !== -1) {
    myLibrary.splice(idx, 1);
  }
}

// test
removeBookById(myLibrary[0].id);
console.log(myLibrary);

// --- UI ---

function updateAllBooksDisplay() {
  const booksDiv = document.querySelector(".books");

  while (booksDiv.children.length > 5) {
    booksDiv.removeChild(booksDiv.lastChild);
  }

  myLibrary.forEach((book) => {
    [book.id, book.title, book.author, book.pageCount, book.isRead].forEach(
      (property) => {
        let propertyDiv = document.createElement("div");
        propertyDiv.textContent = property;

        switch (propertyDiv.textContent) {
          case "false":
            propertyDiv.textContent = "Not yet";
            break;
          case "true":
            propertyDiv.textContent = "Yes!";
            break;
        }

        booksDiv.appendChild(propertyDiv);
      },
    );
  });
}

updateAllBooksDisplay();

const bookForm = document.querySelector(".add-book");
const bookFormInputs = Array.from(
  document.querySelectorAll(".add-book > input"),
);
const bookFormBtn = document.querySelector(".add-book > button");

console.log("Book form inputs are: " + bookFormInputs);

bookFormBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let inputValues = bookFormInputs.map((input) => input.value);

  console.log("input values are: " + inputValues);

  addBookToLibrary(...inputValues);

  console.log(myLibrary);

  updateAllBooksDisplay();
});

function removeBookbyIdUI(id) {
  removeBookById(id);
  updateAllBooksDisplay();
}

function addRemoveBtnsToBooks() {
  const bookEls = Array.from(document.querySelectorAll(".book"));

  bookEls.forEach((book) => {
    let removeBtn = document.createElement("button");
    removeBtn.textContent("Remove");
    removeBtn.classList.add("remove");

    removeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      removeBookByIdUI(book.id);
    });
  });
}
