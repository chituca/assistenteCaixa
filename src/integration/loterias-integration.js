const request = require('request');
const config = require('../config/config');

function resultadoLoteria(jogo, concurso){

    console.log('loterias-integration resultadoLoteria!');
    
    var options = {
        
        url: process.env.GATEWAY_ENDPOINT+process.env.PATH_LOTERIAS+jogo+process.env.QUERY_LOTERIAS+concurso,   
        method: 'GET',
        rejectUnauthorized: false,
        headers: {
            'content-type': 'application/json',
        },
        //body:JSON.stringify(contato)
        
    };
   // console.log(options.url);
    let promise = new Promise((resolve, reject) => {

        request.get(options, (err, response) => {
            if (err)
                return reject(err);

            resolve(JSON.parse(response.body));
        });

    });

    return promise;
}


module.exports = {

    resultadoLoteria
}