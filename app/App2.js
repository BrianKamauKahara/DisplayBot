document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim()) {
      addMessage(userInput, 'user');
      document.getElementById('user-input').value = '';
      const storage = localStorage
    
      //Get AI response
      fetch('https://downloadbot-rq82.onrender.com/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({desc:userInput}) 
      }).then(response => response.json())
      .then(result => {
        console.log(result);
        
        let iframeHtml = `
          <iframe src="${result.url}" style="border: none; width:100%; height:300px; "></iframe>`
        const buttonHtml = `
        <button class="download-button" onclick="(function(e) {
            navigator.clipboard.writeText('${result.url}')
            .then(() => {
                e.target.innerText = 'Copied to Clipboard!';
            })
            .catch(err => {
                console.error('Error copying URL:', err);
                e.target.innerText = 'Failed to Copy';
            });
            })(event)">Get Image URL</button>
          `
        iframeHtml += buttonHtml
        ;
      
        // Add the constructed HTML as a message
        addMessage(iframeHtml, 'ai', result.url);
      });
    }})
    
  function addMessage(message, sender, url) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML += message;
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
    height: 358px;
  }

  .download-button {
      display: grid;
      margin-top: 10px;
      text-align: center;
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

button.download-button:hover {
    background-color: #45a049;
}
  `;
  document.head.appendChild(style);