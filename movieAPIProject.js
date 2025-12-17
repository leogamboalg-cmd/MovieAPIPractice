const API_KEY = "f293dea9";
console.log("API KEY:", API_KEY);

document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
});



async function getData() {
    const movieName = document.getElementById("movieName").value;

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
    // console.log(data);

    if (data.Response === "False") {
      throw new Error(data.Error);
    }

    // 3. Data existence check
    if (!data.Search || data.Search.length === 0) {
      throw new Error("No movies found");
    }
    

    let firstMovie = document.getElementById("test");
    let image = document.getElementById("testImg");
    
    console.log(data);
    const movie = data.Search[0];
    const name = movie.Title;
    firstMovie.textContent = name;
    image.src = movie.Poster;
    }
    catch (err) {
        console.error("Fetch failed:", err.message);

        return []; // prevents crashes
  }
}
