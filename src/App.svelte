<!-- src/App.svelte -->
<script>
  import Recorder from "./Recorder.svelte";
  import Streamer from "./Streamer.svelte";

  let count = 0;

  async function transcribe() {
    console.log("transcribe");
	// const program = '/Users/aviaryan/dev/__others/whisper.cpp/main';
    // const args = [
    //   "-m",
    //   "./models/ggml-large-v2.bin",
    //   "-l",
    //   "en",
    //   "--output-txt",
    //   "--prompt",
    //   "Here is a brain dump of what I am thinking right now:",
    //   "-f",
    //   "/Users/aviaryan/github/otterai-api/tests/test2.wav",
    // ];
    // const result = await window.api.runCommand("ls", ["-la"]);
    console.log(result);
  }
</script>

<main>
  <h1>Hello Electron + Svelte!</h1>
  <button on:click={() => (count += 1)}>
    Counter: {count}
  </button>
  <button on:click={transcribe}> Transcribe </button>
  <Recorder />
  <Streamer />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: auto;
    max-width: 240px;
  }

  button {
    padding: 0.5em 1em;
    font-size: 1em;
  }
</style>
