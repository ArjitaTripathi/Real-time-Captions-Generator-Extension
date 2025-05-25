const captionBox = document.createElement("div");
captionBox.style.position = "fixed";
captionBox.style.bottom = "50px";
captionBox.style.left = "50%";
captionBox.style.transform = "translateX(-50%)";
captionBox.style.backgroundColor = "black";
captionBox.style.color = "white";
captionBox.style.padding = "10px";
captionBox.style.borderRadius = "8px";
captionBox.style.zIndex = "9999";
captionBox.style.fontSize = "18px";
captionBox.innerText = "Captions will appear here...";
document.body.appendChild(captionBox);

chrome.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(async msg => {
    // simulate caption
    captionBox.innerText = msg.caption;
  });
});


const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

recorder.ondataavailable = async (e) => {
  const blob = e.data;
  const text = await transcribeAudio(blob);
  const translated = await translateToEnglish(text);
  // Send this to content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { caption: translated });
  });
};

recorder.start(5000); // record in 5-second chunks

