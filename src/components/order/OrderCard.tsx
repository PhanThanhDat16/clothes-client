import { updateOrder } from '@/apis/api_order'
import { Order } from '@/models/order'
import { Store, CheckCircle, Clock, Car } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const getStatusText = (status: string) => {
  switch (status) {
    case 'paid':
      return 'HOÀN THÀNH'
    case 'pending':
      return 'CHỜ XÁC NHẬN'
    case 'confirmed':
      return 'ĐÃ XÁC NHẬN'
    case 'cancelled':
      return 'ĐÃ HỦY'
    case 'completed':
      return 'HOÀN THÀNH'
    default:
      return status.toUpperCase()
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-orange-100 text-orange-500'
    case 'confirmed':
      return 'bg-blue-100 text-blue-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const OrderCard = ({ order }: { order: Order }) => {
  const formatPrice = (price: number) => price.toLocaleString('vi-VN')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const [localOrder, setLocalOrder] = useState<Order>(order)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    setLocalOrder(order)
  }, [order])

  const handleCancelOrder = async (orderId: string, data: { status: string }) => {
    try {
      setUpdating(true)
      await updateOrder(orderId, data)
      // Update local UI state after successful update
      setLocalOrder((prev) => ({ ...prev, status: data.status as Order['status'] }))
    } catch (error) {
      console.error('Failed to cancel order:', error)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Shop Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Store className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">POLOMANOR</span>
          <NavLink
            to={`/newin`}
            className="inline-flex items-center px-2 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded cursor-pointer"
          >
            Xem sản phẩm tương tự
          </NavLink>
        </div>
        <div className="flex items-center space-x-3">
          {localOrder.status === 'paid' ? (
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircle className="w-4 h-4 mr-1" />
              Giao hàng thành công
            </div>
          ) : null}
          <span className={`px-3 py-1 text-base font-medium rounded ${getStatusColor(localOrder.status)}`}>
            {getStatusText(localOrder.status)}
          </span>
        </div>
      </div>

      {/* Order Items */}
      <div className="space-y-4">
        {localOrder.items.map((item) => (
          <div key={item._id} className="flex items-start space-x-4">
            <img
              src={item.itemDetail.images[0]}
              alt={item.itemDetail.name}
              className="w-[140px] h-[140px] object-cover rounded-lg border border-gray-200"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">{item.itemDetail.name}</h3>
              <div className="text-base text-gray-600 mb-2">Phân loại hàng: Size {item.size}</div>
              <div className="text-sm text-gray-600">x{item.quantity}</div>
            </div>
            <div className="text-right">
              {item.itemDetail.oldPrice > item.price && (
                <div className="text-sm text-gray-400 line-through">{formatPrice(item.itemDetail.oldPrice)}₫</div>
              )}
              <div className="text-lg font-bold text-red-600">{formatPrice(item.price)}₫</div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {localOrder.status === 'paid' ? (
              <span>
                Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng đã được giao đến bạn và sản phẩm nhận được không có
                vấn đề nào.
              </span>
            ) : (
              <>
                <div className="items-center">
                  <div className="flex items-center mb-2 text-base font-medium text-gray-800">
                    <Clock className="w-5 h-5 mr-1" />
                    Ngày đặt hàng: {formatDate(localOrder.createdAt)}
                  </div>
                  <div className="flex items-center mt-1 text-base">
                    <Car className="w-5 h-5 mr-1" />
                    {localOrder.status === 'confirmed' && 'Đơn hàng đang được giao đến bạn.'}
                    {localOrder.status === 'pending' && 'Đơn hàng đang được xử lý.'}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Thành tiền:</span>
            <span className="text-xl font-bold text-red-600">{formatPrice(localOrder.finalTotal)}₫</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center justify-end space-x-3">
        <button
          className={`px-6 py-2 text-base font-medium ${localOrder.status === 'confirmed' || localOrder.status === 'cancelled' ? 'text-white bg-[var(--primary-color)]' : 'text-gray-700 bg-white border border-gray-300'} rounded-md hover:bg-gray-200 transition-colors`}
        >
          Liên Hệ Hỗ Trợ
        </button>
        {localOrder.status === 'paid' && (
          <div className="flex gap-3">
            <button className="px-6 py-2 text-base font-medium text-white bg-[var(--primary-color)] rounded-md hover:opacity-90 transition-colors">
              Yêu Cầu Trả Hàng/Hoàn Tiền
            </button>
          </div>
        )}
        {localOrder.status === 'pending' && (
          <button
            className="px-6 py-2 text-base font-medium text-white bg-[var(--primary-color)] rounded-md hover:opacity-90 transition-colors"
            onClick={() => {
              handleCancelOrder(localOrder._id, { status: 'cancelled' })
            }}
            disabled={updating}
          >
            {updating ? 'Đang hủy...' : 'Hủy đơn hàng'}
          </button>
        )}
      </div>
    </div>
  )
}
