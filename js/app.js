const header = document.querySelector(".header");
const form = document.querySelector("#search-image");
const containerImages = document.querySelector(".container-images");

eventListeners();

function eventListeners() {
	// Reload page with click on logo
	header.addEventListener("click", () => {
		window.location.reload();
	});

	form.addEventListener("submit", validateForm);
}

function validateForm(e) {
	e.preventDefault();

	const searchText = form.querySelector("input").value;

	if (searchText === "") return showMessage("Type a term", "error");
}

function showMessage(message, type) {
	const title = document.querySelector(".container-search__text");
	title.textContent = message;

	if (type === "error") title.classList.add("--error");

	setTimeout(() => {
		title.textContent = "Search images";
		title.classList.remove("--error");
	}, 1500);
}

const URL_KEY = "22759007-e01cd5e7d0af1eceb4995385a";
const URL = `https://pixabay.com/api/?key=${URL_KEY}&orientation=horizontal&min_width=250&min_height=100`;

fetch(URL)
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
	})
	.catch((error) => console.log(error));
