<script>
  import './global.css';
  export let textToCopy = '';

  function copyToClipboard() {
    window.api.copyToClipboard(textToCopy);
    alert("Text copied to clipboard!");
  }
</script>

{#if textToCopy}
  <button on:click={copyToClipboard}>Copy Text</button>
{/if}
