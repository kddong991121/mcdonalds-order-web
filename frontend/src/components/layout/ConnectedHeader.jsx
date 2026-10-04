import { useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../../hooks/useStore.js'
import { repriceCartItems } from '../../utils/order.js'
import Header from './Header.jsx'

function ConnectedHeader() {
  const location = useLocation()
  const navigate = useNavigate()
  const {
    cartItems,
    cartItemCount,
    selectedOrderChannel,
    confirmOrderChannelChange,
  } = useStore()

  const searchParams = new URLSearchParams(location.search)
  const activeCategory =
    location.pathname === '/menus' && !searchParams.has('search')
      ? searchParams.get('category') || 'burger'
      : ''

  const handleOrderChannelChange = (nextChannel) => {
    if (nextChannel === selectedOrderChannel) return

    const { repricedItems, unavailableItems } = repriceCartItems(
      cartItems,
      nextChannel,
    )

    if (unavailableItems.length > 0) {
      const unavailableNames = unavailableItems.map((item) => item.name).join(', ')
      const shouldContinue = window.confirm(
        `새 주문 방식에서 이용할 수 없는 상품이 있습니다: ${unavailableNames}\n해당 상품을 제외하고 주문 방식을 변경할까요?`,
      )
      if (!shouldContinue) return
    }

    confirmOrderChannelChange(nextChannel, repricedItems)
  }

  return (
    <Header
      activeCategory={activeCategory}
      orderChannel={selectedOrderChannel}
      cartCount={cartItemCount}
      onLogoClick={() => navigate('/menus')}
      onCategoryChange={(categoryId) =>
        navigate(`/menus?category=${encodeURIComponent(categoryId)}`)
      }
      onOrderChannelChange={handleOrderChannelChange}
      onSearch={(query) =>
        navigate(`/menus?search=${encodeURIComponent(query)}`)
      }
      onCartClick={() => navigate('/cart')}
      onMyPageClick={() => navigate('/mypage')}
    />
  )
}

export default ConnectedHeader
