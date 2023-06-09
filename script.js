function Book(title, author, pages, read, color) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.color = color;
}


let myLibrary = [];


const addButton = document.getElementById("addButton");
const content = document.getElementById("content");


function createBook() {
    let title = prompt("Book name: ");
    let author = prompt("Author: ");
    let pages = prompt("Pages: ");
    let read = prompt("Read (y/n): ");
    let color = prompt("Choose a color, any color: ");
    let book = new Book(title, author, pages, true ? read == "y" : read == "n", color);
    myLibrary.push(book);
    content.innerHTML = "";
    displayBooks();
}

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];

        let bookContainer = document.createElement("div");
        bookContainer.classList.add("book-container");

        let actualBook = document.createElement("div");
        actualBook.classList.add("book");
        actualBook.setAttribute("id", book.title);
        

        let titleElement = document.createElement("div");
        titleElement.textContent = book.title;
        titleElement.classList.add("title");
        titleElement.style.backgroundColor = book.color;
        
        

        let authorElement = document.createElement("div");
        authorElement.textContent = book.author;
        authorElement.classList.add("author");
        authorElement.style.color = book.color;
        
        bookContainer.appendChild(titleElement);
        actualBook.appendChild(titleElement);
        bookContainer.appendChild(actualBook);
        bookContainer.appendChild(authorElement);

        content.appendChild(bookContainer);
    }
}

addButton.onclick = createBook;