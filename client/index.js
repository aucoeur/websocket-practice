// Get references to DOM elements
const sendBtn = document.querySelector('#send')
const messages = document.querySelector('#messages')
const messageInput = document.querySelector('#message-input')
const nameInput = document.querySelector('#name-input')

let ws

function calculateHue(str) {
  let num = 0
  for (let i=0; i < str.length; i++) {
    num += str.charCodeAt(i)
  }
  return num % 360
}

// Display messages from the websocket
function showMessage(data) {
  let hue = calculateHue(data.name)
  messages.innerHTML += `<li><span class="name" style="color: hsl(${hue}, 80%, 50%)">${data.name}</span>: ${data.message}</li>` // display the message
  messages.scrollTop = messages.scrollHeight // scroll to the top
  messageInput.value = '' // clear the input field
}

function init() {
  // Clean up before restarting a websocket connection
  if (ws) {
    ws.onerror = ws.onopen = ws.onclose = null;
    ws.close();
  }

  // Make a new Websocket
  ws = new WebSocket('ws://localhost:6969')

  // Handle the connection when it opens
  ws.onopen = () => console.log('!Connection opened!')

  // handle a message event
  ws.onmessage = (e) => showMessage(JSON.parse(e.data))

  // Handle a close event
  ws.onclose = () => ws = null

}

// Handle button clicks
sendBtn.onclick = function () {
  // Send a message
  if (!ws) {
    showMessage("No WebSocket connection :(");
    return;
  }

  // Create an object:
  const data = { message: messageInput.value, name: nameInput.value }
  // Convert to JSON to send to server
  ws.send(JSON.stringify(data))
  showMessage(data)
}

init();
