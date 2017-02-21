const moment = require('moment');
const {ipcRenderer} = require('electron');
let timer = null;
let segundos = 0;

module.exports = {
    iniciar(el){
        let time = moment.duration(el.innerHTML);
        segundos = time.asSeconds();    
        clearInterval(timer);
        timer = setInterval(() => {
            segundos++;
            el.innerHTML = this.segundosParaTempo(segundos);
        },1000);
    },
    parar(curso){
        clearInterval(timer);
        ipcRenderer.send('curso-parado', curso, this.segundosParaTempo(segundos));
    },
    segundosParaTempo(segundos){
        return moment().startOf('day').seconds(segundos).format("HH:mm:ss");
    }
}
