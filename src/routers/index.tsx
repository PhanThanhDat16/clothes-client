// Libs
import { Route, Routes } from 'react-router-dom'

// Page
import HomePage from '@/pages/HomePage'

// Router
import {
  COLLECTION_PAGE,
  CONTACT_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  NEWIN_PAGE,
  PRODUCT_PAGE,
  REGISTER_PAGE,
  CART_PAGE,
  AUTH_SUCCESS
} from '@/constants'

import MainLayout from '@/layouts'
import NewIn from '@/pages/NewIn'
import Product from '@/pages/Product'
import Collection from '@/pages/Collection'
import Contact from '@/pages/Contact'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Cart from '@/pages/Cart'
import AuthSuccess from '@/pages/auth-success/auth-success'

const AppRouters = () => {
  return (
    <Routes>
      <Route path={HOME_PAGE} element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path={NEWIN_PAGE} element={<NewIn />} />
        <Route path={PRODUCT_PAGE} element={<Product />} />
        <Route path={COLLECTION_PAGE} element={<Collection />} />
        <Route path={CONTACT_PAGE} element={<Contact />} />

        <Route path={CART_PAGE} element={<Cart />} />

        <Route path={LOGIN_PAGE} element={<Login />} />
        <Route path={REGISTER_PAGE} element={<Register />} />
        <Route path={AUTH_SUCCESS} element={<AuthSuccess />} />
      </Route>
    </Routes>
  )
}

export default AppRouters
