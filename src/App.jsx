import { useState } from 'react' // Importing the useState hook from React
import './App.css' // Importing CSS file for styling
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'; // Importing default styles from chat UI kit
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'; // Importing components from chat UI kit

const API_KEY = "YOUR_API_KEY"; // API key for OpenAI

const systemMessage = { 
  "role": "system", 
  "content": "Explain things like you're talking to a software professional." // System message to set the context for ChatGPT
}

function App() {
  const [typing, setTyping] = useState(false); // State to track if ChatGPT is typing
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!", // Initial message from ChatGPT
      sender: "ChatGPT"
    }
  ])

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }

    const newMessages = [...messages, newMessage];  // Add new user message to the existing messages

    setMessages(newMessages); // Update messages state

    setTyping(true); // Show typing indicator
    await processMessagetoChatGPT(newMessages); // Send message to ChatGPT for processing
  }

  async function processMessagetoChatGPT(chatMessages){
    // Convert chat messages to the format required by the API
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo", // Model to be used for generating responses
      "messages": [
        systemMessage,  // The system message to set the context
        ...apiMessages // The user and assistant messages
      ]
    }

    // Send a request to the OpenAI API
    await fetch("https://api.openai.com/v1/chat/completions",{
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY, // Authorization header with the API key
        "Content-Type": "application/json" // Content type for the request
      },
      body: JSON.stringify(apiRequestBody) // Request body with messages
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data); // Log API response
      console.log(data.choices[0].message.content); // Log the message content from the response
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]); // Update messages state with the new message from ChatGPT
      setTyping(false); // Hide typing indicator
    });
  }

  return (
      <div className="App">
        <div style={{ position:"relative", height: "800px", width: "700px"  }}>
          <MainContainer>
            <ChatContainer> 
              <MessageList
              scrollBehavior='smooth'
                typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" /> : null} // Show typing indicator if ChatGPT is typing
              >
                {messages.map((message, i) => {
                  console.log(message) // Log each message
                  return <Message key={i} model={message} /> // Render each message
                })}
              </MessageList>
              <MessageInput placeholder="Type message here" onSend={handleSend} /> {/* Input field for sending messages */}

            </ChatContainer> 
          </MainContainer>
        </div>
      </div>
  )
}

export default App
