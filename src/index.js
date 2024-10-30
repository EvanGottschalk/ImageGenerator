import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'


require('dotenv').config();
// console.log("API Key in index.js:", process.env.REACT_APP_OPENAI_API_KEY);

ReactDOM.render(
     <React.StrictMode>
          <App />
     </React.StrictMode>,
     document.getElementById('root')
)
