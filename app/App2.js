document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim()) {
      addMessage(userInput, 'user');
      document.getElementById('user-input').value = '';
      const storage = localStorage
      
      // Simulate AI response
      fetch('https://downloadbot-rq82.onrender.com/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({desc:userInput}) 
      }) .then(response => response.json())
      .then(result => {
        console.log(result);
      
        const contentHtml = `
          <iframe src="${result.url}" style="border: none; width:100%; height:100%;"></iframe>
          <a href="${result.url}" download="image.png" style="display: block; margin-top: 10px; text-align: center; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Download Image</a>
        `;
      
        // Add the constructed HTML as a message
        addMessage(contentHtml, 'ai');
      });
    }})
  
  function addMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  document.getElementById('download-button').addEventListener('click', () => {
    const imageUrl = 'https://example.com/image.png';
  
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'downloaded-image.png'; 
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  })
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