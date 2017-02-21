const {ipcRenderer,remote} = require('electron');
let dataManager = remote.require('./data.js');

const selectEl = document.querySelector('#cursos-select');
const closeIcon = document.querySelector('.close-icon');

window.onload = () => {
    dataManager.getCoursesFromFile().then((courses) => {
        courses.forEach((course) => {
            var option = document.createElement("option");
            option.textContent = course;
            option.value = course;
            selectEl.appendChild(option);
        })
    })
}


closeIcon.addEventListener('click', function(){
    ipcRenderer.send('close-settings-window');
    console.log('clicado');
});
