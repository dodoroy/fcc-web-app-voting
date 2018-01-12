'use strict';

var Polls = require('../models/polls.js');

function PollHandler () {
	
	// get poll list
	this.getPolls = function (req, res) {
		Polls
			.find({}, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result);
			});
	};
	
	// get a poll
	this.getPoll = function (req, res) {
		console.log(req.params)
		console.log(req.body)
		console.log(req.query)
		var id = req.params.id;
		Polls
			.find({id: id}, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result);
			});
	};

	// add a poll
	this.addPoll = function (req, res) {
		console.log(req.body);
		var pollInfo = req.body;
		
		var newPoll = new Polls();
		newPoll.id = Date.now().toString();
		newPoll.userId = 'idid';//req.user.github.id;
		newPoll.pollname = pollInfo.pollname;
		newPoll.options = []; 
		for (var i = 0; i < 2; i++) {
			var tmp = {};
			tmp[pollInfo.option[i]] = 0;
			newPoll.options.push(tmp);
		}
	
		newPoll.save(function (err) {
			if (err) {
				throw err;
			}

		//	res.json(newPoll)
			res.redirect('/poll/' + newPoll.id)
		});
	};

	// delete a poll
	this.deletePoll = function (req, res) {
		var pollId = req.query.id;
		
		Polls
			.findOneAndUpdate({ pollname: pollId }, { })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result);
				//	res.redirect('/')
				}
			);
	};
	
	// update poll votes
	this.udpatePoll = function (req, res) {
		var id = req.params.id;

		console.log(req.body);console.log('tt')
		Polls
			.findOneAndUpdate({ id: id }, { })
			.exec(function (err, result) {
					if (err) { throw err; }

				//	res.json(result);
					res.redirect('/poll/' + id)
				}
			);
	};

}

module.exports = PollHandler;
