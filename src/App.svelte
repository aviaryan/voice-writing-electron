<!-- src/App.svelte -->
<script>
	import Recorder from './Recorder.svelte';
  let count = 0;
</script>

<main>
  <h1>Hello Electron + Svelte!</h1>
  <button on:click={() => count += 1}>
    Counter: {count}
  </button>
  <Recorder />
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
