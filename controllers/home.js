var superagent = require('superagent');
var async = require('async');

/**
 * GET /
 * Home page.
 */

exports.index = function(req, res, next) {
	superagent.get('http://thetvdb.com/api/GetSeries.php?seriesname=')
		.end(function(err, result) {
			if(err) {return next(err);}
			//console.log(result.body);
			
		});
  
};