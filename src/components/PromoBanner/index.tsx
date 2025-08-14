const data = [
  { id: 1, title: 'ĐƠN 500K: GIẢM 5% TỔNG ĐƠN + FREESHIP' },
  { id: 2, title: 'ĐƠN 500K: GIẢM 5% TỔNG ĐƠN + FREESHIP' },
  { id: 3, title: 'ĐƠN 500K: GIẢM 5% TỔNG ĐƠN + FREESHIP' },
  { id: 4, title: 'ĐƠN 500K: GIẢM 5% TỔNG ĐƠN + FREESHIP' },
  { id: 5, title: 'ĐƠN 500K: GIẢM 5% TỔNG ĐƠN + FREESHIP' },
  { id: 6, title: 'ĐƠN 500K: GIẢM 5% TỔNG ĐƠN + FREESHIP' },
  { id: 7, title: 'ĐƠN 500K: GIẢM 5% TỔNG ĐƠN + FREESHIP' }
]

const PromoBanner = () => {
  return (
    <div className="w-full bg-black py-3 overflow-hidden">
      <div className="">
        <div className="flex whitespace-nowrap">
          {data.map((item) => (
            <li key={item.id} className="animate-[marquee_10s_linear_infinite]">
              <a href="/" className="text-white px-5">
                {item.title}
              </a>
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PromoBanner
