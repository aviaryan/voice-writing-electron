<script>
  import { postProcessTranscription } from "./lib";

  let isStreaming = false;
  let isPostProcessing = false;
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
	  isPostProcessing = true;
	  const processed = await postProcessTranscription(result);
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
    output = data;
  });
</script>

<div>
  <button disabled={isPostProcessing} on:click={isStreaming ? stopStreaming : startStreaming}>
    {isStreaming ? "Stop Recording" : "Start Recording"}
  </button>
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

  p {
	font-family: 'Courier New', Courier, monospace;
	margin: 0 20px;
	margin-top: 10px;
  }
</style>
