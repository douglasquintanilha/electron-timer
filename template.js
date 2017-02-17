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
                click () { win.send('curso-trocado', curso) }
            }
        );
        return this.templateInicial;
    },
    createTrayTemplate(win){
        let template = [
            {
                label: 'Cursos'
            },
            {
                type: 'separator'
            },
            {
                label: 'introducao-ao-javascript',
                type: 'radio',
                click () { win.send('curso-trocado', 'introducao-ao-javascript') }
            },
            {
                label: 'java-oo',
                type: 'radio',
                click () { win.send('curso-trocado', 'java-oo') }
            },
            {
                label: 'php-e-mysql',
                type: 'radio',
                click () { win.send('curso-trocado', 'php-e-mysql') }
            }
        ];
        this.templateInicial = template;
        return template;
    }

}
