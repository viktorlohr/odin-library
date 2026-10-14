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
myLibrary.add(someBook, someOtherBook);

function addBookToLibrary(title, author, pageCount) {
  let book = new Book(title, author, pageCount);
  myLibrary.add(book);
}
