// Libs
import { Route, Routes } from 'react-router-dom'

// Page
import HomePage from '@/pages/HomePage'

// Router
import {
  CATEGORY_PAGE,
  CONTACT_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  NEWIN_PAGE,
  PRODUCT_PAGE,
  REGISTER_PAGE,
  CART_PAGE,
  AUTH_SUCCESS,
  PROFILE_PAGE,
  ORDER_PAGE,
  PRODUCT_DETAIL_PAGE,
  CATEGORY_DETAIL_PAGE,
  SEARCH_PAGE
} from '@/constants'

import MainLayout from '@/layouts'
import NewIn from '@/pages/NewIn'
import Product from '@/pages/Product'
import Category from '@/pages/Category'
import Contact from '@/pages/Contact'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Cart from '@/pages/Cart'
import AuthSuccess from '@/pages/auth-success/auth-success'
import Profile from '@/pages/Profile'
import Order from '@/pages/Order'
import DetailProduct from '@/pages/Product/DetailProduct'
import DetailCategory from '@/pages/Category/DetailCategory'
import SearchPage from '@/pages/search'
const AppRouters = () => {
  return (
    <Routes>
      <Route path={HOME_PAGE} element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path={NEWIN_PAGE} element={<NewIn />} />
        <Route path={PRODUCT_PAGE} element={<Product />} />
        <Route path={PRODUCT_DETAIL_PAGE} element={<DetailProduct />} />
        <Route path={CATEGORY_PAGE} element={<Category />} />
        <Route path={CATEGORY_DETAIL_PAGE} element={<DetailCategory />} />
        <Route path={CONTACT_PAGE} element={<Contact />} />

        <Route path={CART_PAGE} element={<Cart />} />

        <Route path={PROFILE_PAGE} element={<Profile />} />
        <Route path={LOGIN_PAGE} element={<Login />} />
        <Route path={REGISTER_PAGE} element={<Register />} />
        <Route path={AUTH_SUCCESS} element={<AuthSuccess />} />
        <Route path={ORDER_PAGE} element={<Order />} />
        <Route path={SEARCH_PAGE} element={<SearchPage />} />
      </Route>
    </Routes>
  )
}

export default AppRouters
