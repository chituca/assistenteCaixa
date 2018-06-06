const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const dialogflowwh = require('./src/webhook/dialogflow-wh');

//config middlewares
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));// for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());// for parsing application/json

//config routers
app.get('/teste', function (req, res) {
    res.send('Webhoork Caixa para Google Assistente ativo!');
  });

dialogflowwh.webhookCaixa(app);

app.listen(process.env.PORT || 3000, function () {
  console.log('Caixa server google assistente executando!');
});
