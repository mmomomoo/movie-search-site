const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjExOWM3N2JlZWMzZjg1ZGFlNGEyZmVlZGQ4MmQ5NSIsInN1YiI6IjY2MjVjMGFjMmRkYTg5MDE2NGUxNDZkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mRUHyH8VV3djGDd__ILIb4QeEsbfRVwcDxbnUSmFbYg',
    },
};

function fetchHmdb() {
    fetch(
        'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
        options
    )
        .then((response) => response.json())
        .then((data) => {
            //.then((data) => {}) 블록에서는 응답 데이터를 변수에 할당하고 필요한 데이터를 추출
            const movies = data.results;
            const movieCards = document.getElementById('movieCards');
            movieCards.innerHTML = ''; // 검색 결과가 업데이트 될 때마다 이전의 영화 카드들이 그대로 남아있게 되니까 만든것
            const searchWindow = document.getElementById('searchWindow');
            searchWindow.focus(); //.focus() > 겸색창에 자동으로 커서가 옮겨지게 된다.
            movies.forEach((movie) => {
                // movies 배열을 반복해서 카드를 붙임
                const movieHtml = `<div class="movieCard" data-id="${movie.id}">
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
                .querySelector('#searchBtn')
                .addEventListener('click', (event) => {
                    event.preventDefault();
                    const searchTerm = document
                        .querySelector('#searchWindow')
                        .value.toLowerCase();
                    const filteredMovies = movies.filter(
                        (
                            movie // 여기부터 추가분석
                        ) => movie.title.toLowerCase().includes(searchTerm)
                    );
                    const movieCards = document.querySelectorAll('.movie-card');
                    movieCards.forEach((card) => {
                        card.style.display = 'none';
                    });
                    filteredMovies.forEach((movie) => {
                        const card = document.querySelector(
                            `[onclick="window.alert(${movie.id})"]`
                        );
                        card.style.display = 'block';
                    });
                });
            movieCards.addEventListener('click', (event) => {
                const clickedCard = event.target.closest('.movieCard');
                if (clickedCard) {
                    const movieId = clickedCard.getAttribute('data-Id');
                    alert(`영화 ID: ${movieId}`);
                }
            });
        })
        .catch((err) => console.error(err));
}

fetchHmdb();
