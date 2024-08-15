<script>
  export let textToCopy = '';

  function copyToClipboard() {
    window.api.copyToClipboard(textToCopy);
    alert("Text copied to clipboard!");
  }
</script>

<style>
  button {
    padding: 10px;
    font-size: 16px;
  }

  button:hover {
    cursor: pointer;
  }
</style>

{#if textToCopy}
  <button on:click={copyToClipboard}>Copy Text</button>
{/if}
