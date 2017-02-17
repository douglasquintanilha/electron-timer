const {ipcRenderer, shell} = require('electron');

const botaoFechar = document.querySelector('#botao-fechar');
const linkTwitter = document.querySelector('#link-twitter');

botaoFechar.addEventListener('click', () => {
    ipcRenderer.send('fechar-sobre');

});
linkTwitter.addEventListener('click', () => {
    shell.openExternal('https://www.twitter.com/dquintanilhas');
});
