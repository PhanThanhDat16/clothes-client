import { Order } from '@/models/order'
import { OrderCard } from './OrderCard'

export const OrderList = ({ orders }: { orders: Order[] }) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500 text-lg">Hiện chưa có đơn hàng nào</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  )
}
