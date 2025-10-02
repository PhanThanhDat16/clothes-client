import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import ProductCard from '../ProductCard'
import type { IProduct } from '@/models/product'
import { searchItems } from '@/apis/productService'

interface FilterState {
  minPrice: string
  maxPrice: string
  category: string
  size: string
  color: string
  brand: string
  sortBy: string
  inStock: boolean
}

const SearchProduct = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState<FilterState>({
    minPrice: '',
    maxPrice: '',
    category: '',
    size: '',
    color: '',
    brand: '',
    sortBy: 'relevance',
    inStock: false
  })

  const categories = [
    'Tất cả',
    'Áo thun',
    'Áo sơ mi',
    'Áo khoác',
    'Quần jean',
    'Quần tây',
    'Quần short',
    'Váy',
    'Đầm',
    'Đồ thể thao',
    'Đồ ngủ',
    'Phụ kiện'
  ]

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']

  const colors = [
    { name: 'Đen', value: 'black', hex: '#000000' },
    { name: 'Trắng', value: 'white', hex: '#FFFFFF' },
    { name: 'Xám', value: 'gray', hex: '#9CA3AF' },
    { name: 'Đỏ', value: 'red', hex: '#EF4444' },
    { name: 'Xanh dương', value: 'blue', hex: '#3B82F6' },
    { name: 'Xanh lá', value: 'green', hex: '#10B981' },
    { name: 'Vàng', value: 'yellow', hex: '#F59E0B' },
    { name: 'Hồng', value: 'pink', hex: '#EC4899' },
    { name: 'Nâu', value: 'brown', hex: '#92400E' },
    { name: 'Be', value: 'beige', hex: '#D4B996' }
  ]

  const brands = [
    'Nike',
    'Adidas',
    'Zara',
    'H&M',
    'Uniqlo',
    'Pull&Bear',
    'Forever 21',
    'Levis',
    'Tommy Hilfiger',
    'Calvin Klein'
  ]

  const sortOptions = [
    { value: 'relevance', label: 'Liên quan nhất' },
    { value: 'price-asc', label: 'Giá thấp đến cao' },
    { value: 'price-desc', label: 'Giá cao đến thấp' },
    { value: 'newest', label: 'Mới nhất' },
    { value: 'popular', label: 'Bán chạy nhất' }
  ]

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      const items = await searchItems(query)
      console.log(items.data)
      setResults(items.data)
    } catch (err) {
      setError(`Có lỗi khi tìm kiếm sản phẩm: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      category: '',
      size: '',
      color: '',
      brand: '',
      sortBy: 'relevance',
      inStock: false
    })
    if (results.length > 0) {
      // Re-apply search without filters
      handleSearch(new Event('submit') as any)
    }
  }

  const activeFilterCount = [
    filters.minPrice,
    filters.maxPrice,
    filters.category && filters.category !== 'Tất cả',
    filters.size,
    filters.color,
    filters.brand,
    filters.inStock
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-screen-xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Tìm kiếm sản phẩm</h1>
          <p className="text-slate-600">Khám phá bộ sưu tập thời trang đa dạng</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm áo, quần, áo sweater,..."
              className="w-full pl-12 pr-32 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition shadow-sm text-slate-800 placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang tìm...' : 'Tìm kiếm'}
            </button>
          </div>
        </form>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 flex-shrink-0`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-slate-700" />
                  <h2 className="text-lg font-bold text-slate-800">Bộ lọc</h2>
                  {activeFilterCount > 0 && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                {activeFilterCount > 0 && (
                  <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Xóa tất cả
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Danh mục</label>
                  <select
                    value={filters.category}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Size */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Kích thước</label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                          filters.size === size
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Màu sắc</label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        className={`group relative w-10 h-10 rounded-lg transition ${
                          filters.color === color.value
                            ? 'ring-2 ring-blue-600 ring-offset-2'
                            : 'ring-1 ring-slate-200 hover:ring-slate-300'
                        }`}
                        title={color.name}
                      >
                        <div
                          className="w-full h-full rounded-lg"
                          style={{
                            backgroundColor: color.hex,
                            border: color.value === 'white' ? '1px solid #e2e8f0' : 'none'
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Thương hiệu</label>
                  <select
                    value={filters.brand}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                  >
                    <option value="">Tất cả thương hiệu</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Khoảng giá</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Tối thiểu"
                      value={filters.minPrice}
                      className="w-1/2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                    />
                    <input
                      type="number"
                      placeholder="Tối đa"
                      value={filters.maxPrice}
                      className="w-1/2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                    />
                  </div>
                </div>

                {/* In Stock */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                      Chỉ hiển thị sản phẩm còn hàng
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Toggle & Sort */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="font-medium text-slate-700">Lọc</span>
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 hidden sm:block">Sắp xếp:</span>
                <select
                  value={filters.sortBy}
                  className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 font-medium shadow-sm"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            {results.length > 0 && !loading && (
              <div className="mb-4">
                <p className="text-slate-600">
                  Tìm thấy <span className="font-semibold text-slate-800">{results.length}</span> sản phẩm
                </p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-600 font-medium">Đang tìm kiếm sản phẩm...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            {/* Results Grid */}
            {!loading && results.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((item) => (
                  <ProductCard key={item._id} item={item} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {results.length === 0 && !loading && query && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-slate-600 text-center max-w-md mb-6">
                  Rất tiếc, chúng tôi không tìm thấy sản phẩm nào phù hợp với từ khóa "{query}". Hãy thử tìm kiếm với từ
                  khóa khác hoặc điều chỉnh bộ lọc.
                </p>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg"
                  >
                    Xóa bộ lọc
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchProduct
