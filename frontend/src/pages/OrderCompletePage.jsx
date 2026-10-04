import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import PriceSummary from '../components/common/PriceSummary.jsx'
import { useStore } from '../hooks/useStore.js'
import { ORDER_CHANNEL_LABELS, SERVICE_TYPE_LABELS } from '../constants/shopRules.js'
import { getQueueNumber } from '../utils/order.js'
import './OrderCompletePage.css'

function OrderCompletePage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { orders } = useStore()
  const order = orders.find((item) => item.orderId === orderId)

  if (!order) return <main className="flow-page"><EmptyState title="주문 내역을 찾을 수 없습니다." description={`주문 번호 ${orderId}에 해당하는 저장 데이터가 없습니다.`} action={<Button onClick={() => navigate('/mypage?tab=orders')}>주문 내역 보기</Button>} /></main>

  const queueNumber = order.queueNumber || getQueueNumber(order.orderId)
  const disposableNeeded = order.disposableNeeded ?? order.disposable

  return (
    <main className="flow-page order-complete-page">
      <section className="order-complete-page__hero"><div aria-hidden="true">✓</div><p className="flow-page__eyebrow">Order complete</p><h1>주문이 접수되었습니다.</h1><section className="order-complete-page__queue" aria-label={`대기번호 ${queueNumber}`}><span>대기번호</span><strong>{queueNumber}</strong><small>주문 준비 상태를 확인할 때 사용해 주세요.</small></section><p>실제 결제·배달 없이 브라우저에 저장된 수업용 주문입니다.</p></section>
      <section className="order-complete-page__card"><dl><div><dt>주문 번호</dt><dd>{order.orderNumber || order.orderId}</dd></div><div><dt>대기번호</dt><dd>{queueNumber}</dd></div><div><dt>주문 채널</dt><dd>{ORDER_CHANNEL_LABELS[order.channel] || order.channel}</dd></div><div><dt>주문 방식</dt><dd>{SERVICE_TYPE_LABELS[order.serviceType] || order.serviceType}</dd></div>{order.branchName && <><div><dt>주문 매장</dt><dd>{order.branchName}</dd></div><div><dt>지점 주소</dt><dd>{order.branchAddress}</dd></div></>}{order.channel === 'delivery' && <div><dt>배달 주소</dt><dd>{order.deliveryAddress?.address}</dd></div>}{order.serviceType !== 'dineIn' && typeof disposableNeeded === 'boolean' && <div><dt>일회용품</dt><dd>{disposableNeeded ? '필요함' : '필요하지 않음'}</dd></div>}<div><dt>{order.channel === 'store' ? '매장 요청사항' : '배달 요청사항'}</dt><dd>{order.request || '없음'}</dd></div><div><dt>주문 상태</dt><dd>{order.status}</dd></div><div><dt>주문 시각</dt><dd>{new Date(order.createdAt).toLocaleString('ko-KR')}</dd></div></dl></section>
      <section className="order-complete-page__card"><h2>주문 상품</h2>{order.items.map((item) => <p key={item.cartItemId}><span>{item.name} × {item.quantity}</span><span>{item.optionSummary?.join(' · ')}</span></p>)}</section>
      <PriceSummary rows={[{ id: 'products', label: '상품 금액', amount: order.subtotal }, ...(order.channel === 'delivery' ? [{ id: 'delivery', label: '배달비', amount: order.deliveryFee }] : [])]} total={order.totalPrice} />
      <div className="flow-page__actions"><Button variant="secondary" isFullWidth onClick={() => navigate('/menus')}>메뉴로 이동</Button><Button isFullWidth onClick={() => navigate('/mypage?tab=orders')}>주문 내역 보기</Button></div>
    </main>
  )
}

export default OrderCompletePage
