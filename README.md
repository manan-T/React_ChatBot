# ChatGPT Chatbot in React

This is a simple chatbot application built using React and the ChatGPT API (gpt-3.5-turbo). The project follows the tutorial from the video "Build A Chatbot With The ChatGPT API In React".

## Features

- Chat with ChatGPT (gpt-3.5-turbo)
- Typing indicator when ChatGPT is responding
- Smooth scrolling of messages

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/react-chatgpt-chatbot.git
    cd react-chatgpt-chatbot
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your OpenAI API key:

    ```env
    REACT_APP_OPENAI_API_KEY=your_api_key_here
    ```

4. Start the development server:

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## Usage

- Type your message in the input field at the bottom.
- Press "Enter" to send the message.
- ChatGPT will respond, and you can continue the conversation.

## Code Overview

### `App.jsx`

This file contains the main React component for the chatbot application.

- `useState` is used to manage the state of the messages and the typing indicator.
- `handleSend` is a function to handle sending a message and updating the state.
- `processMessagetoChatGPT` is an asynchronous function to send the message to the ChatGPT API and handle the response.

### Important Libraries

- `@chatscope/chat-ui-kit-react` for chat UI components.
- `fetch` API to make requests to the OpenAI API.
