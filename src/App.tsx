// Libs
import { BrowserRouter } from 'react-router-dom'

// Routers
import AppRouters from './routers'

const App = () => {
  return (
    <div className="main-app">
      <BrowserRouter>
        <AppRouters></AppRouters>
      </BrowserRouter>
    </div>
  )
}

export default App
