var belvo = require('belvo').default

const express = require('express')
const app = express();
const port = process.env.PORT || 3000;

var client = new belvo(
  '9b949107-1f2e-4170-9455-13f965db91ef',
  'V60YJXFlZB7jN#omEcNAXEM@Xs9Ezvic5q5sXZf7Ixaz4EvBlnRgE2UQiv@Ph28B',
  'https://sandbox.belvo.com'
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/getTransactions' , (req, res) => {
  client.connect()
  .then(function () {
    client.transactions.list()
    .then(function (response) {
      var transactions = [];
      for (i = 0; i < response.length; i++) {
        if (req.query.id == response[i].account.id) {
          transactions.push(response[i])
        }
      }
      res.json(response);
    })
    .catch(function (error) {
      res.status(401).send({
        message: error.message
      })
    })
  })
})

app.get('/getAccounts' , (req, res) => {
  client.connect()
  .then(function () {
    client.accounts.list()
    .then(function (response) {
      var accounts = [];
      for (i = 0; i < response.length; i++) {
        if (req.query.link == response[i].link) {
          accounts.push(response[i]);
        }
      }
      res.json(accounts);
    })
    .catch(function (error) {
      res.status(401).send({
        message: error.message
      });
    });
  });
});

app.get('/getAccessToken', (req, res) => {
  client.connect()
    .then(function () {
          client.widgetToken.create()
        .then((response) => {
        res.json(response);
          })
        .catch((error) => {
        res.status(500).send({
          message: error.message
        });
      });
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
});
