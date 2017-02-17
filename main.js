const {app, BrowserWindow, Menu, ipcMain, Tray} = require('electron')
const templateGenerator = require('./template');
const logData = require('./logger');
const path = require('path');
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

    sobreWin = new BrowserWindow({
        width: 300,
        height: 200,
        icon: __dirname + '/app/img/icon2.png',
        show: false,
        frame: false,
        parent: win
    });

    const conteudoMenu = Menu.buildFromTemplate(templateGenerator.createMenuTemplate(sobreWin))
    Menu.setApplicationMenu(conteudoMenu);

    tray = new Tray(path.join(__dirname,"app/img/icon2.png"));
    tray.setToolTip('Escolha aqui seu curso');
    const trayMenu = Menu.buildFromTemplate(templateGenerator.createTrayTemplate(win));
    tray.setContextMenu(trayMenu);

});

app.on('window-all-closed', () => {
    app.quit();
});


ipcMain.on('curso-parado', (event, curso, tempo) => {
  console.log(`O curso ${curso} foi estudado por ${tempo}`);
  logData(curso,tempo).then(() => {
      console.log("Sucesso");
  }).catch((err) => {
      console.log("Houve um erro", err);
  })
})

ipcMain.on('curso-adicionado',(event,curso) => {
    const trayMenu = Menu.buildFromTemplate(templateGenerator.addToMenuCurso(win,curso));
    tray.setContextMenu(trayMenu);
})

ipcMain.on('fechar-sobre', (event) => {
    sobreWin.hide();
});
