// Define a Book class
class Book {
    constructor(title, author, pages, color, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.color = color;
        this.read = read;
    }
}

// Global variables
let myLibrary = [];
const addBookButton = document.querySelector(".add");
const addBtn = document.getElementById("addBtn");
const closePopUp = document.querySelector(".close");
const content = document.getElementById("content");
const form = document.getElementById("form");

// Event listeners
addBookButton.addEventListener("click", () => {
    const popUpForm = document.getElementById("popUp");
    popUpForm.style.display = "block";
});

addBtn.addEventListener("click", addBookToLibrary);

closePopUp.addEventListener("click", () => {
    const popUpForm = document.getElementById("popUp");
    popUpForm.style.display = "none";
});

// Function to add a book to the library
function addBookToLibrary(event) {
    event.preventDefault();

    // Get form input values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const color = document.getElementById("color").value;
    const read = document.getElementById("read").checked;


    // Validate the required fields
    let hasEmptyFields = false;
    if (!title) {
        document.getElementById("title").style.borderColor = "red";
        hasEmptyFields = true;
    } else {
        document.getElementById("title").style.borderColor = "green";
    }
    if (!author) {
        document.getElementById("author").style.borderColor = "red";
        hasEmptyFields = true;
    } else {
        document.getElementById("author").style.borderColor = "green";
    }
    if (!pages) {
        document.getElementById("pages").style.borderColor = "red";
        hasEmptyFields = true;
    } else {
        document.getElementById("pages").style.borderColor = "green";
    }
    if (!color) {
        document.getElementById("color").style.borderColor = "red";
        hasEmptyFields = true;
    } else {
        document.getElementById("color").style.borderColor = "green";
    }

    // If any required field is empty, display an alert and return
    if (hasEmptyFields) {
        alert("Please fill in all required fields.");
        return;
    }

    // Create a new book instance
    const newBook = new Book(title, author, pages, color, read);

    // Add the new book to the library
    myLibrary.push(newBook);

    // Update UI and reset form
    setData();
    render();
    form.reset();

    const popUpForm = document.getElementById("popUp");
    popUpForm.style.display = "none";
}

// Function to render the books in the library
function render() {
    content.innerHTML = "";

    if (myLibrary.length === 0) {
        createDefaultBook();
    } else {
        myLibrary.forEach((book) => {
            createBook(book);
        });
    }
}

// Function to create a book element
function createBook(book) {
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book-container");

    const actualBook = document.createElement("div");
    actualBook.classList.add("book");
    actualBook.setAttribute("id", book.title);

    const titleElement = document.createElement("div");
    titleElement.textContent = book.title;
    titleElement.classList.add("title");
    titleElement.style.backgroundColor = book.color;

    const authorElement = document.createElement("div");
    authorElement.textContent = book.author;
    authorElement.classList.add("author");
    authorElement.style.color = book.color;

    authorElement.addEventListener("click", () => {
        const confirmDelete = confirm("Are you sure you want to delete this book?");
        if (confirmDelete) {
            const index = myLibrary.findIndex((item) => item.title === book.title);
            if (index !== -1) {
                myLibrary.splice(index, 1);
                setData();
                render();
            }
        }
    });

    bookContainer.appendChild(titleElement);
    actualBook.appendChild(titleElement);
    bookContainer.appendChild(actualBook);
    bookContainer.appendChild(authorElement);

    content.appendChild(bookContainer);
}

// Function to create a default book element
function createDefaultBook() {
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book-container");

    const actualBook = document.createElement("div");
    actualBook.classList.add("book");

    const titleElement = document.createElement("div");
    titleElement.textContent = "Example Book";
    titleElement.classList.add("title");

    const authorElement = document.createElement("div");
    const strongElement = document.createElement("strong");
    strongElement.textContent = "By John Apple";
    authorElement.appendChild(strongElement);
    authorElement.classList.add("author");

    bookContainer.appendChild(actualBook);
    actualBook.appendChild(titleElement);
    bookContainer.appendChild(authorElement);

    content.appendChild(bookContainer);
}

// Function to save library data to local storage
function setData() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

// Function to restore library data from local storage
function restore() {
    const storedLibrary = localStorage.getItem("myLibrary");
    if (storedLibrary) {
        myLibrary = JSON.parse(storedLibrary);
        render();
    }
}

// Restore library data on page load
restore();  