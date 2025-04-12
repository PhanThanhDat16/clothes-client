import Logo from '../../Logo/Logo.avif'
import 'boxicons/css/boxicons.min.css'
import { memo, useState } from 'react'
import { ProductShirt, ProductShort } from '../../apis/index'

// interface Product {
//   name: string;
//   image: string;
//   prime: string;
// }

const listNameProduceShirt = [
  { id: 1, name: 'Áo thun' },
  { id: 2, name: 'Polo' },
  { id: 3, name: 'T-shirt' },
  { id: 4, name: 'Sơ Mi' }
]
const listNameProduceShort = [
  { id: 1, name: 'Quần Dài' },
  { id: 2, name: 'Quần Short' }
]
/// Bo Suu Tap
const ListNameCollection = [
  { id: 1, name: 'The Real Jeans' },
  { id: 2, name: 'Sánh Đôi' },
  { id: 3, name: 'Tết 2025' },
  { id: 4, name: 'Từ Nhà Ra Phố' },
  { id: 5, name: 'Chill Thé' },
  { id: 6, name: 'Smart Casual' },
  { id: 7, name: 'Chill Thé' }
]

const Header = () => {
  const [valueSearch, setValueSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  console.log(ProductShirt, ProductShort)
  return (
    <div className="wrapper-Menu w-full ">
      <div className="wrapper-Menu_Header flex justify-between items-center w-full h-[100%]">
        {/* Logo */}
        <div className="Box-Logo-Header ml-[11.2rem] mr-[5.6rem]">
          <img src={Logo} alt="logo" className="img-Logo" />
        </div>
        {/* Text */}
        <ul className="Menu flex items-center">
          <li className="Menu__item ">
            <a href="/" className="Menu__link">
              New-in
            </a>
          </li>
          <li className="Menu__item ">
            <a href="/" className="Menu__link">
              Sản Phẩm
            </a>
            <div className="Menu_Child top-[100%] left-0 w-full bg-white border-t border-black ">
              <div className="Menu__item__Child">
                <a href="/">Áo</a>
                <ul className="Menu__list__Child">
                  {listNameProduceShirt.map((item) => (
                    <li key={item.id}>
                      <a href="/">{item.name}</a>
                    </li>
                  ))}
                </ul>
                {/* Tất Cả */}
                <div className="text-center text-2xl mt-10 mb-10">
                  <a href="/">Tất Cả Sản Phẩm</a>
                </div>
              </div>
              <div className="Menu__item__Child">
                <a href="/">Quần</a>
                <ul className="Menu__list__Child">
                  {listNameProduceShort.map((item) => (
                    <li key={item.id}>
                      <a href="/">{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Phụ Kiện */}
              <div className="Menu__item__Child">
                <a href="/">Phụ Kiện</a>
              </div>
              {/* Bán Chạy Nhất */}
              <div className="Menu__item__Child">
                <a href="/">Bán Chạy Nhất</a>
              </div>
            </div>
          </li>
          <li>
            <i className="bx bxs-chevron-down"></i>
          </li>
          <li className="Menu__item ">
            <a href="/" className="Menu__link">
              Bộ Sưu Tập
            </a>
            <div className="Menu_Child_Products-Left max-h-[450px] border-t border-black top-[100%] left-0 w-full bg-white justify-between">
              {/* Content Left */}
              <div className="Menu_Child_Left-Products w-full">
                <div className="Menu_Child_Left-Products__list w-full h-[3.1rem] bg-white text-black">
                  <ul className="collection-list font-[500] ">
                    {ListNameCollection.map((item) => (
                      <li key={item.id} className="font-[500] ">
                        <a href="/">{item.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Content Right */}
              <div className="Menu_Child_Right-Products w-[100%] py-[50px]">
                <div className="Menu_Child_Right-Products__list px-[90px] gap-[10px]">
                  <img
                    src="https://polomanor.vn/cdn/shop/files/collection-the-real-jeans_3.webp?v=1743645245&width=1200"
                    alt="logo"
                    className="img-Logo"
                  />
                  <img
                    src="https://polomanor.vn/cdn/shop/files/collection-the-real-jeans_6.webp?v=1743645245&width=1200"
                    alt="collection"
                  />
                </div>
              </div>
            </div>
          </li>
          <li className="Menu__item">
            <i className="bx bxs-chevron-down"></i>
          </li>
          <li className="Menu__item ">
            <a href="/" className="Menu__link">
              Liên Hệ
            </a>
          </li>
        </ul>
        {/* Icon */}
        <div className="Menu__icon mr-[150px] ml-[150px] relative ">
          <ul className="Menu__icon__list flex">
            <li onClick={() => setIsOpen(!isOpen)}>
              <i className="bx bx-search"></i>
            </li>
            <li>
              <a href="/">
                <i className="bx bx-user"></i>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="bx bx-cart"></i>
              </a>
            </li>
          </ul>
          {isOpen && (
            <div className="Box_Input w-[650px] absolute right-[-60%] py-[2rem] px-[2.5rem] bg-white border border-white rounded-sm">
              <div className=" border-b border-gray-300 hover:border-gray-500">
                <input
                  className="text-[1.5rem] font-bold pb-[10px]"
                  type="text"
                  placeholder="Tìm kiếm Cho..."
                  value={valueSearch}
                  onChange={(e) => setValueSearch(e.target.value)}
                />
                <div className="inline-flex">
                  <div className="Box_Input_Delate">
                    {valueSearch.length > 0 && (
                      <span className="text-gray-500 text-[20px] mf-[30px]" onClick={() => setValueSearch('')}>
                        Xóa
                      </span>
                    )}
                  </div>
                  <div className="Box_Input_closer">
                    <span className="text-right">
                      <i className="bx bx-x cursor-pointer" onClick={() => setIsOpen(!isOpen)}></i>
                    </span>
                  </div>
                </div>
              </div>
              {/* Render Product */}
              <div className="Box_Input_Product-Render w-full mt-[50px]">
                <ul className="flex flex-col w-full">
                  {/* {(ProductShirt[1] as Product[]).map((item, index) => (
                    <li key={index} className="flex items-center p-4  hover:bg-gray-50 px-[30px] py-[50px]">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img src={item.image} alt="product" className="w-full h-full object-cover rounded-md" />
                      </div>
                      <div className="pl-[40px]">
                        <p className="text-lg font-medium text-gray-700 "><a href="/">{item.name}</a></p>
                        <p>
                          {item.prime}
                        </p>
                      </div>

                    </li>
                  ))} */}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(Header)
