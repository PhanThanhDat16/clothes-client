import Banner_Slide from '@/components/Banner_Slide'
import CategoriesSection from '@/components/Categories/CategoriesSection'
import ExploreSection from '@/components/ExploreSection/ExploreSection'
import ImageBanner from '@/components/ImageBanner/ImageBanner'
import MediaGrid from '@/components/MediaGrid/MediaGridSection'
import BestSellerProductsSection from '@/components/Products/BestSellerProductsSection'
import NewProductsSection from '@/components/Products/NewProductsSection'

const HomePage = () => {
  return (
    <div>
      <Banner_Slide />
      <CategoriesSection></CategoriesSection>
      <NewProductsSection></NewProductsSection>
      <BestSellerProductsSection></BestSellerProductsSection>
      <ImageBanner></ImageBanner>
      <MediaGrid></MediaGrid>
      <ExploreSection></ExploreSection>
    </div>
  )
}

export default HomePage
