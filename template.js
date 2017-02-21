var dataManager = require('./data');

module.exports =   {
    templateInicial: null,
    createMenuTemplate(sobreWin){
        let template = [
            {
                label: 'View',
                submenu: [
                    {
                        role: 'reload'
                    },
                    {
                        role: 'toggledevtools'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        role: 'resetzoom'
                    }
                ]
            },
            {
                role: 'window',
                submenu: [
                    {
                        role: 'minimize'
                    },
                    {
                        role: 'close'
                    }
                ]
            },
            {
                role: 'help',
                submenu: [
                    {
                        label: 'Mais sobre electron',
                        click () { require('electron').shell.openExternal('http://electron.atom.io') },
                        label: 'Sobre o Alura timer',
                        click(){
                            sobreWin.loadURL(`file://${__dirname}/app/sobre.html`);
                            sobreWin.show();
                        }
                    }
                ]
            }
        ];
        return template;
    },
    addToMenuCurso(win,curso){
        this.templateInicial.push(
            {
                label: curso,
                type: 'radio',
                checked: true,
                click () { win.send('curso-trocado', curso) }
            }
        );

        dataManager.addCourseToFile(curso);
        return this.templateInicial;
    },
    createTrayTemplate(win, cb){
        let template = [
            {
                label: 'Cursos'
            },
            {
                type: 'separator'
            }
        ];
        dataManager.getCoursesFromFile()
            .then((courses) => {
                courses.forEach((course) => {
                    let trayItem = {};
                    trayItem.label = course,
                    trayItem.type = 'radio',
                    trayItem.click = () => {
                        win.send('curso-trocado', course)
                    }
                    template.push(trayItem);
                });
                this.templateInicial = template;
                cb(template);
            }).catch((err) => {
                console.log(err);
            });
    }

}
