const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjExOWM3N2JlZWMzZjg1ZGFlNGEyZmVlZGQ4MmQ5NSIsInN1YiI6IjY2MjVjMGFjMmRkYTg5MDE2NGUxNDZkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mRUHyH8VV3djGDd__ILIb4QeEsbfRVwcDxbnUSmFbYg",
    },
};

function fetchHmdb() {
    fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=ko-US&page=1",
        options
    )
        .then((response) => response.json())
        .then((data) => {
            const movies = data.results;
            console.log(movies);
            const movieCards = document.getElementById("movieCards");
            movieCards.innerHTML = "";
            movies.forEach((movie) => {
                const movieHtml = `<div class="movie-card" onclick="window.alert(${movie.id})">
                <div class="card h-100">
                    <div class="card-body">
                        <div id="movieImg">
                            <img
                                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                                class="card-img-top"
                                alt="${movie.title}"
                            />
                        </div>
                        <div id="movieText">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text">${movie.overview}</p>
                            <p class="gpa">
                                영화 평점 : ${movie.vote_average}
                            </p>
                        </div>
                    </div>
                </div>
            </div>`;
                movieCards.innerHTML += movieHtml;
            });

            document
                .querySelector("#searchBtn")
                .addEventListener("click", (event) => {
                    event.preventDefault();
                    const searchTerm = document
                        .querySelector("#searchWindow")
                        .value.toLowerCase();
                    const movieCards = document.querySelectorAll(".movie-card");
                    movieCards.forEach((card) => {
                        const titleElement = card.querySelector(".card-title");
                        const titleText =
                            titleElement.textContent.toLowerCase();
                        if (titleText.includes(searchTerm)) {
                            card.style.display = "block";
                        } else {
                            card.style.display = "none";
                        }
                    });
                });
        })
        .catch((err) => console.error(err));
}

fetchHmdb();
