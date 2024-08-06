<script>
  let mediaRecorder;
  let audioChunks = [];
  let isRecording = false;
  let audioUrl = '';
  let audioBlob;

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        audioChunks = [];
        audioUrl = URL.createObjectURL(audioBlob);
      };

      mediaRecorder.start();
      isRecording = true;
    } catch (err) {
      console.error('Error accessing microphone', err);
    }
  }

  function stopRecording() {
    mediaRecorder.stop();
    isRecording = false;
  }
</script>

<style>
  button {
    margin: 10px;
    padding: 10px;
    font-size: 16px;
  }

  audio {
    display: block;
    margin-top: 20px;
  }
</style>

<div>
  <button on:click={isRecording ? stopRecording : startRecording}>
    {isRecording ? 'Stop Recording' : 'Start Recording'}
  </button>

  {#if audioUrl}
    <audio controls>
      <source src={audioUrl} type="audio/webm">
      Your browser does not support the audio element.
    </audio>
  {/if}
</div>
