# 🤖 AI Chatbot  

A lightweight AI-powered chatbot built with **React**, **Express.js**, and **Node.js**.  
The chatbot takes user input, sends it to a backend API (Express server), which then calls **AIML API** (or any LLM endpoint you configure) and returns the model's response back to the UI.  

## ✨ Features  
- 🗨️ **Interactive Chat UI** – Messages from user and AI are styled differently, with proper alignment and icons.  
- 🔗 **Backend API** – Express server that acts as a secure proxy to the AI API (keeps API keys private).  
- 🌐 **Cross-Origin Support** – Configured with CORS for smooth local development.  
- ⚡ **Async Message Handling** – Uses `fetch` and `async/await` for clean asynchronous calls.  
- 🛡 **Environment Variables** – API keys stored securely in `.env`.  

## 🏗 Tech Stack  
**Frontend:**  
- HTML, CSS, React (via CDN)  
- Babel (for JSX support)  

**Backend:**  
- Node.js  
- Express.js  
- CORS  
- dotenv (for managing environment variables)  

**AI API:**  
- [AIML API](https://aimlapi.com/) (supports models like `google/gemma-3n-e4b-it`, `mistral-7b`, etc.)  
