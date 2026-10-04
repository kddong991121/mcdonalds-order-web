/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useMemo, useRef, useState } from 'react'
import {
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
} from '../storage/storeStorage.js'
import { repriceCartItems } from '../utils/order.js'

const StoreContext = createContext(null)

function StoreProvider({ children }) {
  const [initialCart] = useState(loadCart)
  const [initialOrders] = useState(loadOrders)
  const [initialProfile] = useState(loadProfile)
  const [initialPaymentMethod] = useState(loadPaymentMethod)
  const [initialOrderChannel] = useState(loadOrderChannel)
  const [initialBranch] = useState(loadBranch)
  const [cartItems, setCartItems] = useState(initialCart.data)
  const [orders, setOrders] = useState(initialOrders.data)
  const [profile, setProfile] = useState(initialProfile.data)
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod.data)
  const [selectedOrderChannel, setSelectedOrderChannel] = useState(initialOrderChannel.data)
  const [selectedBranch, setSelectedBranch] = useState(initialBranch.data)
  const [storageError, setStorageError] = useState(
    initialCart.error || initialOrders.error || initialProfile.error || initialPaymentMethod.error || initialOrderChannel.error || initialBranch.error,
  )
  const cartItemsRef = useRef(initialCart.data)
  const ordersRef = useRef(initialOrders.data)

  const updateCartItems = useCallback((nextValue) => {
    const nextCartItems =
      typeof nextValue === 'function'
        ? nextValue(cartItemsRef.current)
        : nextValue

    if (!Array.isArray(nextCartItems)) {
      setStorageError('장바구니 데이터는 배열이어야 합니다.')
      return false
    }

    cartItemsRef.current = nextCartItems
    setCartItems(nextCartItems)

    const result = saveCart(nextCartItems)
    setStorageError(result.error)
    return result.success
  }, [])

  const updateOrders = useCallback((nextValue) => {
    const nextOrders =
      typeof nextValue === 'function' ? nextValue(ordersRef.current) : nextValue

    if (!Array.isArray(nextOrders)) {
      setStorageError('주문 내역 데이터는 배열이어야 합니다.')
      return false
    }

    ordersRef.current = nextOrders
    setOrders(nextOrders)

    const result = saveOrders(nextOrders)
    setStorageError(result.error)
    return result.success
  }, [])

  const clearStorageError = useCallback(() => {
    setStorageError('')
  }, [])

  const updateProfile = useCallback((nextProfile) => {
    const result = saveProfile(nextProfile)
    if (result.success) setProfile(nextProfile)
    setStorageError(result.error)
    return result.success
  }, [])

  const updatePaymentMethod = useCallback((nextPaymentMethod) => {
    const result = savePaymentMethod(nextPaymentMethod)
    if (result.success) setPaymentMethod(nextPaymentMethod)
    setStorageError(result.error)
    return result.success
  }, [])

  const changeOrderChannel = useCallback((nextChannel) => {
    if (!['delivery', 'store'].includes(nextChannel)) return { success: false, unavailableItems: [] }
    const { repricedItems, unavailableItems } = repriceCartItems(cartItemsRef.current, nextChannel)
    const channelResult = saveOrderChannel(nextChannel)
    if (!channelResult.success) {
      setStorageError(channelResult.error)
      return { success: false, unavailableItems }
    }
    setSelectedOrderChannel(nextChannel)
    if (unavailableItems.length === 0) updateCartItems(repricedItems)
    return { success: true, unavailableItems, repricedItems }
  }, [updateCartItems])

  const confirmOrderChannelChange = useCallback((nextChannel, repricedItems) => {
    const result = saveOrderChannel(nextChannel)
    if (!result.success) { setStorageError(result.error); return false }
    setSelectedOrderChannel(nextChannel)
    return updateCartItems(repricedItems)
  }, [updateCartItems])

  const updateSelectedBranch = useCallback((branch) => {
    const result = saveBranch(branch)
    if (result.success) setSelectedBranch(branch)
    setStorageError(result.error)
    return result.success
  }, [])

  const cartItemCount = cartItems.reduce(
    (total, item) => total + (Number.isInteger(item.quantity) ? item.quantity : 0),
    0,
  )

  const storeValue = useMemo(
    () => ({
      cartItems,
      orders,
      profile,
      paymentMethod,
      selectedOrderChannel,
      selectedBranch,
      cartItemCount,
      storageError,
      updateCartItems,
      updateOrders,
      updatePaymentMethod,
      updateProfile,
      changeOrderChannel,
      confirmOrderChannelChange,
      updateSelectedBranch,
      clearStorageError,
    }),
    [
      cartItems,
      orders,
      profile,
      paymentMethod,
      selectedOrderChannel,
      selectedBranch,
      cartItemCount,
      storageError,
      updateCartItems,
      updateOrders,
      updatePaymentMethod,
      updateProfile,
      changeOrderChannel,
      confirmOrderChannelChange,
      updateSelectedBranch,
      clearStorageError,
    ],
  )

  return (
    <StoreContext.Provider value={storeValue}>{children}</StoreContext.Provider>
  )
}

export { StoreContext, StoreProvider }
