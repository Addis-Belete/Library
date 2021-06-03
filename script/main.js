window.onload = function () {
	myform = document.getElementById('myform')

	dynamicHere = document.getElementById('dynamicHere')
	cardBody = document.getElementsByClassName('cart-body')[0]

	myform.addEventListener('submit', function (e) {
		e.preventDefault();
		authorName = document.getElementById('authorName').value
		bookName = document.getElementById('bookName').value
		isbn = document.getElementById('isbn').value
		bookRead = document.getElementById('dropdown').value

		if (authorName == '' || bookName == '' || isbn == '' || bookRead == '') {
			UI.messages('Enter All fields', 'Danger');
			return
		} else {
			var book = new Book(authorName, bookName, isbn, bookRead)
			UI.displayData(book)
			Store.setStored(book)
			UI.clearfields()
			UI.messages('Data inserted', 'success')
		}
	})

	dynamicHere.addEventListener('click', function (e) {
		UI.removeRow(e.target)
	})

	class Book {
		constructor(authorName, bookName, isbn, read) {
			this.authorName = authorName
			this.bookName = bookName
			this.isbn = isbn
			this.read = read
		}
	}

	class UI {
		static clearfields() {
			document.getElementById('authorName').value = ''
			document.getElementById('bookName').value = ''
			document.getElementById('isbn').value = ''
		}

		static displayData(book) {
			let books = Store.getstored()
			books.push(book)
			UI.PopulateRow(books)
		}

		static PopulateRow(books) {
			while (dynamicHere.firstChild) {
				dynamicHere.firstChild.remove(dynamicHere.firstChild)
			}
			books.forEach(everydata => {
				dynamicHere.innerHTML += `
        <tr>
              <td>${everydata.authorName}</td>
              <td>${everydata.bookName}</td>
              <td>${everydata.isbn}</td>
<td>${everydata.read}</td>
              <td><button class='btn btn-danger removeit'>X</button></td>
        </tr>`
			})

		}

		static messages(txt, className) {
			let div = document.createElement('div')
			div.className = `alert alert - ${className}`
			div.innerHTML = txt;
			cardBody.insertBefore(div, myform)

			setTimeout(function () {
				div.remove()
			}, 2000)
		}

		static removeRow(element) {
			if (element.classList.contains('removeit')) {
				let isbn = element.parentElement.parentElement.firstElementChild.innerText;
				Store.removeStoredValue(isbn)
				element.parentElement.parentElement.remove();
			}
		}
	}

	class Store {
		static getstored() {
			let books = ''
			if (localStorage.getItem('book') == null) {
				books = []
			} else {
				books = JSON.parse(localStorage.getItem('book'))
			}
			return books
		}

		static setStored(obj) {
			let booksFromLocal = Store.getstored()
			booksFromLocal.push(obj)
			localStorage.setItem('book', JSON.stringify(booksFromLocal))
		}

		static removeStoredValue(isbn) {
			let Albooks = Store.getstored()
			Albooks.forEach(function (everydata, index) {
				if (everydata.isbn == isbn) {
					Albooks.splice(index, 1)
				}
			})
			localStorage.setItem('book', JSON.stringify(Albooks))
		}
	}

	UI.PopulateRow(Store.getstored())
}