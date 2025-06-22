// Libs
import { Outlet } from 'react-router-dom'
// Components
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PromoBanner from '@/components/PromoBanner/PromoBanner'
import Sidebar from '@/components/Sidebar/Sidebar'
const MainLayout = () => {
  return (
    <div className="main-layout">
      <PromoBanner />
      <div className="md:hidden">
        <Sidebar />
      </div>
      <Header />
      <div className="main-layout__content">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
