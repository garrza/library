function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


let myLibrary = [];


const addButton = document.getElementById("addButton");
const content = document.getElementById("content");


function createBook() {
    let title = prompt("Book name: ");
    let author = prompt("Author: ");
    let pages = prompt("Pages: ");
    let read = prompt("Read (y/n): ");
    let book = new Book(title, author, pages, true ? read == "y" : read == "n");
    myLibrary.push(book);
    content.innerHTML = "";
    displayBooks();
}


addButton.onclick = createBook;


function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];

        let bookContainer = document.createElement("div");
        bookContainer.classList.add("book-container");

        let actualBook = document.createElement("div");
        actualBook.classList.add("book");

        let titleElement = document.createElement("div");
        titleElement.textContent = book.title;
        titleElement.classList.add("title");
        bookContainer.appendChild(titleElement);

        let authorElement = document.createElement("div");
        authorElement.textContent = book.author;
        authorElement.classList.add("author");

        actualBook.appendChild(titleElement);
        bookContainer.appendChild(actualBook);
        bookContainer.appendChild(authorElement);

        content.appendChild(bookContainer);
    }
}