const {ipcRenderer} = require('electron');
let timer = require('./timer.js')
const botaoIniciar = document.querySelector('#botao-iniciar');
const botaoParar = document.querySelector('#botao-parar');
const botaoAdicionar = document.querySelector('#botao-adicionar');
const timerEl = document.querySelector('.timer');
const cursoEl = document.querySelector('.curso');
const campoCursoEl = document.querySelector('#campo-curso');


botaoIniciar.addEventListener("click", () => {
    timer.iniciar(timerEl);
})
botaoParar.addEventListener('click', () => {
    timer.parar(cursoEl.innerHTML);
})
botaoAdicionar.addEventListener('click', () => {
    if(campoCursoEl.value == '') return;
    ipcRenderer.send('curso-adicionado', campoCursoEl.value);
    cursoEl.innerHTML = campoCursoEl.value;
    campoCursoEl.value = '';
})

ipcRenderer.on('curso-trocado',(event, arg) => {
    cursoEl.innerHTML = arg;
});
