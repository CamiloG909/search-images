const header = document.querySelector(".header");
const form = document.querySelector("#search-image");
const containerImages = document.querySelector(".container-images");
const recordsPerPage = 42;
let totalPages;
let paginationGenerator;
let currentPage = 1;

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

	searchImages();
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

function searchImages() {
	const searchText = form.querySelector("input").value;

	const URL_KEY = "22759007-e01cd5e7d0af1eceb4995385a";
	const URL = `https://pixabay.com/api/?key=${URL_KEY}&orientation=horizontal&min_width=250&min_height=100&q=${searchText}&image_type=photo&per_page=${recordsPerPage}&page=${currentPage}`;

	fetch(URL)
		.then((response) => response.json())
		.then((data) => {
			if (data.totalHits === 0) return showMessage("No results found", "error");

			form.reset();
			totalPages = Math.ceil(data.totalHits / recordsPerPage);
			showImages(data.hits);
		})
		.catch((error) => console.log(error));
}

function showImages(images) {
	containerImages.innerHTML = "";

	images.forEach((image) => {
		const article = document.createElement("article");
		article.className = "image-card";
		article.innerHTML = `<figure class="image-card__img">
		<img src="${image.previewURL}" alt="Image">
	</figure>
	<div class="image-card__text">
		<p><span>${image.likes}</span> Likes</p>
		<p class="image-card__text-last"><span>${image.views}</span> Times seen</p>
		<a class="image-card__show-btn" href="${image.largeImageURL}" target="_blank">View image</a>
	</div>`;

		containerImages.appendChild(article);
	});

	showPagination();
}

function* pagination() {
	for (let i = 1; i <= totalPages; i++) {
		yield i;
	}
}

function showPagination() {
	paginationGenerator = pagination();
	document.querySelector(".pagination").innerHTML = "";

	while (true) {
		const { value, done } = paginationGenerator.next();

		if (done) return;

		// Create pagination
		const btn = document.createElement("a");
		btn.className = "pagination__btn";
		btn.href = "#";
		btn.dataset.page = value;
		btn.textContent = value;
		btn.onclick = (e) => {
			e.preventDefault();

			setTimeout(() => {
				scroll(0, 0);
			}, 500);

			currentPage = value;
			searchImages();
		};

		document.querySelector(".pagination").appendChild(btn);
	}
}
