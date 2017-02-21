const {ipcRenderer,remote} = require('electron');
let timer = require('./timer.js');
let dataManager = remote.require('./data.js');
const moment = require('moment');

const botaoIniciar = document.querySelector('#botao-iniciar');
const botaoParar = document.querySelector('#botao-parar');
const botaoAdicionar = document.querySelector('#botao-adicionar');
const timerEl = document.querySelector('.timer');
const cursoEl = document.querySelector('.curso');
const campoCursoEl = document.querySelector('#campo-curso');
const iconeConfig = document.querySelector("#icone-config");

window.onload = () => {
    dataManager.getCourseData(cursoEl.textContent).then((courseData) => {
        let totalTime = moment.duration(courseData.tempo);
        timerEl.innerHTML = formatDuration(totalTime);
    })
}

iconeConfig.addEventListener('click', function(){
    ipcRenderer.send('open-settings-window');
});

botaoIniciar.addEventListener("click", function() {
    timer.iniciar(timerEl);
})
botaoParar.addEventListener('click', function(){
    timer.parar(cursoEl.innerHTML);
})
botaoAdicionar.addEventListener('click', function(){
    if(campoCursoEl.value == '') return;
    ipcRenderer.send('curso-adicionado', campoCursoEl.value);
    cursoEl.innerHTML = campoCursoEl.value;
    timerEl.textContent = "00:00:00";
    campoCursoEl.value = '';
})

ipcRenderer.on('curso-trocado',(event, course) => {
    dataManager.getCourseData(course).then((courseData) => {
        let totalTime = moment.duration(courseData.tempo);
        timerEl.innerHTML = formatDuration(totalTime);
    }).catch((err) => {
        timerEl.textContent = "00:00:00";
        console.log(`Curso ${course} ainda sem registros!`);
    })
    cursoEl.innerHTML = course;
});

function formatDuration(duration){
    let hours,minutes,seconds;
    (duration.hours() < 10) ? hours = "0"+ duration.hours() : hours = duration.hours();
    (duration.minutes() < 10) ? minutes = "0"+ duration.minutes() : minutes = duration.minutes();
    (duration.seconds() < 10) ? seconds = "0"+ duration.seconds() : seconds = duration.seconds();

    return hours + ":" + minutes + ":" + seconds;
}
