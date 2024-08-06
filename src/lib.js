const promptRoot =
  "Can you only fix punctuation and capitalization errors in the following text?" +
  "Also feel free to break it into paragraphs if it makes sense." +
  "Only return to me the fixed text and absolutely nothing else. Not even \"Here is the fixed text:\".";

export async function postProcessTranscription(text) {
	text = text.replace('[Start speaking]', ''); // remove the thing, don't need
  const prompt = promptRoot + "\n\n" + text;
  const chatCompletion = await window.api.callGroqApi(prompt);
  console.log(chatCompletion);
  const fixed = chatCompletion.choices[0]?.message?.content || "";
  return fixed;
}
