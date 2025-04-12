// Libs
import { Outlet } from 'react-router-dom'

// Components
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PromoBanner from '@/components/PromoBanner/PromoBanner'
import Sidebar from '@/components/Sidebar/Sidebar'
import Banner_Slide from '@/components/Banner_Slide'
const MainLayout = () => {
  return (
    <div className="main-layout">
      <PromoBanner />
      <Header />
      <Banner_Slide />
      <div className="main-layout__content">
        <Outlet />
        <Sidebar />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
