import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { OrderList } from '@/components/order/OrderList'
import { Order } from '@/models/order'
import { getOrderByUserId } from '@/apis/api_order'

const EcommerceProductPage = () => {
  const [selectedTab, setSelectedTab] = useState('Tất cả')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const tabs = ['Tất cả', 'Chờ xác nhận', 'Đã xác nhận', 'Đang xử lý', 'Hoàn thành']

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem('userId')
      console.log('🔍 Debug - UserId from localStorage:', userId)
      if (userId) {
        try {
          setLoading(true)
          console.log('📡 Debug - Making API call to:', `/orders/user/${userId}`)
          const response = await getOrderByUserId(userId)
          setOrders(response?.data || [])
          setError(null)
        } catch (error) {
          console.error('Failed to fetch orders:', error)
          setError('Không thể tải danh sách đơn hàng')
          setOrders([])
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
        setError('Vui lòng đăng nhập để xem đơn hàng')
      }
    }
    fetchOrders()
  }, [])
  console.log(orders)
  const filterOrders = (tab: string): Order[] => {
    if (tab === 'Tất cả') return orders
    if (tab === 'Chờ xác nhận') return orders.filter((order) => order.status === 'pending')
    if (tab === 'Đã xác nhận') return orders.filter((order) => order.status === 'confirmed')
    if (tab === 'Đang xử lý') return orders.filter((order) => order.status === 'processing')
    if (tab === 'Hoàn thành') return orders.filter((order) => order.status === 'paid' || order.status === 'completed')

    return []
  }

  const filteredOrders = filterOrders(selectedTab)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải đơn hàng...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-md hover:opacity-90"
          >
            Thử lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex space-x-6">
                {tabs.map((tab) => {
                  return (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`px-3 py-2 text-lg transition-colors relative ${
                        selectedTab === tab
                          ? 'text-[var(--primary-color)] text-xl border-b-2 font-bold shadow-lg ring-1 ring-gray-400 rounded-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                    </button>
                  )
                })}
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
        <OrderList orders={filteredOrders} />

        {/* Load More Button */}
        {filteredOrders.length > 0 && (
          <div className="mt-8 text-center">
            <button className="px-6 py-3 text-sm font-medium bg-[var(--primary-color)] text-white ring-1 rounded-lg hover:opacity-90 transition-colors">
              Xem thêm đơn hàng
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default EcommerceProductPage
