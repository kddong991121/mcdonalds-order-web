function createCartItemId() {
  return `cart-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

import { DELIVERY_POLICY } from '../constants/shopRules.js'
import { findMenuById, getOrderIssue } from '../data/menuRepository.js'
import { calculateUnitPrice } from './menuSelection.js'

function createOrderId(existingOrders = []) {
  const now = new Date()
  const date = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
    .map((value) => String(value).padStart(2, '0')).join('')
  const lastSequence = existingOrders
    .map((order) => order.orderId)
    .filter((orderId) => orderId?.startsWith(`${date}-`))
    .map((orderId) => Number(orderId.slice(-3)))
    .filter(Number.isFinite)
    .reduce((max, value) => Math.max(max, value), 0)
  return `${date}-${String(lastSequence + 1).padStart(3, '0')}`
}

function getQueueNumber(orderId) {
  const sequence = orderId?.match(/-(\d{3})$/)?.[1]
  return sequence || '001'
}

function getCartItemUnitPrice(item) { return item.unitPrice ?? item.price ?? 0 }
function getCartItemTotal(item) { return getCartItemUnitPrice(item) * item.quantity }
function getCartTotal(items) { return items.reduce((total, item) => total + getCartItemTotal(item), 0) }

function getDeliveryFee(subtotal, channel) {
  if (channel !== 'delivery') return 0
  return subtotal >= DELIVERY_POLICY.freeDeliveryThreshold ? 0 : DELIVERY_POLICY.deliveryFee
}

function requiresDisposableOption(channel, serviceType) {
  return channel === 'delivery' || (channel === 'store' && serviceType === 'takeout')
}

function repriceCartItems(cartItems, channel) {
  const repricedItems = []
  const unavailableItems = []

  cartItems.forEach((item) => {
    const menu = findMenuById(item.menuId)
    const issue = getOrderIssue(menu, channel)
    const selection = { productSize: item.productSize, size: item.size, side: item.side, drink: item.drink }
    const unitPrice = calculateUnitPrice(menu, item.productType, selection, channel)
    if (issue || !Number.isFinite(unitPrice)) {
      unavailableItems.push({ ...item, issue: issue || '현재 주문 방식의 가격을 계산할 수 없습니다.' })
      return
    }
    repricedItems.push({
      ...item,
      channel,
      availability: { ...menu.availability },
      unitPrice,
      itemTotal: unitPrice * item.quantity,
      lineTotal: unitPrice * item.quantity,
    })
  })

  return { repricedItems, unavailableItems }
}

function createOrderSnapshot({ cartItems, channel, serviceType, branch, customerInfo, deliveryAddress, request, disposableNeeded, paymentMethod, deliveryFee, existingOrders = [] }) {
  const subtotal = getCartTotal(cartItems)
  const orderedAt = new Date().toISOString()
  const totalPrice = subtotal + deliveryFee
  const orderId = createOrderId(existingOrders)
  return {
    orderId,
    orderNumber: orderId,
    queueNumber: getQueueNumber(orderId),
    createdAt: orderedAt,
    orderedAt,
    status: '주문 접수',
    channel,
    serviceType,
    branchId: branch?.id || null,
    branchName: branch?.name || null,
    branchAddress: branch?.address || null,
    customerInfo: channel === 'delivery' ? customerInfo : null,
    deliveryAddress: channel === 'delivery' ? deliveryAddress : null,
    request,
    disposableNeeded: requiresDisposableOption(channel, serviceType) ? disposableNeeded : null,
    paymentMethod: paymentMethod || 'onsite',
    subtotal,
    deliveryFee,
    totalPrice,
    items: cartItems.map((item) => ({
      ...item,
      productSize: item.productSize ? { ...item.productSize } : null,
      size: item.size ? { ...item.size } : null,
      side: item.side ? { ...item.side } : null,
      drink: item.drink ? { ...item.drink } : null,
      ingredients: (item.ingredients || []).map((ingredient) => ({ ...ingredient })),
      optionSummary: [...(item.optionSummary || [])],
    })),
  }
}

export { createCartItemId, createOrderId, createOrderSnapshot, getCartItemTotal, getCartItemUnitPrice, getCartTotal, getDeliveryFee, getQueueNumber, repriceCartItems, requiresDisposableOption }
