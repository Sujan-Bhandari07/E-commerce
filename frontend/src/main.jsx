import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
    import { store } from './services/Store.jsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(


  
    <Provider store={store}>

    <BrowserRouter>
    <Toaster position='top-right'/>
      <App />
    </BrowserRouter>
    </Provider>

)
