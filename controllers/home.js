var superagent = require('superagent');
var async = require('async');
var Show = require('../models/Show');
var Dates = require('../models/Dates');
var apikey = require('../config/secrets').trakt;

/**
 * GET /
 * Home page.
 */


exports.index = function(req, res, next) {
	
	res.render('home');
};

/**
 * GET /getShows?date=20140101
 * get show info from api
 */

exports.getShows = function(req, res, next) {
  var date = req.query.date;
  var url = getURL(date);
  storeShows(date, url, res);
};

/**
 * GET /getDates?date=20140101
 * return date info from dates model
 */

exports.getDates = function(req, res, next) {
  var date = req.query.date;
  Dates.find({year: parseInt(date.slice(0,4)), month: parseInt(date.slice(4,6))})
  	.select('date count')
  	.exec(function(err, dates){
  	if(err) {return next(err);}
  	res.json({
  		dates: dates
  	});
  });
  
};


/**
 * GET /date/:date
 * return show info from show model
 */

exports.getDateShows = function(req, res, next) {
	var date = req.params.date;
	Show.find({year: parseInt(date.slice(0,4)), month: parseInt(date.slice(4,6)), day: parseInt(date.slice(6))}, function(err, shows) {

		res.json({
			shows: shows
		});
	});
};


// functions

function getURL (date) {
	
	var turl = 'http://api.trakt.tv/calendar/premieres.json/' + apikey + '/' + date + '/1';
	return turl;
}


function transISODate( isodate ) {
	var t = new Date(isodate);
	return t.toJSON();
}

function storeShows(date, url, res) {
	console.log(url);
		superagent.get(url)
			.accept('json')
			.end(function(err, result) {
				if(err) {return next(err);}
				//console.log(result.body);
				result = result.body[0].episodes;
				var count = 0;
				var showFlag = false;
				for (var i=0;i<result.length;i++) {
					if( (result[i].show.country === 'United States' || result[i].show.country === 'United Kingdom') && parseInt(result[i].episode.season) < 1000) {
						count = count + 1;
						var show = new Show({
				  		title: result[i].show.title,
  						url: result[i].show.url,
  						year: parseInt(date.slice(0,4)),
  						month: parseInt(date.slice(4,6)),
  						day: parseInt(date.slice(6)),
  						firstAir: transISODate(result[i].show.first_aired_iso),
  						onAir: transISODate(result[i].episode.first_aired_iso),
  						category: (result[i].show.country === 'United States') ? '美剧' : '英剧', //美剧、英剧
  						genre: result[i].show.genres,
  						network: result[i].show.network,
  						imdb_id: result[i].show.imdb_id,
  						tvdb_id: result[i].show.tvdb_id,
  						poster: result[i].show.images.poster,
  						season: result[i].episode.season
				  	});
				  	show.save();
					}
			  }
			  
				var dates = new Dates({
				  		date: date,
				  		year: parseInt(date.slice(0,4)),
  						month: parseInt(date.slice(4,6)),
  						count: count
				});
				dates.save();
			  res.json({
			  	count:count
			  });
		});
	
}