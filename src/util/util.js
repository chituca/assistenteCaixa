module.exports = {
    formataReal: function(n) {
        var valor = parseFloat(n);
        n = String(valor.toFixed(2));
        var v = n.replace(/\D/g, "").replace(/(\d{2})$/, ",$1").replace(/(\d+)(\d{3},\d{2})$/g, "$1.$2");
        var qtdLoop = (v.length - 3) / 3;
        var count = 0;
        while (qtdLoop > count) {
            count++;
            v = v.replace(/(\d+)(\d{3}.*)/, "$1.$2");
        }
        return "R$ " + v;
    },
    formataData: function(str){
        var data_siopi = str.replace(/[^\d]+/g, '');
        return data_siopi.substr(6,2)+"/"+data_siopi.substr(4,2)+"/"+data_siopi.substr(0,4);
    },

    soNumero: function(str){
        let numero = str.replace(/[^\d]+/g, '');
        return parseInt(numero);
    },

    geraSupresinha:  function(max, min, qtd){
        //let max = 20;
        let random = [];
        for(let i = 0; i < qtd ; i++) {
            let temp = Math.floor(Math.random() * (max - min + 1)) + min;
            if(random.indexOf(temp) == -1){
                random.push(temp);
            } else
                i--;
        }
        return random.sort();
    }
}