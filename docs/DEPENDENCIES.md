# Dependencies Help

## `stream`
<a name="stream"></a>

You can compile [whisper.cpp](https://github.com/ggerganov/whisper.cpp) to generate the `stream` binary.

```sh
git clone https://github.com/ggerganov/whisper.cpp.git
cd whisper.cpp
make
```

Or you can use the this `stream` binary compiled on my M-series Mac - [stream.zip](https://github.com/user-attachments/files/16532796/stream.zip).
Once you have the `stream` executable, note down it's path as that is what we will put in the `.env` file.


## Model
<a name="model"></a>

To download the model, you can use the `whisper.cpp` repo.

```sh
git clone https://github.com/ggerganov/whisper.cpp.git
cd whisper.cpp
bash ./models/download-ggml-model.sh small.en
# the model file is downloaded at models/ggml-small.en.bin
```


## Groq API
<a name="groq"></a>

1. Create an account on [Groq.com](https://groq.com/).
2. Create an API key from [the console](https://console.groq.com/keys) and use it.
