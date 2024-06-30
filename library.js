
let myLibrary = [];
let bookID = 0;

function Book(id,title, author, pages, read){
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read){
    let book = new Book(bookID, title, author, pages, read);
    myLibrary.push(book);
    bookID++;
}


function deleteBook(id){
    myLibrary = myLibrary.filter(function(item){
        return item.id !== id;
    })
}

function addBookToContainer(book){
    const container = document.querySelector(".book-container");
    const book_card = document.createElement("div");
    book_card.id = book.id;

    const b_delete = document.createElement("button");
    b_delete.type="button";
    b_delete.textContent = "X"
    b_delete.onclick = ()=>{
        deleteBook(book.id);
        book_card.remove();
    };
    book_card.appendChild(b_delete);

    const p_title = document.createElement("p");
    p_title.textContent = "Title: " +book.title;

    const p_author = document.createElement("p");
    p_author.textContent = "Author: " +book.author;

    const p_pages = document.createElement("p");
    p_pages.textContent = "Pages: "+book.pages;

    const d_read = document.createElement("div");
    d_read.classList = "read_div";
    const p_read = document.createElement("p");
    const c_read = document.createElement("input");
    c_read.type="checkbox";
    c_read.onclick = ()=>{
        for(index in myLibrary){
            if(myLibrary[index].id == book.id){
                myLibrary[index].read = c_read.checked;
            }
        }
    };

    p_read.textContent = "Read: ";
    if(book.read){
        c_read.setAttribute("checked","true");
    }
    d_read.appendChild(p_read);
    d_read.appendChild(c_read);

    book_card.appendChild(p_title);
    book_card.appendChild(p_author);
    book_card.appendChild(p_pages);
    book_card.appendChild(d_read);
    book_card.classList.add("book-card");

    const newBookButton = document.querySelector(".book-card");
    newBookButton.after(book_card);
}

addBookToLibrary("Lord of the Rings - The Two Towers", "J.R.R Tolkien", 496, true);
addBookToLibrary("The Hobbit", "J.R.R Tolkien", 324, true);


for(index in myLibrary){
    addBookToContainer(myLibrary[index]);
}

function new_book_click_handler(){
    let form = document.getElementById("new-book-form");
    let inputs = form.getElementsByTagName("input");

    newBook = new Book(bookID, inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].checked);
    addBookToLibrary(newBook);
    addBookToContainer(newBook);
}

function clearForm(){
    let form = document.getElementById("new-book-form");
    let inputs = form.getElementsByTagName("input");
    for(index in inputs){
        if(inputs[index].checked){
            inputs[index].checked = false;
        }else{
            inputs[index].value = "";
        }
    }
}


window.onload = clearForm;
