let myLibrary = [];
const author = document.querySelector('.author')
const title = document.querySelector('.title')
const bookPage = document.querySelector('.number')
const read = document.querySelector('#dropdown')
const myHeading = document.querySelector('h1')
myHeading.textContent = "is it working"

function Book(author, title, numOfPage, read) {
	this.author = author;
	this.title = title;
	this.numOfPage = numOfPage;
	this.read = read;
}

function addBookToLibrary() {
	if (author.value && title.value && bookPage.value && read.value) {
		myLibrary.push(new Book(author.value, title.value, bookPage.value, read.value))
		alert("Book added successfully")

	} else {
		alert("please enter all information")
	}
}

submit.addEventListener('click', (e) => {
	addBookToLibrary()
})

function displayBooks() {

}