// Book class - represent a book

class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI class - Handle UI Tasks

class UI {    
    static displayBooks(){
        //get books from local storage
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));

    }
    static addBookToList(book) {
        const list = document.getElementById('book-list');

        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href = "#" class = "btn btn-danger btn-sm delete">x</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            const book_title = el.parentElement.parentElement.children[0].textContent;

            // remove from local storage
            const book_isbn = el.parentElement.parentElement.children[2].textContent;
            Store.removeBook(book_isbn);

            UI.showAlert(`${book_title} removed!`, 'info')
            // remove from UI
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        // vanish in 3 seconds
        setTimeout(() => {
            document.querySelector(`.alert-${className}`).remove();
        }, 3000);
    }

    static clearFields(){
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }

    static deleteRow(){
        document.getElementById('book-list').style.display = 'none';
    }
}

// Store class - Handles storage

class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event to display book

document.addEventListener("DOMContentLoaded",UI.displayBooks)

// Event to add a book

document.querySelector("#book-form").addEventListener("submit", (e)=>{
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title === '' || author === '' || isbn === ''){
        UI.showAlert("Enter book details!", 'danger')
    } else {

        const book = new Book(title, author, isbn)
        // Add book to UI
        UI.addBookToList(book);

        // Add book to store
        Store.addBook(book);

        UI.showAlert("Book added successfully!", 'success')
        // clear fields
        UI.clearFields();
    }

    
});

//Event to remove a book

document.querySelector('#book-list').addEventListener('click', (e)=>{
    UI.deleteBook(e.target);
    // e.target.parentElement.parentElement.remove();
})