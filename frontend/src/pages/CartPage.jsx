import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import PriceSummary from '../components/common/PriceSummary.jsx'
import ProductVisual from '../components/common/ProductVisual.jsx'
import QuantityInput from '../components/common/QuantityInput.jsx'
import { useStore } from '../hooks/useStore.js'
import { findMenuById, getOrderIssue } from '../data/menuRepository.js'
import { getCartItemTotal, getCartTotal } from '../utils/order.js'
import { formatPrice } from '../utils/price.js'
import './CartPage.css'

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20h4l11-11-4-4L4 16v4Z" />
      <path d="m13.5 6.5 4 4" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7" />
      <path d="M10 11v5M14 11v5" />
    </svg>
  )
}

function CartPage() {
  const navigate = useNavigate()
  const { cartItems, selectedOrderChannel, updateCartItems, storageError } = useStore()
  const total = getCartTotal(cartItems)
  const deliveryIssues = cartItems
    .map((item) => ({ item, issue: getOrderIssue(findMenuById(item.menuId), selectedOrderChannel) }))
    .filter(({ issue }) => issue)
  const changeQuantity = (cartItemId, quantity) => updateCartItems((items) => items.map((item) => item.cartItemId === cartItemId ? { ...item, quantity, itemTotal: item.unitPrice * quantity, lineTotal: item.unitPrice * quantity } : item))
  const removeItem = (item) => {
    if (!window.confirm(`${item.name}을(를) 장바구니에서 삭제하시겠습니까?`)) return
    updateCartItems((items) => items.filter((cartItem) => cartItem.cartItemId !== item.cartItemId))
  }

  if (cartItems.length === 0) return <main className="flow-page"><EmptyState title="장바구니가 비어 있습니다." description="메뉴에서 원하는 상품을 골라 주세요." action={<Button onClick={() => navigate('/menus')}>메뉴 보러 가기</Button>} /></main>

  return (
    <main className="flow-page cart-page">
      <p className="flow-page__eyebrow">Cart · {selectedOrderChannel === 'delivery' ? '배달' : '포장&매장'}</p><h1>주문 내역</h1>
      <div className="cart-page__layout">
        <section className="cart-page__items" aria-label="장바구니 상품">
          {cartItems.map((item) => <article className="cart-item" key={item.cartItemId}>
            <ProductVisual className="cart-item__visual" src={item.image} name={item.name} accent={item.accent} />
            <div className="cart-item__info"><h2>{item.name}</h2><p>{item.optionSummary?.join(' · ') || '기본 옵션'}</p><strong>{formatPrice(getCartItemTotal(item))}</strong><div className="cart-item__actions"><button type="button" className="cart-item__icon-action" aria-label={`${item.name} 옵션 변경`} title="옵션 변경" onClick={() => navigate(`/menus/${item.menuId}?edit=${item.cartItemId}`)}><EditIcon /></button><button type="button" className="cart-item__icon-action cart-item__icon-action--delete" aria-label={`${item.name} 상품 삭제`} title="삭제" onClick={() => removeItem(item)}><TrashIcon /></button></div></div>
            <QuantityInput value={item.quantity} onChange={(quantity) => changeQuantity(item.cartItemId, quantity)} />
          </article>)}
        </section>
        <aside><PriceSummary rows={[{ id: 'products', label: `상품 ${cartItems.length}종`, amount: total }]} total={total} /><p className="cart-page__notice">현재 {selectedOrderChannel === 'delivery' ? '배달' : '포장&매장'} 가격 기준입니다. 실제 결제는 진행되지 않습니다.</p></aside>
      </div>
      {storageError && <p className="flow-page__error" role="alert">{storageError}</p>}
      {deliveryIssues.length > 0 && <p className="flow-page__error" role="alert">{deliveryIssues[0].item.name}: {deliveryIssues[0].issue}</p>}
      <div className="flow-page__actions"><Button variant="secondary" isFullWidth onClick={() => navigate('/menus')}>주문 추가</Button><Button isFullWidth disabled={deliveryIssues.length > 0} onClick={() => navigate('/checkout')}>주문 확인</Button></div>
    </main>
  )
}

export default CartPage
