import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BranchSelectModal from '../components/common/BranchSelectModal.jsx'
import BranchSelector from '../components/common/BranchSelector.jsx'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import PriceSummary from '../components/common/PriceSummary.jsx'
import PaymentMethodModal from '../components/common/PaymentMethodModal.jsx'
import ServiceTypeSelector from '../components/common/ServiceTypeSelector.jsx'
import SecondaryActionButton from '../components/common/SecondaryActionButton.jsx'
import { DELIVERY_POLICY } from '../constants/shopRules.js'
import { findMenuById, getOrderIssue } from '../data/menuRepository.js'
import { findPaymentMethod } from '../data/mockPaymentMethods.js'
import { useStore } from '../hooks/useStore.js'
import { createOrderSnapshot, getCartTotal, getDeliveryFee, requiresDisposableOption } from '../utils/order.js'
import { formatPrice } from '../utils/price.js'
import './CheckoutPage.css'

function CheckoutPage() {
  const navigate = useNavigate()
  const { cartItems, orders, paymentMethod, profile, selectedBranch, selectedOrderChannel, updateCartItems, updateOrders, updateSelectedBranch, storageError } = useStore()
  const [address, setAddress] = useState(profile.address)
  const [detailAddress, setDetailAddress] = useState('')
  const [phone, setPhone] = useState(profile.phone)
  const [request, setRequest] = useState('')
  const [disposableSelection, setDisposableSelection] = useState({ context: '', value: null })
  const [disposableError, setDisposableError] = useState('')
  const [serviceType, setServiceType] = useState('takeout')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethod)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(!selectedBranch)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const subtotal = getCartTotal(cartItems)
  const deliveryFee = getDeliveryFee(subtotal, selectedOrderChannel)
  const totalPrice = subtotal + deliveryFee
  const orderIssue = cartItems.map((item) => ({ name: item.name, issue: getOrderIssue(findMenuById(item.menuId), selectedOrderChannel) })).find((item) => item.issue)
  const minimumOrderIssue = selectedOrderChannel === 'delivery' && subtotal < DELIVERY_POLICY.minimumOrderAmount ? `배달 주문은 상품 금액 ${formatPrice(DELIVERY_POLICY.minimumOrderAmount)} 이상부터 가능합니다.` : ''
  const currentServiceType = selectedOrderChannel === 'delivery' ? 'delivery' : serviceType
  const disposableContext = `${selectedOrderChannel}:${currentServiceType}`
  const disposableNeeded = disposableSelection.context === disposableContext ? disposableSelection.value : null
  const shouldShowDisposableOption = requiresDisposableOption(selectedOrderChannel, currentServiceType)

  if (cartItems.length === 0) return <main className="flow-page"><EmptyState title="주문할 상품이 없습니다." description="장바구니에 상품을 먼저 담아 주세요." action={<Button onClick={() => navigate('/menus')}>메뉴 보러 가기</Button>} /></main>

  const submitOrder = (event) => {
    event.preventDefault()
    if (isSubmitting) return
    if (orderIssue) { setError(`${orderIssue.name}: ${orderIssue.issue}`); return }
    if (minimumOrderIssue) { setError(minimumOrderIssue); return }
    if (!selectedBranch) { setError('주문 매장을 선택해 주세요.'); setIsBranchModalOpen(true); return }
    if (selectedOrderChannel === 'delivery' && !address.trim()) { setError('배송 주소를 입력해 주세요.'); return }
    if (selectedOrderChannel === 'delivery' && !/^01\d{8,9}$/.test(phone.replace(/\D/g, ''))) { setError('연락처는 01로 시작하는 10~11자리 숫자로 입력해 주세요.'); return }
    if (shouldShowDisposableOption && disposableNeeded === null) { setDisposableError('일회용품 필요 여부를 선택해 주세요.'); return }
    setDisposableError('')
    setIsSubmitting(true)
    const orderAddress = [address.trim(), detailAddress.trim()].filter(Boolean).join(' ')
    const order = createOrderSnapshot({
      cartItems,
      channel: selectedOrderChannel,
      serviceType: selectedOrderChannel === 'delivery' ? 'delivery' : serviceType,
      branch: selectedBranch,
      customerInfo: selectedOrderChannel === 'delivery' ? { phone: phone.replace(/\D/g, '') } : null,
      deliveryAddress: selectedOrderChannel === 'delivery' ? { address: orderAddress } : null,
      request: request.trim(),
      disposableNeeded: shouldShowDisposableOption ? disposableNeeded : null,
      paymentMethod: selectedPaymentMethod,
      deliveryFee,
      existingOrders: orders,
    })
    if (!updateOrders((currentOrders) => [order, ...currentOrders])) { setError('주문 내역을 저장하지 못했습니다.'); setIsSubmitting(false); return }
    updateCartItems([])
    navigate(`/order-complete/${order.orderId}`, { replace: true })
  }

  return (
    <main className="flow-page checkout-page">
      <SecondaryActionButton className="flow-page__back" aria-label="이전 화면으로 이동" onClick={() => navigate('/cart')}>← 장바구니</SecondaryActionButton>
      <p className="flow-page__eyebrow">Checkout · {selectedOrderChannel === 'delivery' ? '배달' : '포장&매장'}</p><h1>주문 확인 및 결제</h1>
      <form onSubmit={submitOrder}>
        {selectedOrderChannel === 'delivery' ? (
          <><section className="checkout-page__card"><h2>주문 방식</h2><p className="checkout-page__channel">배달</p></section><BranchSelector branch={selectedBranch} onClick={() => setIsBranchModalOpen(true)} /><section className="checkout-page__card"><h2>배달 정보</h2><label>주소<input value={address} onChange={(event) => setAddress(event.target.value)} /></label><label>상세주소 (선택)<input value={detailAddress} onChange={(event) => setDetailAddress(event.target.value)} /></label><label>연락처 전화번호<input inputMode="numeric" value={phone} onChange={(event) => setPhone(event.target.value)} /></label><label>요청사항<textarea rows="3" placeholder="문 앞에 놓아 주세요 등" value={request} onChange={(event) => setRequest(event.target.value)} /></label></section></>
        ) : (
          <><section className="checkout-page__card"><h2>주문 방식</h2><ServiceTypeSelector value={serviceType} onChange={setServiceType} /></section><BranchSelector branch={selectedBranch} onClick={() => setIsBranchModalOpen(true)} /><section className="checkout-page__card"><h2>요청사항</h2><label>매장 요청사항 (선택)<textarea rows="3" value={request} onChange={(event) => setRequest(event.target.value)} /></label></section></>
        )}
        {shouldShowDisposableOption && <section className="checkout-page__card" aria-labelledby="disposable-title"><h2 id="disposable-title">일회용품이 필요하신가요?</h2><div className="checkout-page__radio"><label className={disposableNeeded === true ? 'is-selected' : ''}><input type="radio" name="disposable-needed" value="needed" checked={disposableNeeded === true} aria-describedby={disposableError ? 'disposable-error' : undefined} onChange={() => { setDisposableSelection({ context: disposableContext, value: true }); setDisposableError('') }} />필요해요</label><label className={disposableNeeded === false ? 'is-selected' : ''}><input type="radio" name="disposable-needed" value="not-needed" checked={disposableNeeded === false} aria-describedby={disposableError ? 'disposable-error' : undefined} onChange={() => { setDisposableSelection({ context: disposableContext, value: false }); setDisposableError('') }} />필요하지 않아요</label></div>{disposableError && <p className="checkout-page__field-error" id="disposable-error" role="alert">{disposableError}</p>}</section>}
        <section className="checkout-page__card"><h2>결제수단</h2><p className="checkout-page__payment"><span>{findPaymentMethod(selectedPaymentMethod).displayName}</span><SecondaryActionButton onClick={() => setIsPaymentModalOpen(true)}>변경</SecondaryActionButton></p></section>
        <section className="checkout-page__card"><h2>주문 상품</h2>{cartItems.map((item) => <div className="checkout-page__item" key={item.cartItemId}><span>{item.name} × {item.quantity}</span><strong>{formatPrice(item.unitPrice * item.quantity)}</strong></div>)}</section>
        <PriceSummary rows={[{ id: 'products', label: '상품 금액', amount: subtotal }, ...(selectedOrderChannel === 'delivery' ? [{ id: 'delivery', label: '배달비', amount: deliveryFee }] : [])]} total={totalPrice} />
        <p className="checkout-page__simulation">실제 결제는 진행되지 않습니다. 버튼을 누르면 주문 내역만 이 브라우저에 저장됩니다.</p>
        {(error || storageError || orderIssue || minimumOrderIssue) && <p className="flow-page__error" role="alert">{error || storageError || (orderIssue && `${orderIssue.name}: ${orderIssue.issue}`) || minimumOrderIssue}</p>}
        <Button type="submit" isFullWidth disabled={isSubmitting || Boolean(orderIssue) || Boolean(minimumOrderIssue) || !selectedBranch}>{isSubmitting ? '주문 저장 중…' : `${formatPrice(totalPrice)} 주문하기`}</Button>
      </form>
      <BranchSelectModal isOpen={isBranchModalOpen} onClose={selectedBranch ? () => setIsBranchModalOpen(false) : undefined} onSelect={(branch) => { updateSelectedBranch(branch); setIsBranchModalOpen(false); setError('') }} />
      {isPaymentModalOpen && <PaymentMethodModal isOpen value={selectedPaymentMethod} onClose={() => setIsPaymentModalOpen(false)} onConfirm={(methodId) => { setSelectedPaymentMethod(methodId); setIsPaymentModalOpen(false) }} />}
    </main>
  )
}

export default CheckoutPage
