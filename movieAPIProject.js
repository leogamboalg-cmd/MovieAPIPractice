let API_KEY = "f293dea9";

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
});

const movieName = document.getElementById("movieName").value;

const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`;

let firstMovie = document.getElementById("test");
let image = document.getElementById("testImg");

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    firstMovie.textContent = movieName;
    const movie = data.Search[0];
    image.src = movie.Poster;
}
