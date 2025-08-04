import BannerSlide from '@/components/HomePage/BannerSlide'
import CategoriesSection from '@/components/HomePage/CategoriesSection'
import NewProductsSection from '@/components/HomePage/NewProductSection'
import BestSellerProductsSection from '@/components/HomePage/BestSellerProduct'
import ImageBanner from '@/components/HomePage/ImageBanner'
import MediaGrid from '@/components/HomePage/MediaGrid'
import ExploreSection from '@/components/HomePage/ExploreSection'

const HomePage = () => {
  return (
    <div className="w-full">
      <BannerSlide />
      <CategoriesSection />
      <NewProductsSection />
      <BestSellerProductsSection />
      <ImageBanner></ImageBanner>
      <MediaGrid></MediaGrid>
      <ExploreSection></ExploreSection>/
    </div>
  )
}

export default HomePage
