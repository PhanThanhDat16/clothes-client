import ProductList from '@/components/ProductList'

// const newProducts: IProduct[] = [
//   {
//     _id: '9903737241906',
//     name: 'Áo Thun Neo',
//     description: 'Áo Thun Nam Neo Polomanor Màu Trắng',
//     price: 269000,
//     oldPrice: 450000,
//     categoryId: 'category1',
//     images: ['//polomanor.vn/cdn/shop/files/ao-thun-nam-neo-trang.webp?v=1752166983&width=1200'],
//     options: [
//       { size: EProductSize.M, stockQuantity: 10 },
//       { size: EProductSize.L, stockQuantity: 15 },
//       { size: EProductSize.XL, stockQuantity: 8 }
//     ]
//   },
//   {
//     _id: '9903737176370',
//     name: 'Áo Thun Lio',
//     description: 'Áo Thun Nam Lio Polomanor Màu Kem Nhạt',
//     price: 269000,
//     oldPrice: 450000,
//     categoryId: 'category1',
//     images: ['//polomanor.vn/cdn/shop/files/ao-thun-nam-lio-be.webp?v=1752166997&width=1200'],
//     options: [
//       { size: 'M', stockQuantity: 12 },
//       { size: 'L', stockQuantity: 18 },
//       { size: 'XL', stockQuantity: 6 }
//     ]
//   },
//   {
//     _id: '9903734817074',
//     name: 'Áo Polo Rum',
//     description: 'Áo Polo Nam Rum Polomanor Màu Kem Navy',
//     price: 339000,
//     oldPrice: 500000,
//     categoryId: 'category2',
//     images: ['//polomanor.vn/cdn/shop/files/ao-polo-nam-rum.webp?v=1752167040&width=1200'],
//     options: [
//       { size: 'M', stockQuantity: 8 },
//       { size: 'L', stockQuantity: 14 },
//       { size: 'XL', stockQuantity: 10 }
//     ]
//   },
//   {
//     _id: '9903734882610',
//     name: 'Áo Polo Marco',
//     description: 'Áo Polo Nam Marco Polomanor Màu Cafe',
//     price: 339000,
//     oldPrice: 500000,
//     categoryId: 'category2',
//     images: ['//polomanor.vn/cdn/shop/files/ao-polo-nam-marco-cafe.webp?v=1752167019&width=1200'],
//     options: [
//       { size: 'M', stockQuantity: 9 },
//       { size: 'L', stockQuantity: 16 },
//       { size: 'XL', stockQuantity: 7 }
//     ]
//   }
// ]

const ProductPage = () => {
  return (
    <div className="w-full">
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="https://polomanor.vn/cdn/shop/collections/BannerWeb_AlbumSaiGon.jpg?v=1734486682&width=1080"
          alt=""
          className="h-full w-full object-cover filter "
        />
      </div>

      <ProductList />
    </div>
  )
}

export default ProductPage
