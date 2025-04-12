import { useCallback, memo } from 'react'

const data = [
  { id: 1, title: 'ĐƠN 500K: GIẢM 5% TỔNG ĐƠN + FREESHIP' },
  { id: 2, title: 'ĐƠN 500K: GIẢM 5% TỔNG ĐƠN + FREESHIP' },
  { id: 3, title: 'ĐƠN 500K: GIẢM 5% TỔNG ĐƠN + FREESHIP' },
  { id: 4, title: 'ĐƠN 500K: GIẢM 5% TỔNG ĐƠN + FREESHIP' },
  { id: 5, title: 'ĐƠN 500K: GIẢM 5% TỔNG ĐƠN + FREESHIP' },
  { id: 6, title: 'ĐƠN 500K: GIẢM 5% TỔNG ĐƠN + FREESHIP' },
  { id: 7, title: 'ĐƠN 500K: GIẢM 5% TỔNG ĐƠN + FREESHIP' }
]

function PromoBanner() {
  const RenderPromoBanner = useCallback(() => {
    return (
      <div className="promoBanner w-full h-[100%]">
        <div className="flex overflow-hidden h-full">
          <div className="flex animate-scroll whitespace-nowrap h-full items-center">
            {data.map((item) => (
              <p key={item.id} className="promoBanner__container inline-block px-4 h-full flex items-center">
                <a href="/" className="text-white">
                  {item.title}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>
    )
  }, [data])

  return (
    <div className="promoBanner">
      <RenderPromoBanner />
    </div>
  )
}

export default memo(PromoBanner)
