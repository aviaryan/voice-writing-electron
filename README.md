# 🗣️📝 VoiceWriting

VoiceWriting is a Whisper based Desktop application to write using your voice.
It works in real-time and even fixes common grammatical, punctuation and other issues in your speech.

Give it a try by following the instructions below.

![preview](https://github.com/user-attachments/assets/72c9fc6b-f313-4cd2-a996-7eecdc63738f)

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

You should have the application ready now and you can start using it as shown in the video below. Make sure to unmute 🔉 the video before playing.

https://github.com/user-attachments/assets/8eaa697b-ffeb-4aea-8566-10a711a59b74


## 📦 Distributing as an app

![packaged app preview](https://github.com/user-attachments/assets/90ae73c6-e5ba-46e6-8224-8b3e92e26b27)

1. Ensure `.env` has all the values as `.env` file gets packaged with the application.
2. Run `yarn build`. It builds the app only using `target: dir` on Mac. Use `target: dmg` to build dmg.
3. Check `dist` folder for the app.
