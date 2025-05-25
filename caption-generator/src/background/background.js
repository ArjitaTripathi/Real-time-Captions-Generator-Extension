chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "START_CAPTION") {
    chrome.tabCapture.capture(
      { audio: true, video: false },
      function (stream) {
        const port = chrome.runtime.connect();
        port.postMessage({ streamId: stream.id });
      }
    );
  }
});
