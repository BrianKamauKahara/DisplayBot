document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim()) {
      addMessage(userInput, 'user');
      document.getElementById('user-input').value = '';
      const storage = localStorage
      
      // Simulate AI response
      fetch('https://downloadbot-rq82.onrender.com/generatePost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({desc:userInput}) 
      }) .then(response => response.json())
      .then(result => {
        console.log(result);
        addMessage(`<iframe src="${result.url}" style="border: none; width:100%; height:100%"></iframe>`, `ai`)})}})
  
  function addMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement. innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  // CSS for messages
  const style = document.createElement('style');
  style.innerHTML = `
  .message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    max-width: 80%;
    word-wrap: break-word;
  }
  
  .message.user {
    background-color: #ffd700;
    color: #fff;
    align-self: flex-end;
  }
  
  .message.ai {
    background-color: #fff9e5;
    border: 1px solid #ffd700;
    align-self: flex-start;
    height: 288px;
  }
  `;
  document.head.appendChild(style);