const API_KEY = "f293dea9";
let currentFavoriteMovies = 0;
let movie;
const favoriteGrid = document.getElementById("favoriteGrid");
const cards = favoriteGrid.querySelectorAll(".gridCard");

document.querySelector("form").addEventListener("submit", getData);


async function getData(e) {
    e.preventDefault();  
    const movieName = document.getElementById("movieName").value;

    if(movieName==="") {
        alert("Please search for a movie first!");
        return;
    }
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${movieName}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
    // console.log(data);

    if (data.Response === "False") {
        throw new Error(data.Error);
    }

    // // 3. Data existence check
    // if (!data.Search || data.Search.length === 0) {
    //     throw new Error("No movies found");
    // }
    

    let firstMovie = document.getElementById("currentMovieName");
    let image = document.getElementById("currentMovieImg");
    
    console.log(data.Search);
    movie = data;

    if(movie.Poster === "N/A") {
        image.src = "./images/noImageAvailable.png";
    }   else{
        image.src = movie.Poster;
    }
    image.onerror = () => {
        image.src = "./images/noImageAvailable.png";
        image.classList.add("placeholder");
    };

    image.style.display = "initial";
    firstMovie.textContent = movie.Title;
    }
    catch (err) {
        console.error("Fetch failed:", err.message);
        alert("Movie not found!");
        return []; // prevents crashes
  }
}

function addToFavorites(heart) {

    if(currentFavoriteMovies===3) {
    alert("Out of space!");
    return;
    }

    if(document.getElementById("movieName").value==="") {
        alert("Please search for a movie first!");
        return;
    }

    const img = cards[currentFavoriteMovies].querySelector("img");  
    if(movie.Poster === "N/A") {
        img.src = "./images/noImageAvailable.png";
    }   else{
        img.src = movie.Poster;
    }
    img.onerror = () => {
        img.src = "./images/noImageAvailable.png";
        img.classList.add("placeholder");
    };
    img.style.display = "initial";
    toggleHeart(heart);
    toggleHeart(cards[currentFavoriteMovies].querySelector(".heart"));
    cards[currentFavoriteMovies++].querySelector(".favorite-title").textContent = movie.Title;
}

function removeFromFavorites(heart) {
    const card = heart.closest(".gridCard");
    const img = card.querySelector("img");
    const title = card.querySelector(".favorite-title");
    untoggleHeart(heart);
    img.src = "";
    img.style.display = "none";

    const currentTitle = document.getElementById("currentMovieName").textContent;
    const currentHeart = document.querySelector("#currentMovie .heart");
    if (title.textContent === currentTitle) {
        untoggleHeart(currentHeart);
    }

    title.textContent = "Movie Title";
    img.classList.remove("placeholder");
    currentFavoriteMovies = Math.max(0, currentFavoriteMovies - 1);
}
// ♥♡
function toggleHeart(heart) {
    heart.textContent = "♥";
    heart.style.color="red";
}
// ♥♡
function untoggleHeart(heart) {
    if(document.getElementById("movieName").value===null) {
        alert("Please search for a movie first!");
        return;
    }
    heart.textContent = "♡";
    heart.style.color="#FFD25C";
}
