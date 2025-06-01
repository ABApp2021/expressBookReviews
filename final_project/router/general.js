const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
      //const { username, password } = req.body;
    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
  return res.status(300).json({message: "Yet to be implemented"});
});
// Async route to get books
public_users.get('/', async (req, res) => {
    try {
        // Simulating an async fetch of book data using a Promise
        const getBooks = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(books);
                }, 1000); // 1 second delay to simulate async
            });
        };

        const bookList = await getBooks();
        res.status(200).json(bookList);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// Async route to get book details by ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;

    try {
        const getBookByISBN = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const book = books[isbn];
                    if (book) {
                        resolve(book);
                    } else {
                        reject("Book not found");
                    }
                }, 1000); // simulate 1s delay
            });
        };

        const bookDetails = await getBookByISBN();
        res.status(200).json(bookDetails);
    } catch (error) {
        res.status(404).json({ message: error });
    }
});


// Async route to get books by author
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;
    try {
        // Simulate asynchronous operation using Promise
        const getBooksByAuthor = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const matchedBooks = [];
                    for (let isbn in books) {
                        if (books[isbn].author === author) {
                            matchedBooks.push({ isbn, ...books[isbn] });
                        }
                    }
                    resolve(matchedBooks);
                }, 1000); // simulate 1s delay
            });
        };

        const booksByAuthor = await getBooksByAuthor();
        if (booksByAuthor.length > 0) {
            res.status(200).json(booksByAuthor);
        } else {
            res.status(404).json({ message: "No books found by this author" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error finding books" });
    }
});

// Async route to get books by title
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;

    try {
        // Simulated async operation using a Promise
        const getBooksByTitle = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const matchedBooks = [];
                    for (let isbn in books) {
                        if (books[isbn].title === title) {
                            matchedBooks.push({ isbn, ...books[isbn] });
                        }
                    }
                    resolve(matchedBooks);
                }, 1000); // 1 second delay
            });
        };
        const booksByTitle = await getBooksByTitle();
        if (booksByTitle.length > 0) {
            res.status(200).json(booksByTitle);
        } else {
            res.status(404).json({ message: "No books found with this title" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books" });
    }
});

/*{// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
   res.send(JSON.stringify(books,null,4));
 // return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    const isbn = req.params.isbn;
    res.send(books[isbn]);
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
    const author = req.params.author;
    const matchingBooks = [];

    // Loop through all books
    for (let isbn in books) {
        if (books[isbn].author === author) {
            matchingBooks.push({ isbn, ...books[isbn] });
        }
    }

    if (matchingBooks.length > 0) {
        res.status(200).json(matchingBooks);
    } else {
        res.status(404).json({ message: "No books found by this author" });
    }
//  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
      const title = req.params.title;
    const matchingBooks = [];

    // Loop through all books
    for (let isbn in books) {
        if (books[isbn].title === title) {
            matchingBooks.push({ isbn, ...books[isbn] });
        }
    }

    if (matchingBooks.length > 0) {
        res.status(200).json(matchingBooks);
    } else {
        res.status(404).json({ message: "No books found by this author" });
    }
//  return res.status(300).json({message: "Yet to be implemented"});
});}*/

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
     const isbn = req.params.isbn;
    const book = books[isbn];

    if (book) {
        res.status(200).json(book.reviews);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
 // return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
