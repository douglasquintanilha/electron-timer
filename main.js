const {app, BrowserWindow, Menu, ipcMain, Tray} = require('electron')
const templateGenerator = require('./template');
const path = require('path');
const dataManager = require('./data');
let win = null;
let tray = null;
app.on('ready', () => {
    console.log("App iniciado");
    win = new BrowserWindow({
        width: 600,
        height: 400,
        icon: __dirname + '/app/img/icon2.png'
    });
    win.loadURL(`file://${__dirname}/app/index.html`);
    win.webContents.openDevTools();

    let sobreWin = new BrowserWindow({
        width: 300,
        height: 200,
        icon: __dirname + '/app/img/icon2.png',
        show: false,
        frame: false,
        parent: win
    });

    const conteudoMenu = Menu.buildFromTemplate(templateGenerator.createMenuTemplate(sobreWin))
    const conteudoMenu = Menu.buildFromTemplate(require('./templateMenu')(sobreWin))

    Menu.setApplicationMenu(conteudoMenu);

    tray = new Tray(path.join(__dirname,"app/img/icon2.png"));
    tray.setToolTip('Escolha aqui seu curso');

    templateGenerator.createTrayTemplate(win, (template) => {
        const trayMenu = Menu.buildFromTemplate(template);
        tray.setContextMenu(trayMenu);
    });

});

app.on('window-all-closed', () => {
    app.quit();
});


ipcMain.on('curso-parado', (event, curso, tempo) => {
    console.log(`O curso ${curso} foi estudado por ${tempo}`);
    dataManager.logCourseTime(curso,tempo);
})

ipcMain.on('curso-adicionado',(event,curso) => {
    const trayMenu = Menu.buildFromTemplate(templateGenerator.addToMenuCurso(win,curso));
    tray.setContextMenu(trayMenu);
})

ipcMain.on('fechar-sobre', (event) => {
    sobreWin.hide();
});

let settingsWindow = null;
ipcMain.on('open-settings-window', (event) => {
    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({
        frame: false,
        height: 300,
        resizable: false,
        width: 300
    });

    settingsWindow.loadURL('file://' + __dirname + '/app/settings.html');

    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
});

ipcMain.on('close-settings-window', (event) => {
    settingsWindow.close();
});
