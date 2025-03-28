// Libs
import { Outlet } from 'react-router-dom'

// Components
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-layout__content">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
