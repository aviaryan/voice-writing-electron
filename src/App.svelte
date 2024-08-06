<script>
  import Streamer from "./Streamer.svelte";
</script>

<main>
  <h1>Voice Input App</h1>
  <!-- <button on:click={() => (count += 1)}>
    Counter: {count}
  </button>
  <button on:click={transcribe}> Transcribe </button> -->
  <Streamer />
</main>

<style>
  main {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
    padding: 1em;
    margin: auto;
  }

  h1 {
	text-align: center;
  }
</style>
