var jsonfile = require('jsonfile')

module.exports = (curso,tempo) =>{
        return new Promise( (resolve, reject) => {
            let arquivo = `data/${curso}.json`;
            let data = {
                data: new Date().toString(),
                tempo: tempo
            };
            console.log(`${__dirname}/${arquivo}`);
            jsonfile.readFile(`${__dirname}/${arquivo}`, (err, dados) => {
                if(err){
                    if(err.code == 'ENOENT'){
                        // Primeira vez, salva o dado normal
                        jsonfile.writeFile(`${__dirname}/${arquivo}`,[data], {spaces: 2}, (err) => {
                            console.error(err);
                            reject(err);
                        });
                    }else{
                        reject(err.message);
                    }

                }else{
                    dados.push(data);
                    jsonfile.writeFile(`${__dirname}/${arquivo}`, dados, {spaces: 2} , (err) => {
                        console.log(err);
                        resolve();
                    });

                }
            });

        });
}
