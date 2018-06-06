const loteriasService = require('../services/loterias-service');
const saudacao = require('../dialogo/saudacoes');

async function controleDialogo(body){
    console.log("DialogFlow Controller...");

    let retorno;
    let inputAction =
            body.queryResult &&
            body.queryResult.action
        ? body.queryResult.action
        : 'action.error';
    let lastSeen =
            body.originalDetectIntentRequest &&
            body.originalDetectIntentRequest.payload.user &&
            body.originalDetectIntentRequest.payload.user.lastSeen
          ? body.originalDetectIntentRequest.payload.user.lastSeen
          : '';
    let isLoteria = 
          body.queryResult &&
          body.queryResult.parameters &&
          body.queryResult.parameters.Loterias
          ? true
          : false;

    if (!inputAction || inputAction === 'action.error'){
        retorno = saudacao.saudacoes.DESCULPE;
    } else if(inputAction === 'input.welcome') {
        if (!lastSeen){
            retorno = saudacao.saudacoes.BOAS_VINDAS;
        } else {
            retorno = saudacao.saudacoes.VOLTEI;
        }
    } else if(isLoteria){
        retorno = await loteriasService.fluxoLoterias(body);
    }
  return retorno;
}
module.exports = {
    controleDialogo
}