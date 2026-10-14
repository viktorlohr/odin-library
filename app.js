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

function removeBookFromLibrary() {}

// --- UI ---

function updateAllBooksDisplay() {
  const booksDiv = document.querySelector(".books");

  while (booksDiv.children.length > 1) {
    booksDiv.removeChild(booksDiv.lastChild);
  }

  myLibrary.forEach((book) => {
    let bookDiv = document.createElement("div");

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

        bookDiv.appendChild(propertyDiv);
      },
    );
    booksDiv.appendChild(bookDiv);
  });
}

updateAllBooksDisplay();

const bookForm = document.querySelector(".add-book");
const bookFormInputs = Array.from(
  document.querySelectorAll(".add-book > input"),
);
const bookFormBtn = document.querySelector(".add-book > button");

bookFormBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let inputValues = bookFormInputs.map((input) => input.value);

  console.log("input values are: " + inputValues);

  addBookToLibrary(...inputValues);

  console.log(myLibrary);

  updateAllBooksDisplay();
});
