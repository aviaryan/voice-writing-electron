<script>
  import { postProcessTranscription } from "./lib";

  let isStreaming = false;
  let output = "";

  async function startStreaming() {
    try {
      const program = "/Users/aviaryan/dev/__others/whisper.cpp/stream";
      const args = [
        "-m",
        "/Users/aviaryan/dev/__others/whisper.cpp/models/ggml-small.en.bin",
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
	  const processed = await postProcessTranscription(result);
	  output = processed;
    } catch (err) {
      console.error("Error accessing microphone", err);
    }
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
    output = data;
  });
</script>

<div>
  <button on:click={isStreaming ? stopStreaming : startStreaming}>
    {isStreaming ? "Stop Streaming" : "Start Streaming"}
  </button>
  <pre>{output}</pre>
</div>

<style>
  div {
    text-align: center;
    margin-top: 20px;
  }

  button {
    margin: 10px;
    padding: 10px;
    font-size: 16px;
  }
</style>
