var Job = require('../models/job');
var rp = require('request-promise');
var validUrl = require('valid-url');

module.exports = function(app) {

  app.get('/jobs/:id', function(req, res) {
    // find job by id in database
    Job.findById(req.params.id)
    .then(function(job) {
        res.json(job);
    })
    .catch(function(err) {
      res.status(404).json({error: 'ID not found'});
      if (err) throw err;
    });
  });

  app.post('/jobs', function(req, res) {
    Job.create(req.body)
      .then(function(job) {
        // check if valid url
        if (validUrl.isUri(job.url)) {
          res.json(job);
        }
        // fetch and store html
        rp(job.url)
        .then(function(html) {
          job.html = html;
          job.status = 'Complete';
          job.save();
        })
        .catch(function(err) {
          res.status(404).json({error: 'Invalid URL ' + job.url});
          if (err) throw err;
        });
      })
      .catch(function(err){
        if (err) throw err;
      });
  });
};
