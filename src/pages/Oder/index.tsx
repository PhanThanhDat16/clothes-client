import { useState } from 'react'
import { Search } from 'lucide-react'
import { OrderList } from '@/components/order/OrderList'

export interface order {
  id: number
  name: string
  category: string
  price: number
  finalPrice: number
  image: string
  shop: string
  deliverySuccess?: boolean
  deliveryDate?: string
  deliveryType?: string
  estimatedDelivery?: string
}

const EcommerceProductPage = () => {
  const [selectedTab, setSelectedTab] = useState('Tất cả')

  const tabs = ['Tất cả', 'Chờ xác nhận', 'Vận chuyển', 'Chờ giao hàng', 'Hoàn thành', 'Đã hủy', 'Trả hàng/Hoàn tiền']

  const products: order[] = [
    {
      id: 1,
      name: 'Quẩn short Nam',
      category: 'QUẨN D5 XANH',
      price: 2299099,
      finalPrice: 2269189,
      image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-ma0b2uxa7bbuf3_tn',
      shop: 'POLOMANOR',
      deliverySuccess: true,
      deliveryType: 'CHỜ XÁC NHẬN'
    },
    {
      id: 2,
      name: 'Áo Thun Boxy In ArtTypo Simpson Local Brand Unisex Nam Nữ Oversize - TS32',
      category: 'Ver01 - Đen,XL (<95KG)',
      price: 300000,
      finalPrice: 171000,
      image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-mbgnk3tg095091_tn',
      shop: 'POLOMANOR',
      deliverySuccess: true,
      deliveryType: 'HOÀN THÀNH',
      deliveryDate: '01-10-2025',
      estimatedDelivery: '300 Xu'
    }
  ]
  const filterOrders = (tab: string) => {
    if (tab === 'Tất cả') return products
    if (tab === 'Chờ xác nhận') return products.filter((p) => p.deliveryType === 'CHỜ XÁC NHẬN')
    if (tab === 'Hoàn thành') return products.filter((p) => p.deliveryType === 'HOÀN THÀNH')
    // Các tab khác tương tự
    return []
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex space-x-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-3 py-2 text-lg transition-colors ${
                      selectedTab === tab
                        ? 'text-[var(--primary-color)] text-xl border-b-2 font-bold shadow-lg ring-1 ring-gray-400 rounded-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <OrderList orders={filterOrders(selectedTab)} />

        {/* Pagination or Load More */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 text-sm font-medium bg-[var(--primary-color)] text-white ring-1 rounded-lg hover:opacity-90 transition-colors">
            Xem thêm đơn hàng
          </button>
        </div>
      </main>
    </div>
  )
}

export default EcommerceProductPage
