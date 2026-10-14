const myLibrary = [];

function Book(title, author, pageCount) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.isRead = false;
  this.info = function () {
    const createIsReadInfoString = () => {
      if (this.isRead) {
        return "already read";
      } else {
        return "not read yet";
      }
    };
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
    bookDiv.classList.add("book");
    bookDiv.classList.add("card");

    [book.title, book.author, book.pageCount, book.isRead, book.id].forEach(
      (property) => {
        let propertyDiv = document.createElement("div");
        propertyDiv.textContent = property;

        let propertyClass;
        switch (property) {
          case book.id:
            propertyClass = "id";
            break;
          case book.title:
            propertyClass = "title";
            break;
          case book.author:
            propertyClass = "author";
            break;
          case book.pageCount:
            propertyClass = "page-count";
            break;
          case book.isRead:
            propertyClass = "is-read";
            break;
        }
        propertyDiv.classList.add(propertyClass);

        switch (propertyDiv.textContent) {
          case "false":
            propertyDiv.textContent = "Not read yet";
            break;
          case "true":
            propertyDiv.textContent = "Already read";
            break;
        }

        bookDiv.appendChild(propertyDiv);
      },
    );
    booksDiv.appendChild(bookDiv);
  });
}

updateAllBooksDisplay();

const bookForm = document.querySelector("#add-book");
const bookFormInputs = Array.from(
  document.querySelectorAll("#add-book > input"),
);
const bookFormBtn = document.querySelector("#add-book > button");

bookFormBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // if (!bookForm.checkValidity()) {
  //   console.log("Form not valid");
  //   return;
  // }

  let inputValues = bookFormInputs.map((input) => input.value);

  console.log("input values are: " + inputValues);

  addBookToLibrary(...inputValues);

  console.log(myLibrary);

  updateAllBooksDisplay();
});
