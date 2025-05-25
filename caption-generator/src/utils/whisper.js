
export async function transcribeAudio(blob) {
  const formData = new FormData();
  formData.append("file", blob, "audio.webm");
  formData.append("model", "whisper-1");
  formData.append("language", "auto");

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.YOUR_OPENAI_API_KEY}`,
    },
    body: formData,
  });

  const data = await response.json();
  return data.text;
}


// utils/translateToEnglish.js

export async function translateToEnglish(text) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Translate the following text to English." },
        { role: "user", content: text }
      ],
      temperature: 0.3,
    }),
  });

  const data = await res.json();

  // Handle potential errors
  if (!data.choices || !data.choices[0]?.message?.content) {
    throw new Error("Translation failed. Response: " + JSON.stringify(data));
  }

  return data.choices[0].message.content.trim();
}

