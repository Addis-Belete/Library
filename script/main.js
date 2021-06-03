window.onload = function () {
  const myform = document.getElementById('myform');

  const dynamicHere = document.getElementById('dynamicHere');
  const cardBody = document.getElementsByClassName('cart-body')[0];

  class Book {
    constructor(authorName, bookName, isbn, read) {
      this.authorName = authorName;
      this.bookName = bookName;
      this.isbn = isbn;
      this.read = read;
    }
  }

  class Store {
    static getstored() {
      let books = '';
      if (localStorage.getItem('book') == null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('book'));
      }
      return books;
    }

    static setStored(obj) {
      const booksFromLocal = Store.getstored();
      booksFromLocal.push(obj);
      localStorage.setItem('book', JSON.stringify(booksFromLocal));
    }

    static removeStoredValue(isbn) {
      const Albooks = Store.getstored();
      Albooks.forEach((everydata, index) => {
        if (everydata.isbn === isbn) {
          Albooks.splice(index, 1);
        }
      });
      localStorage.setItem('book', JSON.stringify(Albooks));
    }
  }

  class UI {
    static clearfields() {
      document.getElementById('authorName').value = '';
      document.getElementById('bookName').value = '';
      document.getElementById('isbn').value = '';
    }

    static displayData(book) {
      const books = Store.getstored();
      books.push(book);
      UI.PopulateRow(books);
    }

    static PopulateRow(books) {
      while (dynamicHere.firstChild) {
        dynamicHere.firstChild.remove(dynamicHere.firstChild);
      }
      books.forEach((everydata) => {
        dynamicHere.innerHTML += `
        <tr>
              <td>${everydata.authorName}</td>
              <td>${everydata.bookName}</td>
              <td>${everydata.isbn}</td>
<td>${everydata.read}</td>
              <td><button class='btn btn-danger removeit'>X</button></td>
        </tr>`;
      });
    }

    static messages(txt, className) {
      const div = document.createElement('div');
      div.className = `alert alert - ${className}`;
      div.innerHTML = txt;
      cardBody.insertBefore(div, myform);

      setTimeout(() => {
        div.remove();
      }, 2000);
    }

    static removeRow(element) {
      if (element.classList.contains('removeit')) {
        const isbn = element.parentElement.parentElement.firstElementChild.innerText;
        Store.removeStoredValue(isbn);
        element.parentElement.parentElement.remove();
      }
    }
  }

  myform.addEventListener('submit', (e) => {
    e.preventDefault();
    const authorName = document.getElementById('authorName').value;
    const bookName = document.getElementById('bookName').value;
    const isbn = document.getElementById('isbn').value;
    const bookRead = document.getElementById('dropdown').value;

    if (authorName === '' || bookName === '' || isbn === '' || bookRead === '') {
      UI.messages('Enter All fields', 'Danger');
    } else {
      const book = new Book(authorName, bookName, isbn, bookRead);
      UI.displayData(book);
      Store.setStored(book);
      UI.clearfields();
      UI.messages('Data inserted', 'success');
    }
  });

  dynamicHere.addEventListener('click', (e) => {
    UI.removeRow(e.target);
  });

  UI.PopulateRow(Store.getstored());
};