<script>
  import { postProcessTranscription } from "./lib";
  import CopyClipboard from './CopyClipboard.svelte';

  let isStreaming = false;
  let isPostProcessing = false;
  let output = "";

  function processStream(data) {
    // no need to show [BLANK_AUDIO] to the end-user, the terminal stream can have it though
    // don't try to mess with the terminal stream
    return data.replace(/\[BLANK_AUDIO\]/g, "");
  }

  async function startStreaming() {
    try {
      const program = await window.api.getEnv("STREAM_EXECUTABLE_PATH");
      const args = [
        "-m",
        await window.api.getEnv("MODEL_PATH"),
        "-t",
        "8",
        "--step",
        "500",
        "--length",
        "5000",
      ];
      isStreaming = true;
      const result = await window.api.runCommand(program, args);
      console.log(result);
      isPostProcessing = true;
      const processed = await postProcessTranscription(processStream(result));
      output = processed;
    } catch (err) {
      console.error("Error accessing microphone", err);
    }
    isPostProcessing = false;
  }

  async function stopStreaming() {
    try {
      await window.api.stopCommand();
    } catch (error) {
      console.error(`Error stopping process: ${error.message}`);
    }
    isStreaming = false;
  }

  window.api.onStreamOutput((data) => {
    output = processStream(data);
  });
</script>

<div>
  <button
    disabled={isPostProcessing}
    on:click={isStreaming ? stopStreaming : startStreaming}
  >
    {isStreaming ? "Stop Recording" : "Start Recording"}
  </button>
  <CopyClipboard textToCopy={isStreaming ? '' : output} />
  <p>{output}</p>
</div>

<style>
  div {
    text-align: center;
    max-width: 100%;
  }

  button {
    margin: 10px;
    padding: 10px;
    font-size: 16px;
  }

  button:hover {
    cursor: pointer;
  }

  p {
    font-family: "Courier New", Courier, monospace;
    margin: 0 20px;
    margin-top: 10px;
  }
</style>
