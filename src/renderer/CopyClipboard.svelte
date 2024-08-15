<script>
  export let textToCopy = '';

  function copyToClipboard() {
    window.api.copyToClipboard(textToCopy);
    alert("Text copied to clipboard!"); // Optional: Notify the user
  }
</script>

<style>
  /* Optional styles for the button */
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>

<!-- Button to trigger the copy function -->
<button on:click={copyToClipboard}>Copy Text</button>
