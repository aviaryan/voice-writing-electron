// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const { exec, spawn } = require("child_process");
const path = require("node:path");

let runningProcess = null;

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Modify CSP to allow 'blob:' for media sources
  // not needed apparantely
  //   session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  //     callback({
  //       responseHeaders: {
  //         ...details.responseHeaders,
  //         "Content-Security-Policy": [
  //           "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; media-src 'self' blob:;",
  //         ],
  //       },
  //     });
  //   });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
};

function registerIPC() {
  ipcMain.handle("run-command", async (event, command, args) => {
    return new Promise((resolve, reject) => {
      runningProcess = spawn(command, args);
      let output = "";

      runningProcess.stdout.on("data", (data) => {
        output += data.toString();
        console.log("output comming", data.toString());
      });

      runningProcess.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });

      runningProcess.on("close", (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(new Error(`Process exited with code ${code}`));
        }
        runningProcess = null;
      });
    });
  });

  ipcMain.handle("stop-command", () => {
    if (!runningProcess) {
      return Promise.reject(new Error("No process is running"));
    }
    return new Promise((resolve, reject) => {
      runningProcess.kill("SIGTERM"); // Send signal to terminate the process

      runningProcess.on("close", (code) => {
        console.log(`Process terminated with code ${code}`);
        runningProcess = null; // Clear reference
        resolve("Process stopped");
      });
      // Optionally, you could also handle process errors here
    });
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  registerIPC();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
