document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim()) {
      addMessage(userInput, 'user');
      document.getElementById('user-input').value = '';
  
      // Simulate AI response
      fetch('http://localhost:5500/generatePost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({postStructure:{
          "title":"Head of post. Usually one or two words.",
          "desc":"description of post, abt 4-5 sentences",
          "tags": ["tag1", "tag2"],
        },instructions:userInput}) 
      }) .then(response => response.json())
      .then(result => {
        const formattedResult = `
        <h2>${result.title}</h2>
        <p>${result.desc}</p>
        <div class="tags">Tags: ${result.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</div>
    `
          addMessage(formattedResult, 'ai');
      })
    } 
  });
  
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
  }
  `;
  document.head.appendChild(style);