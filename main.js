// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const { spawn } = require("child_process");
const Groq = require("groq-sdk");
const path = require("node:path");
// thanks to https://stackoverflow.com/a/48270043/2295672 for terminal
const Terminal = require("terminal.js");

const groq = new Groq({
  apiKey: "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",
});
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

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
};

function registerIPC() {
  ipcMain.handle("run-command", async (event, command, args) => {
    return new Promise((resolve, reject) => {
      runningProcess = spawn(command, args, { shell: true });
      const terminal = new Terminal({ columns: 150, rows: 100 });

      runningProcess.stdout.on("data", (data) => {
        terminal.write(data);
        event.sender.send(
          "transcribe-stream-output",
          terminal.toString("plain").trim()
        );
        // output += data.toString();
        // console.log("output comming", data.toString());
      });

      runningProcess.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });

      runningProcess.on("close", (code) => {
        if (code === 0) {
          console.log("terminal final", terminal.toString("plain").trim());
          resolve(terminal.toString("plain").trim());
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

  ipcMain.handle("call-groq-api", async (event, prompt) => {
    // try {
    //   const response = await axios.post("https://api.groq.com/v1/llama3", {
    //     prompt: prompt,
    //     // Add any necessary headers or authentication here
    //     headers: {
    //       Authorization: "Bearer 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",
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   return response.data;
    // } catch (error) {
    //   console.error("Error calling Groq API:", error);
    //   return { error: error.message };
    // }
    const chatCompletion = groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
    });
    return chatCompletion;
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
