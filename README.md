# massdrop-challenge
Create a job queue whose workers fetch data from a URL and store the results in a database.  The job queue should expose a REST API for adding jobs and checking their status / results.

Example:

User submits www.google.com to your endpoint.  The user gets back a job id. Your system fetches www.google.com (the result of which would be HTML) and stores the result.  The user asks for the status of the job id and if the job is complete, he gets a response that includes the HTML for www.google.com

## Prerequisites
Node.js, the dependencies listed in package.json, and mongoDB.

## Installing and Running
Open the terminal and run these commands:
```
$ git clone https://github.com/thomasgchen/massdrop-challenge.git
$ cd massdrop-challenge
$ npm install
```

To run the app:
```
$ node app
```

## API
### POST /jobs

Create a new job with a POST request that looks like this:
```
POST localhost:3000/jobs
Content-Type: application/json
{"url": "http://www.google.com"}
```
Successful response looks like this:
```
{
  "url": "http://www.google.com",
  "status": "Pending",
  "createdAt": "2018-03-12T01:50:20.549Z",
  "_id": "5aa5dce423639b7df58f74fb"
}
```

### GET /jobs/:id
Job status can be retrieved with through GET request with id parameter that looks like this:
```
GET localhost:3000/jobs/5aa5dce423639b7df58f74fb
```
Successful response looks like this:
```
{
  "status": "Complete",
  "createdAt": "2018-03-12T01:50:20.549Z",
  "_id": "5aa5dce423639b7df58f74fb",
  "url": "http://www.google.com",
  "html": "<!doctype html>...</body></html>",
}
```
