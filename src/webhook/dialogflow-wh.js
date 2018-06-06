
const controle = require('../controller/dialog-controller');

function webhookCaixa(app){

    console.log("dialogflow-wh webhookCaixa");

    const express = require('express');
    const router = express.Router();  

    router.post('/', resultado);

    app.use('/webhookcaixa', router);
}

async function resultado(req, res){
    try{
        let resultado = await controle.controleDialogo(req.body);
        res.send(resultado);
    } catch(err){
        console.log(err);
        res.status(500);
        res.json(err);
    }
}

module.exports = {
    webhookCaixa
};