var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// connect to the database
mongoose.connect("mongodb://localhost:27017/jobsDatabase");

// create a schema
var jobSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "pending"
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

module.exports = mongoose.model("Job", jobSchema);
