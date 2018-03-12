var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// connect to the database
mongoose.connect('mongodb://localhost:27017/jobsDatabase');

// create a schema
var jobSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: 'Pending'
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    url: {
      type: String,
      required: true
    },
    html: {
      type: String
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('Job', jobSchema);
