import { IProduct } from '@/models/product'

const mockProducts: IProduct[] = [
  {
    _id: '9903737241906',
    name: 'Áo Thun Neo',
    description: 'Áo Thun Nam Neo Polomanor Màu Trắng - Thiết kế đơn giản nhưng sang trọng, phù hợp cho mọi dịp.',
    price: 269000,
    oldPrice: 450000,
    categoryId: 'category1',
    images: [
      '//polomanor.vn/cdn/shop/files/ao-thun-nam-neo-trang.webp?v=1752166983&width=1200',
      '//polomanor.vn/cdn/shop/files/ao-thun-nam-neo-trang-2.webp?v=1752166983&width=1200',
      '//polomanor.vn/cdn/shop/files/ao-thun-nam-neo-trang-3.webp?v=1752166983&width=1200'
    ],
    options: [
      { size: 'M', stockQuantity: 10 },
      { size: 'L', stockQuantity: 15 },
      { size: 'XL', stockQuantity: 8 }
    ]
  },
  {
    _id: '9903737176370',
    name: 'Áo Thun Lio',
    description: 'Áo Thun Nam Lio Polomanor Màu Kem Nhạt - Chất liệu cotton cao cấp, thoáng mát.',
    price: 269000,
    oldPrice: 450000,
    categoryId: 'category1',
    images: [
      '//polomanor.vn/cdn/shop/files/ao-thun-nam-lio-be.webp?v=1752166997&width=1200',
      '//polomanor.vn/cdn/shop/files/ao-thun-nam-lio-be-2.webp?v=1752166997&width=1200'
    ],
    options: [
      { size: 'M', stockQuantity: 12 },
      { size: 'L', stockQuantity: 18 },
      { size: 'XL', stockQuantity: 6 }
    ]
  },
  {
    _id: '9903734817074',
    name: 'Áo Polo Rum',
    description: 'Áo Polo Nam Rum Polomanor Màu Kem Navy - Phong cách thể thao sang trọng.',
    price: 339000,
    oldPrice: 500000,
    categoryId: 'category2',
    images: [
      '//polomanor.vn/cdn/shop/files/ao-polo-nam-rum.webp?v=1752167040&width=1200',
      '//polomanor.vn/cdn/shop/files/ao-polo-nam-rum-2.webp?v=1752167040&width=1200',
      '//polomanor.vn/cdn/shop/files/ao-polo-nam-rum-3.webp?v=1752167040&width=1200',
      '//polomanor.vn/cdn/shop/files/ao-polo-nam-rum-4.webp?v=1752167040&width=1200'
    ],
    options: [
      { size: 'M', stockQuantity: 8 },
      { size: 'L', stockQuantity: 14 },
      { size: 'XL', stockQuantity: 10 }
    ]
  },
  {
    _id: '9903734882610',
    name: 'Áo Polo Marco',
    description: 'Áo Polo Nam Marco Polomanor Màu Cafe - Thiết kế cổ điển với chất liệu premium.',
    price: 339000,
    oldPrice: 500000,
    categoryId: 'category2',
    images: [
      '//polomanor.vn/cdn/shop/files/ao-polo-nam-marco-cafe.webp?v=1752167019&width=1200',
      '//polomanor.vn/cdn/shop/files/ao-polo-nam-marco-cafe-2.webp?v=1752167019&width=1200'
    ],
    options: [
      { size: 'M', stockQuantity: 9 },
      { size: 'L', stockQuantity: 16 },
      { size: 'XL', stockQuantity: 7 }
    ]
  }
]

// Mock API function
export const getMockProductDetail = async (productId: string): Promise<{ data: { data: IProduct } }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = mockProducts.find((p) => p._id === productId)
      if (product) {
        resolve({ data: { data: product } })
      } else {
        reject(new Error('Product not found'))
      }
    }, 500) // Simulate API delay
  })
}
