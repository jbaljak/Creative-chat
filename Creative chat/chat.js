 // Scaledrone
 const channelID = 'gaosrKxqQhPW1mSe';
 const drone = new Scaledrone(channelID);

 //username and color-login form
 const usernameInput = document.getElementById('username');
 const loginForm = document.getElementById('login-form');
 const colorInput = document.getElementById('color-input');
 let userColor = colorInput.value; // Default color
 loginForm.addEventListener('submit', e => {
   e.preventDefault();
   const username = usernameInput.value;
   userColor = colorInput.value;
   console.log(`Logged in as ${username} and ${userColor}`);
 });

 // Connect to the channel
 drone.on('open', error => {
   if (error) {
     console.error(error);
   } else {
     console.log('Connected to Scaledrone');
     const room = drone.subscribe('chat-room');
     room.on('message', message => {
       console.log('Received message:', message);
       addMessage(message.data);
     });
   }
 });

const welcomeMessage = document.getElementById('welcome-message');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  welcomeMessage.classList.add('submitted'); // Add the "submitted" class
  loginForm.style.display = 'none'; // Hide the login form
});


 // Send a message
 const messageInput = document.getElementById('message-input');
 const sendButton = document.getElementById('send-button');
 sendButton.addEventListener('click', () => {
   const message = {
     content: messageInput.value,
     author: usernameInput.value,
     color: userColor,
   };
   drone.publish({
     room: 'chat-room',
     message: message,
   });
   messageInput.value = '';

   
 });

 // Add a message to the chat room
 function addMessage(message) {
   const messagesDiv = document.getElementById('messages');
   const messageDiv = document.createElement('div');
   messageDiv.textContent = `${message.author}: ${message.content}`;
   messageDiv.style.color = message.color;
   messagesDiv.appendChild(messageDiv);
 }

 document.getElementById('open-react-app').addEventListener('click', function() {
  // Render the React app to the container element
  ReactDOM.render(
    React.createElement(App), // Assuming your React app component is named App
    document.getElementById('root')
  );
});
