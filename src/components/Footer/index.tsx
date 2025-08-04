const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-4">Hỗ trợ khách hàng</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Chính sách đổi / hoàn trả
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Chính sách bảo hành
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Chính sách kiểm hàng
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Phương thức thanh toán</h4>
            <ul className="space-y-2 text-gray-400">
              <li>QR Code - MoMo Wallet</li>
              <li>ATM Card / Bank Account</li>
              <li>Visa/ Mastercard</li>
              <li>COD</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Về chúng tôi</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cơ hội việc làm
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Dịch vụ khách hàng</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Mua hàng online: 0877 747 777</li>
              <li>Góp ý, khiếu nại: 0877 747 777</li>
            </ul>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {/* <Facebook className="w-6 h-6" /> */}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {/* <Instagram className="w-6 h-6" /> */}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {/* <Youtube className="w-6 h-6" /> */}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025, Polomanor. Do Shopify cung cấp</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
