# VoiceWriting

Voice Writing is a Whisper based Desktop app to write using your voice.
It works in real-time and even fixes common grammatical and other issues in your speech.

## Preview

https://github.com/user-attachments/assets/d75b4fc8-1d5e-4dec-9a9c-e74153303a02


## Requirements

1. Whisper.cpp stream command (available in [this post](https://github.com/aviaryan/voice-writing-electron/discussions/4))
2. A GGML model for Whisper
3. Groq API key


## Setup

#### 1. Clone and install dependencies

```sh
git clone https://github.com/aviaryan/voice-writing-electron.git
yarn install
```

#### 2. Populate `.env` file

1. Link the absolute path to `stream`.
2. Link the absolute path to `model`.
3. Provide the Groq API key.

Example -

```ini
GROQ_API_KEY=gsk_abcdksk2kkskssd
STREAM_EXECUTABLE_PATH=/Users/john/dev/stream
MODEL_PATH=/Users/john/dev/ggml-small.en.bin
```

#### 3. Start the application

```sh
yarn start
```


## Packaging into an app

1. Ensure `.env` has all the values as it gets packaged.
2. Run `yarn build`. Builds the app only using `target: dir`. Use `target: dmg` to build dmg.
3. Check `dist` folder for the app.
