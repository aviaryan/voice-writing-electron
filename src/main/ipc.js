const { ipcMain } = require("electron");
const { spawn } = require("child_process");
const Groq = require("groq-sdk");
// thanks to https://stackoverflow.com/a/48270043/2295672 for terminal
const Terminal = require("terminal.js");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
let runningProcess = null;

function registerRunStreamCommand() {
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
}

function registerStopStreamCommand() {
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

function registerCallGroqAPI() {
  ipcMain.handle("call-groq-api", async (event, prompt) => {
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

function registerGetEnv() {
  ipcMain.handle("get-env", (event, varName) => {
    return process.env[varName];
  });
}

function registerIPC() {
  registerRunStreamCommand();
  registerStopStreamCommand();
  registerCallGroqAPI();
  registerGetEnv();
}

module.exports = { registerIPC };
