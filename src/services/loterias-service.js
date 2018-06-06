const lotIntegration = require('../integration/loterias-integration');
const config = require('../config/config');
const lot = require('../dialogo/loterias-dialogo');
const util = require('..//util/util');

async function fluxoLoterias(body){
    let retorno;
    let isSurpresinha = 
    body.queryResult &&
    body.queryResult.parameters &&
    body.queryResult.parameters.Supresinha
    ? true
    : false
    
    if(isSurpresinha){
        return this.geraSupresinha(body);
    } else {
        return this.resultado(body);
    }
}

async function resultado(body) {
    console.log("loterias-service resultado");

    let retorno;
    let loteriaSelecionada = 
        body.queryResult &&
        body.queryResult.parameters &&
        body.queryResult.parameters.Loterias
        ? body.queryResult.parameters.Loterias
        : "Erro ao identificar a loteria";
    let concurso =
            body.queryResult &&
            body.queryResult.parameters &&
            body.queryResult.parameters.concurso
          ? body.queryResult.parameters.concurso
          : '';
    
    let retornoLoteria = await lotIntegration.resultadoLoteria(loteriaSelecionada, concurso);

    if (!retornoLoteria.resultado){
        retorno = "Não localizei esse concurso para "+loteriaSelecionada+", por favor, refaça a pergunta.";
   } else {

    switch(loteriaSelecionada){
        case config.loterias.Mega:
            retorno = lot.getMegaSena(retornoLoteria);
            break; 
        case config.loterias.Quina:      
            retorno = lot.getQuina(retornoLoteria);
            break;
        case config.loterias.Lotofacil:      
            retorno = lot.getLotofacil(retornoLoteria);
            break;
        case config.loterias.Lotomania:      
            retorno = lot.getLotomania(retornoLoteria);
            break;
        case config.loterias.Timemania:      
            retorno = lot.getTimemania(retornoLoteria);
            break;
        case config.loterias.Dupla:      
            retorno = lot.getDuplaSena(retornoLoteria);
            break;
        case config.loterias.Federal:      
            retorno = lot.getFederal(retornoLoteria);
            break;
        default:
            retorno = "Loteria não localizada."
    
    }
  }
  return retorno;
}

async function supresinha(body) {
    console.log("loterias-service surpresinha");

    let retorno;
    let loteriaSelecionada = 
        body.queryResult &&
        body.queryResult.parameters &&
        body.queryResult.parameters.Loterias
        ? body.queryResult.parameters.Loterias
        : "Erro ao identificar a loteria";

    switch(loteriaSelecionada) {
        case config.loterias.Mega:
            retorno = util.geraSupresinha(config.mega.MAX,config.mega.MIN,config.mega.QTD);
            break; 
        case config.loterias.Quina:      
            retorno = util.geraSupresinha(config.quina.MAX,config.quina.MIN,config.quina.QTD);
            break;
        case config.loterias.Lotofacil:      
            retorno = util.geraSupresinha(config.lotofacil.MAX,config.lotofacil.MIN,config.lotofacil.QTD);
            break;
        case config.loterias.Lotomania:      
            retorno = util.geraSupresinha(config.lotomania.MAX,config.lotomania.MIN,config.lotomania.QTD);
            break;
        case config.loterias.Timemania:      
            retorno = util.geraSupresinha(config.timemania.MAX,config.timemania.MIN,config.timemania.QTD);
            break;
        case config.loterias.Dupla:      
            retorno = util.geraSupresinha(config.dupla.MAX,config.dupla.MIN,config.dupla.QTD);
            break;
        default:
            retorno = "Não foi posssível gerar a surpresinha solicitada."
  }
  return retorno;
}
     
module.exports = {
    fluxoLoterias
}