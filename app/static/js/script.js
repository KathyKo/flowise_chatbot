document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('send-button');
    const userInputField = document.getElementById('user-input');
    const chatContent = document.getElementById('chat-content');

    function appendMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = content;
        messageDiv.classList.add('message', sender);
        chatContent.appendChild(messageDiv);
    }

    sendButton.addEventListener('click', function() {
        const userMessage = userInputField.value.trim();
        if (userMessage) {
            appendMessage(userMessage, 'user'); // 顯示用戶消息
            // 發送AJAX請求到後端
            fetch('/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage })
            })
            .then(response => response.json())
            .then(data => {
                appendMessage(data.text, 'bot'); // 顯示機器人回答
                userInputField.value = ''; // 清空輸入框
            })
            .catch(error => {
                console.error('Error:', error);
                appendMessage('發生錯誤，請稍後再試。', 'bot');
            });
        }
    });
});
