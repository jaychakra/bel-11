// Has - A Relationship (Strong Relationship)
// Library and books ()

class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    addBook(title, author) {
        const book = new Book(title, author);
        this.books.push(book);
    }

    destroyed() {
        this.books = [];
    }
}

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

const library = new Library("City Library");
library.addBook("The Alchemist", "Paulo Coelho");
library.addBook("The Catcher in the Rye", "J.D. Salinger");