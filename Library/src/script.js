document.addEventListener("DOMContentLoaded", () => { 

    let add_btn = document.querySelector(".add_button");
    let form = document.querySelector(".info");
    let cancel = document.querySelector(".cancel");

    // Show Form
    add_btn.addEventListener('click', () => {
        form.classList.toggle('block');
        form.classList.toggle('hidden');
    })

    cancel.addEventListener("click", () => {
        form.classList.toggle("block");
        form.classList.toggle("hidden");
    });
    
    // info inside form
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let pages = document.getElementById('pages');
    let read = document.getElementById("read");
    let add = document.querySelector(".addd");

    add.addEventListener("click", (event) => {
        event.preventDefault();
        // Vlaues
        const title_ = title.value;
        const author_ = author.value;
        const pages_ = pages.value;
        
        // Clear Values after add it
        title.value = '';
        author.value = '';
        pages.value = '';

        // Conditions
        if (!isNaN(parseFloat(pages_)) && title_ && author_) { 
            make_book(title_, author_, pages_);
            form.classList.toggle("block");
            form.classList.toggle("hidden");
        }
        else {
            alert("Fill in the blanks");
        }

    });

    // Add a new Book
    function make_book(title_, author_, pages_) {

        let ul = document.querySelector(".list_of_book");
        const li = document.createElement("li");

        const p_title = document.createElement("p");
        const p_author = document.createElement("p");
        const p_pages = document.createElement("p");

        p_title.textContent = "Title: " + title_;
        p_author.textContent = "Author: " + author_;
        p_pages.textContent = "Pages: " + pages_;

        li.appendChild(p_title);
        li.appendChild(p_author);
        li.appendChild(p_pages);

        const div_btns = document.createElement("div");
        div_btns.classList.add("div_btns");

        const read_btn = document.createElement("button");
        read_btn.textContent = "Read";
        read_btn.classList.add("read_btn");

        const delete_btn = document.createElement("button");
        delete_btn.classList.add("delete_btn");
        delete_btn.textContent = "Delete";

        div_btns.appendChild(read_btn);
        div_btns.appendChild(delete_btn);

        li.appendChild(div_btns);

        ul.appendChild(li);

        saveBooks();

        // Delete li "list"
        delete_btn.addEventListener("click", () => {
            li.remove();
            saveBooks();
        });
        // Read li "list"
        read_btn.addEventListener("click", () => {
            read_btn.classList.toggle("unread");
            read_btn.classList.contains("unread")
            ? (read_btn.textContent = "unread")
            : (read_btn.textContent = "read");
            saveBooks();
        });
    }
    
    // Save Book
    function saveBooks() {
        const books = [];
        document.querySelectorAll(".list_of_book li").forEach((li) => {
            const title = li.querySelector("p").textContent.replace("Title: ", "");
            const author = li
            .querySelectorAll("p")[1]
            .textContent.replace("Author: ", "");
            
            const pages = li
            .querySelectorAll("p")[2]
            .textContent.replace("Pages: ", "");
            
            books.push({ title, author, pages });
        });
        localStorage.setItem("books", JSON.stringify(books));
    }

    // Load Books from Local storage
    function loadBooks() {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        let ul = document.querySelector(".list_of_book");

        books.forEach((book) => {
            make_book(book.title, book.author, book.pages);
        });
    }
    loadBooks();
})