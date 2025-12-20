const API_KEY = "f293dea9";
let currentFavoriteMovies = 0;
let movie;
const favoriteGrid = document.getElementById("favoriteGrid");
const cards = favoriteGrid.querySelectorAll(".gridCard");

document.querySelector("form").addEventListener("submit", getData);
let curMovie = document.getElementById("curMovieDetails");

async function getData(e) {
    e.preventDefault();  
    const movieName = document.getElementById("movieName").value;

    if(movieName==="") {
        showToast("Please search for a movie first");
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

    image.style.display = "initial"; //displaying image
    firstMovie.textContent = movie.Title; //changing to movie title
    curMovie.querySelector("p").textContent = movie.Plot; //adding movie plot
    curMovie.style.display = "initial"; //displaying movie plot
    untoggleHeart(document.getElementById("curHeart"));
    }
    catch (err) {
        console.error("Fetch failed:", err.message);
        showToast("Movie not found!");
        return []; // prevents crashes
  }
}

function addToFavorites(heart) {

    if(currentFavoriteMovies===3) {
    showToast("Out of space");
    return;
    }

    if(curMovie.querySelector("p").textContent==="") {
        showToast("Please search for a movie first");
        return;
    }

    if(isDuplicate(movie.Title)) {
        showToast("Cannot add duplicates to favorites!");
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

    const card = cards[currentFavoriteMovies];

    // const card = heart.closest(".gridCard");
    const curFavDetails = card.querySelector("details");
    const curFavDetailsContent = card.querySelector("details p");
    curFavDetails.classList.remove("hideMovieDetails");
    curFavDetailsContent.textContent = movie.Plot;
    toggleHeart(heart);
    toggleHeart(cards[currentFavoriteMovies].querySelector(".heart"));
    cards[currentFavoriteMovies++].querySelector(".favorite-title").textContent = movie.Title;
    showToast(`${movie.Title} added to favorites!`, "success");
}

function removeFromFavorites(heart) {

    const card = heart.closest(".gridCard");
    if(card.querySelector("p").textContent === "") {
        showToast("No movie favorited here");
        return;
    }

    const img = card.querySelector("img");
    const title = card.querySelector(".favorite-title");
    showToast(`${title.textContent} removed from favorites!`, "success");
    untoggleHeart(heart);
    img.src = "";
    img.style.display = "none";

    const currentTitle = document.getElementById("currentMovieName").textContent;
    const currentHeart = document.querySelector("#currentMovie .heart");
    if (title.textContent === currentTitle) {
        untoggleHeart(currentHeart);
    }
    title.textContent = "";

    // title.textContent = "Movie Title";
    img.classList.remove("placeholder");
    const curFavDetails = card.querySelector("details");
    curFavDetails.classList.add("hideMovieDetails");
    currentFavoriteMovies = Math.max(0, currentFavoriteMovies - 1);
}
// ♥♡
function toggleHeart(heart) {
    heart.textContent = "♥";
    heart.style.color="red";
}
// ♥♡
function untoggleHeart(heart) {
    if(document.getElementById("movieName").value==="") {
        showToast("Please search for a movie first!");
        return;
    }
    heart.textContent = "♡";
    heart.style.color="#FFD25C";
}

function isDuplicate(movieTitle) {
    for(let card of cards) {
        const title = card.querySelector(".favorite-title");

        if(title.textContent === movieTitle) {
            return true;
        }
    }
    return false;
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, 2000);
}