var mongoose = require('mongoose');

var showSchema = new mongoose.Schema({
  title: String,
  transName: String,
  url: String,  //trakt.tv link
  year: Number,  // onair year
  month: Number, // onair month
  day:   Number, // onair day
  firstAir: String, // first on air iso date
  onAir: String,  // this season first on air
  category: String, //美剧、英剧
  genre: Array,
  network: String,
  imdb_id: String,
  tvdb_id: String,
  poster: String,
  season: Number,
  episodes: [{
    episode: Number,
    title: String,
    onAir: String
  }]
});





module.exports = mongoose.model('Show', showSchema);
