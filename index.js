var belvo = require('belvo').default

const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;

var client = new belvo(
  'ab4fd7e8-f660-4706-9766-75c48b5c94d7',
  '29h2bWWa8wsGc154M*VUo5lZhG*Zwmob1R*Es4NSAiF#iKerLq5g9Gi8eD@mBXtK',
  'https://development.belvo.com'
);

app.get('/', (req, res) => {
  res.send('Hello World!');
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
  console.log(`Example app listening on port ${port}!`)
});
