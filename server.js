// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const { sendPendingEmails } = require('./src/services/mailService/sendPendingEmail');
const { handleFormSubmission, pendingRequests } = require('./src/services/formSubmission/formSubmission');
const cron = require('node-cron')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('dist'));
app.use(express.json())

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.post('/submit', handleFormSubmission);

// Define a cron job to run every 15 seconds
cron.schedule('*/15 * * * * *', () => {
  if (pendingRequests.length > 0) {
    sendPendingEmails(pendingRequests);
  }
});

process.on('uncaughtException', function (err) {
  console.log('Uncaught Exception:', err);
  // Optionally, you can perform cleanup or logging here.
});
// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
