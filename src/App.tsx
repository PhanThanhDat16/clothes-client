// Libs
import { BrowserRouter } from 'react-router-dom'

// Routers
import AppRouters from './routers'
import ToastProvider from './components/Toast/ToastProvider'

const App = () => {
  return (
    <div className="main-app">
      <ToastProvider />
      <BrowserRouter>
        <AppRouters></AppRouters>
      </BrowserRouter>
    </div>
  )
}

export default App
