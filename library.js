class Library {

    constructor(startid){
        this.bookid = startid;
        this.storage = [];
    }

    addBook(book){
        this.storage.push(book);
        book.id = this.bookid;
        this.bookid++;
    }

    deleteBook(bookid){
        this.storage = this.storage.filter(function(item){
            return item.id !== bookid;
        })
    }
}

const Book = function (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

class FormController{

    constructor(){
        this.form = document.getElementById("new-book-form");
        this.inputs = this.form.getElementsByTagName("input");
    }
    getFormInput(){
        return {title:this.inputs[0].value,author:this.inputs[1].value,pages:this.inputs[2].value,read:this.inputs[3].checked}
    }

    clearForm(){
        for(index in this.inputs){
            if(this.inputs[index].checked){
                this.inputs[index].checked = false;
            }else{
                this.inputs[index].value = "";
            }
        }
    }
}

class LibraryDisplayController{

    displayNewBook(book){
        const book_card = document.createElement("div");
        book_card.id = "book_card"+book.id;
    
        const b_delete = document.createElement("button");
        b_delete.type="button";
        b_delete.textContent = "X"
        b_delete.onclick = ()=>onDeleteButtonClick(book.id);
        book_card.appendChild(b_delete);
    
        const p_title = document.createElement("p");
        p_title.textContent = "Title: " +book.title;
    
        const p_author = document.createElement("p");
        p_author.textContent = "Author: " +book.author;
    
        const p_pages = document.createElement("p");
        p_pages.textContent = "Pages: "+book.pages;

        const c_read = document.createElement("input");
        c_read.type="checkbox";
        c_read.onclick = ()=>{
            for(index in myLibrary){
                if(myLibrary[index].id == book.id){
                    myLibrary[index].read = c_read.checked;
                }
            }
        };
    
        const p_read = document.createElement("p");
        p_read.textContent = "Read: ";
        if(book.read){
            c_read.setAttribute("checked","true");
        }
        
        const d_read = document.createElement("div");
        d_read.classList = "read_div";
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

    deleteBook(bookid){
        document.getElementById("book_card"+bookid).remove();
    }
}

var myLibrary = new Library(0);
var formControl = new FormController();
var displayControl = new LibraryDisplayController();

function onButtonClick(){
    formValues = formControl.getFormInput();
    book = new Book(formValues.title, formValues.author, formValues.pages, formValues.read);
    myLibrary.addBook(book);
    displayControl.displayNewBook(book);
}

function onDeleteButtonClick(bookid){
    myLibrary.deleteBook(bookid);
    displayControl.deleteBook(bookid);
}

window.onload = formControl.clearForm;
