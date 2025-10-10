// Libs
import { Outlet } from 'react-router-dom'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PromoBanner from '@/components/PromoBanner'
import ModalChat from '@/components/ModalChat'
import { useStoreSocketIO } from '@/store/useStoreSocketIO'
import { useEffect } from 'react'

const MainLayout = () => {
  const { connect, disconnect } = useStoreSocketIO()

  useEffect(() => {
    connect()
    return () => {
      disconnect()
    }
  }, [])

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <PromoBanner />
      <ModalChat />
      {/* <div className="md:hidden">
        <Sidebar />
      </div> */}
      <Header />
      <main className="w-full flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
