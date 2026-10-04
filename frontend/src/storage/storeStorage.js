import { isValidCartItem, isValidOrder } from '../utils/validation.js'

const CART_STORAGE_KEY = 'mcdonalds-order-web:cart'
const ORDERS_STORAGE_KEY = 'mcdonalds-order-web:orders'
const PROFILE_STORAGE_KEY = 'mcdonalds-order-web:user-profile'
const PAYMENT_STORAGE_KEY = 'mcdonalds-order-web:payment-method'
const ORDER_CHANNEL_STORAGE_KEY = 'mcdonalds-order-web:selected-order-channel'
const BRANCH_STORAGE_KEY = 'mcdonalds-order-web:selected-branch'
const EMPTY_PROFILE = { name: '', phone: '', address: '' }
const PAYMENT_METHOD_IDS = ['card', 'easyPay', 'onsite']

function getBrowserStorage() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage
}

function loadArray(storageKey, dataName, isValidItem) {
  const storage = getBrowserStorage()

  if (!storage) {
    return { data: [], error: '' }
  }

  try {
    const savedValue = storage.getItem(storageKey)

    if (!savedValue) {
      return { data: [], error: '' }
    }

    const parsedValue = JSON.parse(savedValue)

    if (!Array.isArray(parsedValue)) {
      return {
        data: [],
        error: `${dataName} 저장값의 형식이 올바르지 않습니다.`,
      }
    }

    const validItems = parsedValue.filter(isValidItem)
    return {
      data: validItems,
      error: validItems.length === parsedValue.length ? '' : `${dataName}의 일부 손상된 항목을 제외했습니다.`,
    }
  } catch {
    return {
      data: [],
      error: `${dataName} 저장값을 불러오지 못했습니다.`,
    }
  }
}

function saveArray(storageKey, dataName, data, isValidItem) {
  const storage = getBrowserStorage()

  if (!Array.isArray(data)) {
    return {
      success: false,
      error: `${dataName} 데이터는 배열이어야 합니다.`,
    }
  }

  if (!data.every(isValidItem)) {
    return { success: false, error: `${dataName}에 유효하지 않은 항목이 있습니다.` }
  }

  if (!storage) {
    return {
      success: false,
      error: '현재 환경에서는 브라우저 저장소를 사용할 수 없습니다.',
    }
  }

  try {
    storage.setItem(storageKey, JSON.stringify(data))
    return { success: true, error: '' }
  } catch {
    return {
      success: false,
      error: `${dataName} 데이터를 저장하지 못했습니다.`,
    }
  }
}

function loadCart() {
  return loadArray(CART_STORAGE_KEY, '장바구니', isValidCartItem)
}

function saveCart(cartItems) {
  return saveArray(CART_STORAGE_KEY, '장바구니', cartItems, isValidCartItem)
}

function loadOrders() {
  return loadArray(ORDERS_STORAGE_KEY, '주문 내역', isValidOrder)
}

function saveOrders(orders) {
  return saveArray(ORDERS_STORAGE_KEY, '주문 내역', orders, isValidOrder)
}

function findOrder(orderId) {
  const { data } = loadOrders()
  return data.find((order) => order.orderId === orderId)
}

function loadObject(storageKey, fallbackValue, isValidValue, dataName) {
  const storage = getBrowserStorage()
  if (!storage) return { data: fallbackValue, error: '' }

  try {
    const savedValue = storage.getItem(storageKey)
    if (!savedValue) return { data: fallbackValue, error: '' }
    const parsedValue = JSON.parse(savedValue)
    return isValidValue(parsedValue)
      ? { data: parsedValue, error: '' }
      : { data: fallbackValue, error: `${dataName} 저장값의 형식이 올바르지 않습니다.` }
  } catch {
    return { data: fallbackValue, error: `${dataName} 저장값을 불러오지 못했습니다.` }
  }
}

function saveObject(storageKey, value, isValidValue, dataName) {
  const storage = getBrowserStorage()
  if (!isValidValue(value)) return { success: false, error: `${dataName} 데이터가 올바르지 않습니다.` }
  if (!storage) return { success: false, error: '현재 환경에서는 브라우저 저장소를 사용할 수 없습니다.' }

  try {
    storage.setItem(storageKey, JSON.stringify(value))
    return { success: true, error: '' }
  } catch {
    return { success: false, error: `${dataName} 데이터를 저장하지 못했습니다.` }
  }
}

function isValidProfile(profile) {
  return Boolean(profile && typeof profile.name === 'string' && typeof profile.phone === 'string' && typeof profile.address === 'string')
}

function loadProfile() {
  return loadObject(PROFILE_STORAGE_KEY, EMPTY_PROFILE, isValidProfile, '개인정보')
}

function saveProfile(profile) {
  return saveObject(PROFILE_STORAGE_KEY, profile, isValidProfile, '개인정보')
}

function loadPaymentMethod() {
  return loadObject(PAYMENT_STORAGE_KEY, 'onsite', (value) => PAYMENT_METHOD_IDS.includes(value), '결제수단')
}

function savePaymentMethod(paymentMethod) {
  return saveObject(PAYMENT_STORAGE_KEY, paymentMethod, (value) => PAYMENT_METHOD_IDS.includes(value), '결제수단')
}

function loadOrderChannel() {
  return loadObject(ORDER_CHANNEL_STORAGE_KEY, 'delivery', (value) => ['delivery', 'store'].includes(value), '주문 방식')
}

function saveOrderChannel(orderChannel) {
  return saveObject(ORDER_CHANNEL_STORAGE_KEY, orderChannel, (value) => ['delivery', 'store'].includes(value), '주문 방식')
}

function isValidBranch(branch) {
  return branch === null || Boolean(branch && typeof branch.id === 'string' && typeof branch.name === 'string' && typeof branch.address === 'string' && Number.isFinite(branch.distance) && typeof branch.isOpen === 'boolean')
}

function loadBranch() {
  return loadObject(BRANCH_STORAGE_KEY, null, isValidBranch, '선택 지점')
}

function saveBranch(branch) {
  return saveObject(BRANCH_STORAGE_KEY, branch, isValidBranch, '선택 지점')
}

export {
  CART_STORAGE_KEY,
  BRANCH_STORAGE_KEY,
  ORDER_CHANNEL_STORAGE_KEY,
  PAYMENT_STORAGE_KEY,
  PROFILE_STORAGE_KEY,
  ORDERS_STORAGE_KEY,
  findOrder,
  loadCart,
  loadBranch,
  loadOrderChannel,
  loadOrders,
  loadPaymentMethod,
  loadProfile,
  saveCart,
  saveBranch,
  saveOrderChannel,
  saveOrders,
  savePaymentMethod,
  saveProfile,
}
