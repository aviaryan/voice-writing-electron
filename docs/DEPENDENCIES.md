# Dependencies Help

## stream
<a name="stream"></a>

You can compile [whisper.cpp](https://github.com/ggerganov/whisper.cpp) to generate the `stream` binary. This method is recommended.

```sh
git clone https://github.com/ggerganov/whisper.cpp.git
cd whisper.cpp
make
```

In case you don't want to do so, you can use the this `stream` binary compiled on my M-series Mac - [stream.zip](https://github.com/user-attachments/files/16532796/stream.zip). It should only work on other M-series Macs.

Once you have the `stream` executable, note down it's path as that is what we will put in the `.env` file.


## Model
<a name="model"></a>

To download the model, you can use the download model script in [whisper.cpp](https://github.com/ggerganov/whisper.cpp) repo as follows.
Once the model is downloaded, note down it's path.

```sh
git clone https://github.com/ggerganov/whisper.cpp.git
cd whisper.cpp
bash ./models/download-ggml-model.sh small.en
# the model file will be downloaded at models/ggml-small.en.bin
```

If you don't want to clone `whisper.cpp`, you can run the script directly as follows.

```sh
curl -s https://raw.githubusercontent.com/ggerganov/whisper.cpp/master/models/download-ggml-model.sh | bash -s -- small.en
# the model file will be download in the same directory you ran the script from
```


## Groq API
<a name="groq"></a>

1. Create an account on [Groq.com](https://groq.com/).
2. Create an API key from [the console](https://console.groq.com/keys) and use it.
