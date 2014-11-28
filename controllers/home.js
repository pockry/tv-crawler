var superagent = require('superagent');
var async = require('async');

/**
 * GET /
 * Home page.
 */

exports.index = function(req, res, next) {
	var apikey = '1b6d64de3bfe79d1b8ce7ac3bacee468';
	var rawurl = 'http://api.trakt.tv/calendar/premieres.json/' + apikey;
	var date = '20110101';
	var days = 1;
	var url = rawurl + '/' + date + '/' + days;
	console.log(url);
	superagent.get(url)
		.end(function(err, result) {
			if(err) {return next(err);}
			//console.log(result.body);
			
			res.render('home', {
				title: 'index',
				result: result.body[0]
			});
		});
  
};