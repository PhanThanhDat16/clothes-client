import { order } from '@/pages/Oder'
import { Store, CheckCircle, Clock } from 'lucide-react'

export const OrderCard = ({ order }: { order: order }) => {
  const formatPrice = (price: number) => price.toLocaleString('vi-VN')
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Shop Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Store className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">{order.shop}</span>
          <span className="inline-flex items-center px-2 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded cursor-pointer">
            Xem Sản phẩm tương tự
          </span>
        </div>
        <div className="flex items-center space-x-3">
          {order.deliverySuccess && (
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircle className="w-4 h-4 mr-1" />
              Giao hàng thành công
            </div>
          )}
          <span
            className={`px-3 py-1 text-base font-medium rounded ${
              order.deliveryType === 'CHỜ XÁC NHẬN' ? 'bg-orange-100 text-orange-500' : 'bg-green-100 text-green-800'
            }`}
          >
            {order.deliveryType}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex items-start space-x-4">
        <img src={order.image} alt={order.name} className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">{order.name}</h3>
          <div className="text-base text-gray-600 mb-2">Phân loại hàng: {order.category}</div>
          <div className="text-sm text-gray-600">x1</div>
        </div>
        <div className="text-right">
          {order.price > order.finalPrice && (
            <div className="text-sm text-gray-400 line-through">{formatPrice(order.price)}₫</div>
          )}
          <div className="text-lg font-bold text-red-600">{formatPrice(order.finalPrice)}₫</div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {order.deliveryType === 'CHỜ XÁC NHẬN' ? (
              <span>
                Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng đã được giao đến bạn và sản phẩm nhận được không có
                vấn đề nào.
              </span>
            ) : (
              <>
                {order.deliveryDate && (
                  <div className="flex items-center mb-2">
                    <Clock className="w-4 h-4 mr-1" />
                    Đánh giá sản phẩm trước: {order.deliveryDate}
                  </div>
                )}
                {order.estimatedDelivery && (
                  <div className="text-sm text-gray-600">Đánh giá ngay và nhận {order.estimatedDelivery}</div>
                )}
              </>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Thành tiền:</span>
            <span className="text-xl font-bold text-red-600">{formatPrice(order.finalPrice)}₫</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center justify-end space-x-3">
        <button className="px-6 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-200 transition-colors">
          Liên Hệ Hỗ Trợ
        </button>
        <button className="px-6 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-200 transition-colors">
          Yêu Cầu Trả Hàng/Hoàn Tiền
        </button>
        <button className="px-6 py-2 text-base font-medium text-white bg-[var(--primary-color)] rounded-md hover:opacity-90 transition-colors">
          {order.deliveryType === 'CHỜ XÁC NHẬN' ? 'Đã Nhận Được Hàng' : 'Đánh Giá'}
        </button>
      </div>
    </div>
  )
}
