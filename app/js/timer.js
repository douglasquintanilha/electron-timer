const moment = require('moment');
const {ipcRenderer} = require('electron');
let timer = null;
let segundos = 0;

module.exports = {
    iniciar(el){
        el.innerHTML = "00:00:00";
        segundos = 0;
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
