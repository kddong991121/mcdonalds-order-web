import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import MenuDetailPage from './pages/MenuDetailPage.jsx'
import MenuListPage from './pages/MenuListPage.jsx'
import MyPage from './pages/MyPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import OrderCompletePage from './pages/OrderCompletePage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/menus" replace />} />
        <Route path="/menus" element={<MenuListPage />} />
        <Route path="/menus/:menuId" element={<MenuDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-complete/:orderId" element={<OrderCompletePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
