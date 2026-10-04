const MIN_QUANTITY = 1
const MAX_QUANTITY = 10

const ORDER_CHANNEL_LABELS = {
  delivery: '배달',
  store: '포장&매장',
}

const SERVICE_TYPE_LABELS = {
  delivery: '배달',
  takeout: '포장',
  dineIn: '매장',
}

const DELIVERY_POLICY = {
  minimumOrderAmount: 8000,
  deliveryFee: 3000,
  freeDeliveryThreshold: 14000,
}

export { DELIVERY_POLICY, MAX_QUANTITY, MIN_QUANTITY, ORDER_CHANNEL_LABELS, SERVICE_TYPE_LABELS }
