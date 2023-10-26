import React from 'react'
import ReactDOM from 'react-dom/client'
import Portfolio from './Portfolio.tsx'
import './styles/scss/main.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
)
