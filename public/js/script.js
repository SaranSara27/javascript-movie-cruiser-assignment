let movies = [];
let favourites = [];
let moviesURL = 'http://localhost:3000/movies';
let favURL = 'http://localhost:3000/favourites';


/* Function to return movies */
function listMovies() {
	let movHtml = movies.map(movie => {
		return `<li class="list-group-item">
		<div class="row">
		<div class="col-12 col-md-6">
		<img src="${movie.posterPath}" width="400" height="300" class="img-response" src="${movie.posterPath}"/>
		</div>
		<div class="col-12 col-md-6">
		<div class="text-center"><h3 style="background-color: rgb(0, 183, 255);border-style: solid;border-radius: 15px;border-color: yellow"> ${movie.title} </h3></div><br>
		<div class="desc"> ${movie.overview} </div>
		<div><h5 style="color: darkblue;display: inline;">&nbsp;&nbsp;Voting : </h5><h6 style="color:magenta;display: inline">${movie.voteCount}</h6>
		<h5 style="color: darkblue;display: inline;">&nbsp;&nbsp;&nbsp;&nbsp;Language : </h5><h6 style="color: magenta;display: inline">${movie.originalLanguage}</h6>
		<br><br>
		<div class="text-center">
		<button onclick="addFavourite(${movie.id})" type="button"
		class="btn btn-success">Add to Favourites</button></div></div>
		</div>
		</div>
		</li>`;
		});
	let mov = document.getElementById('moviesList');
	mov.innerHTML = movHtml;
}
/* Function to get list of movies */
function getMovies() {
	return fetch(moviesURL)
	.then(response => response.json())
	.then(resp => {
		movies = resp;
		listMovies();
		return resp;
	})
	.catch((err)=> { throw new Error(err); });
}


/* Function to return favourites */
function listFavourites() {
	
	let favHtml = favourites.map(movie => {
		return `<li class="list-group-item">
		<div class="row">
		<div class="col-12">
		<div class="text-center"><h4 style="color: rgb(14, 37, 240);background-color: yellow;border-style: solid;border-radius: 5px;border-color: black">${movie.title}</h4></div>
		<img src="${movie.posterPath}" width="220" height="200" class="img-response" src="${movie.posterPath}"/>
		</div>
		</div>
		</li>`;
		});
	let fav = document.getElementById('favouritesList');
	fav.innerHTML = favHtml;

	
}

/* Function to get list of favourites */
function getFavourites() {
return fetch(favURL)
	.then(response => response.json())
	.then(resp => {
		favourites = resp;
		listFavourites();
	return resp;
})
.catch((err)=> { throw new Error(err); });
}

/* Function to add favourite from ID */
function addFavourite(id) {
let mov = movies.filter(m => {
    return m.id === id;
  });
let fav = favourites.filter(f => {
    return f.id === id;
  });
	 if(fav.length > 0) {
		throw new Error('Movie is already added to favourites');
	}
	else {
		return fetch(favURL, {
			method: 'POST',
			body: JSON.stringify(mov[0]),
			headers: { 'Content-Type': 'application/json' }
		}).then(function(response) {
			return response.json();
		}).then(function(fav1) {
			favourites.push(fav1);
			listFavourites();
			return favourites;
		});
	}
}
	

module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution


