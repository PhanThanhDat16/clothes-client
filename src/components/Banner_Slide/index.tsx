import { useEffect, useState } from 'react'
const Slide = [
  { id: 1, name: 'Slide 1', image: 'https://polomanor.vn/cdn/shop/files/sanhdoi-collection-pc.webp?v=1740992791' },
  { id: 2, name: 'Slide 2', image: 'https://polomanor.vn/cdn/shop/files/slider_tnrp_pc.webp?v=1739843382&width=2000' },
  {
    id: 3,
    name: 'Slide 3',
    image: 'https://polomanor.vn/cdn/shop/files/therealjeans-slider.webp?v=1743736729&width=2000'
  },
  { id: 4, name: 'Slide 4', image: 'https://polomanor.vn/cdn/shop/files/socialcircle_pc.webp?v=1739843367&width=2000' }
]

function Banner_Slide() {
  const [urlImage, setUrlImage] = useState(Slide[3])
  const [count, setCount] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setUrlImage(Slide[count])
    }, 10000)
    setCount(() => {
      if (count == Slide.length - 1) {
        return 0
      }
      return count + 1
    })
  }, [urlImage])

  return (
    <div>
      <div key={urlImage.id}>
        <img src={urlImage.image} alt={urlImage.name} />
      </div>
    </div>
  )
}

export default Banner_Slide
