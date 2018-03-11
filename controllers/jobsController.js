var Job = require("../models/job");
var rp = require("request-promise");
var validUrl = require("valid-url");

module.exports = function(app) {

  app.get("/jobs/:id", function(req, res) {
    Job.findById(req.params.id)
    .then(function(job) {
        res.json(job);
    })
    .catch(function(err){
      res.status(404).json({error: "ID not found"});
      if (err) throw err;
    })
  });

  app.post("/jobs", function(req, res) {
    Job.create(req.body)
      .then(function(job) {
        res.json(job);
        return job;
      })
      .catch(function(err){
        if (err) throw err;
      })
      .then(function(job) {
        rp(job.url)
        .then(function(html) {
          job.html = html;
          job.status = "complete";
          job.save();
        })
        .catch(function(err) {
          
        });
      })
      .catch(function(err){
        if (err) throw err;
      })
  });
};
