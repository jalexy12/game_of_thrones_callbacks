var fs = require('fs');

function fileActions(error, episodes){
	if(error){
		console.log("You have an error");
		throw(error);
	} else {
		var parsedEpisodes = JSON.parse(episodes);
		sortEpisodes(parsedEpisodes, episodePrinter);
	}
}

function sortEpisodes(episodes, callback){
	var sortedEpisodes = episodes.sort(function(a, b){
		return a.episode_number-b.episode_number
	});
	callback(sortedEpisodes);
}

function episodePrinter(episodes){
	episodes.forEach(function(episode){
		stars = starMaker(episode.rating)
		console.log("Title: " + episode.title + " | " + episode.episode_number);
		console.log(episode.description);
		console.log("Rating: " + episode.rating + " " + stars +  "\n");
	});
}

function starMaker(rating){
	var stars = "";
	var rounded_rating = Math.floor(rating);
	for (var i = 0; i < rounded_rating; i++){
		stars = stars +  "*";
	}
	return stars;
}

fs.readFile('./GoTEpisodes.json', 'utf8', fileActions);
