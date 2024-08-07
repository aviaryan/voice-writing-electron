# VoiceWriting

Voice Writing is a Whisper based Desktop app to write using your voice.
It works in real-time and even fixes common grammatical and other issues in your speech.

https://github.com/user-attachments/assets/d75b4fc8-1d5e-4dec-9a9c-e74153303a02


## Using

```sh
git clone https://github.com/aviaryan/voice-writing-electron.git
yarn install
# create .env from .env.copy and fill with your values
yarn start
```

## Packaging into an app

1. Ensure `.env` has all the values as it gets packaged.
2. Run `yarn build`. Builds the app only using `target: dir`. Use `target: dmg` to build dmg.
3. Check `dist` folder for the app.
