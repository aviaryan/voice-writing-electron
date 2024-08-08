# 🗣️📝 VoiceWriting

Voice Writing is a Whisper based Desktop app to write using your voice.
It works in real-time and even fixes common grammatical and other issues in your speech.

## 🛠️ Setup

#### 1. Clone and install dependencies

```sh
git clone https://github.com/aviaryan/voice-writing-electron.git
yarn install
cp .env.copy .env
```

#### 2. Populate `.env` file

1. Add the absolute path for whisper.cpp's `stream` executable in `STREAM_EXECUTABLE_PATH`. Learn more about [stream](docs/DEPENDENCIES.md#stream).
2. Add the absolute path for GGML Whisper `model` in `MODEL_PATH`. Learn more about [model](docs/DEPENDENCIES.md#model).
3. Fill in the GROQ API Key. Learn more about [Groq API key](docs/DEPENDENCIES.md#groq).

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

#### 4. Start speaking!

You should have it ready now and you can use it as shown in the video below.

https://github.com/user-attachments/assets/d75b4fc8-1d5e-4dec-9a9c-e74153303a02


## 📦 Packaging into an app

1. Ensure `.env` has all the values as it gets packaged.
2. Run `yarn build`. Builds the app only using `target: dir`. Use `target: dmg` to build dmg.
3. Check `dist` folder for the app.
