const promptRoot =
  "Can you only fix punctuation and capitalization errors in the following text?" +
  "Also feel free to break it into paragraphs if it makes sense." +
  'Only return to me the fixed text and absolutely nothing else.';

export async function postProcessTranscription(text) {
  text = text.replace("[Start speaking]", ""); // remove the thing, don't need
  const prompt = promptRoot + "\n\n" + text;
  const chatCompletion = await window.api.callGroqApi(prompt);
  console.log(chatCompletion);
  let fixed = chatCompletion.choices[0]?.message?.content || "";
  // clean up stuff
  fixed = fixed.replace("Here is the fixed text:", '');
  return fixed.trim();
}
