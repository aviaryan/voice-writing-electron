const { contextBridge, ipcRenderer } = require("electron");

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// window.addEventListener("DOMContentLoaded", () => {
// });

contextBridge.exposeInMainWorld("api", {
  runCommand: (command, args) =>
    ipcRenderer.invoke("run-command", command, args),
  stopCommand: () => ipcRenderer.invoke("stop-command"),
  onStreamOutput: (callback) =>
    ipcRenderer.on("transcribe-stream-output", (event, data) => callback(data)),
  callGroqApi: (prompt) => ipcRenderer.invoke("call-groq-api", prompt),
  getEnv: (varName) => ipcRenderer.invoke("get-env", varName),
});
