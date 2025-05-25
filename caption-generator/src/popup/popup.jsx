
const Popup = () => {

  const startCaptioning = () => {
    chrome.runtime.sendMessage({ action: 'START_CAPTION'})
  }
  
  return (
    <div>
        <h1>Start Captions</h1>
        <button className={startCaptioning}>Start</button>
    </div>
  )
}

export default Popup