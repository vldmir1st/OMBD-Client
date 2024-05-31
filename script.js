const apiKey = "b0b05796";
const apiUrl = "https://www.omdbapi.com/";

window.onload = function () {
    document
        .getElementById("searchForm")
        .addEventListener("submit", function (event) {
            event.preventDefault();

            const formData = new FormData(this);
            const title = formData.get("title");

            searchMovie(title)
                .then((data) => {
                    const movieInfo = `
                <h2>${data.Title}</h2>
                <p><strong>Год выпуска:</strong> ${data.Year}</p>
                <p><strong>Жанр:</strong> ${data.Genre}</p>
                <p><strong>Режиссер:</strong> ${data.Director}</p>
                <p><strong>Актеры:</strong> ${data.Actors}</p>
                <p><strong>Описание:</strong> ${data.Plot}</p>
                <img src="${data.Poster}" alt="${data.Title}">`;
                    document.getElementById("movieInfo").innerHTML = movieInfo;
                })
                .catch((error) => {
                    document.getElementById(
                        "movieInfo"
                    ).innerHTML = `<p>${error}</p>`;
                });
        });
};

function searchMovie(title) {
    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}?t=${title}&apikey=${apiKey}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Ошибка при получении данных");
                }
                return response.json();
            })
            .then((data) => {
                if (data.Response === "False") {
                    throw new Error(data.Error);
                }
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
