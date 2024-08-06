<script>
  let mediaRecorder;
  let audioChunks = [];
  let isRecording = false;
  let audioUrl = '';
  let audioBlob;

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

  {#key audioUrl}
	{#if audioUrl}
		<audio controls>
		<source src={audioUrl} type="audio/webm">
		Your browser does not support the audio element.
		</audio>
	{/if}
  {/key}
</div>
