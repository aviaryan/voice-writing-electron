const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

// manually loading .env from same folder seems to work better when packgaging it
// with electron builder (rather than just using require("dotenv").config())
const envPath = path.resolve(__dirname, ".env");
const envConfig = dotenv.parse(fs.readFileSync(envPath));

for (const k in envConfig) {
  process.env[k] = envConfig[k];
}
