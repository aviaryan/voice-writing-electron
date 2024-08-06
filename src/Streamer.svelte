<script>
  let isStreaming = false;

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
</script>

<div>
  <button on:click={isStreaming ? stopStreaming : startStreaming}>
    {isStreaming ? "Stop Streaming" : "Start Streaming"}
  </button>
</div>

<style>
  button {
    margin: 10px;
    padding: 10px;
    font-size: 16px;
  }
</style>
