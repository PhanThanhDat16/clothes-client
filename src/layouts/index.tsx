// Libs
import { Outlet } from 'react-router-dom'
// Components
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PromoBanner from '@/components/PromoBanner/PromoBanner'
const MainLayout = () => {
  return (
    <div className="w-full">
      <PromoBanner />
      {/* <div className="md:hidden">
        <Sidebar />
      </div> */}
      <Header />
      <div className="w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
