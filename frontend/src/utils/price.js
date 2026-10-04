function formatPrice(price) {
  if (!Number.isFinite(price)) return '가격 확인 필요'
  return `${price.toLocaleString('ko-KR')}원`
}

function getMenuPrice(menu, orderChannel) {
  const price = menu?.prices?.[orderChannel]
  return Number.isFinite(price) ? price : null
}

function getMenuSetPrice(menu, orderChannel) {
  const price = menu?.setPrices?.[orderChannel]
  return Number.isFinite(price) ? price : null
}

function getDrinkPrice(drink, orderChannel = 'delivery', sizeId = 'M') {
  const basePrice = getMenuPrice(drink, orderChannel)
  if (!Number.isFinite(basePrice)) return null
  const sizeExtraPrice = drink?.sizes?.find((size) => size.id === sizeId)?.extraPrice || 0
  return basePrice + sizeExtraPrice
}

function getSetDrinkSizeId(drink, setSizeId = 'regular') {
  const supportsMedium = drink?.sizes?.some((size) => size.id === 'M')
  const supportsLarge = drink?.sizes?.some((size) => size.id === 'L')
  if (setSizeId === 'large' && supportsLarge) return 'L'
  if (supportsMedium) return 'M'
  return drink?.sizes?.[0]?.id || 'single'
}

function getCokeBasePrice(drinks, orderChannel = 'delivery', setSizeId = 'regular') {
  const coke = drinks?.find((drink) => drink.id === 'V004')
    || drinks?.find((drink) => drink.name === '코카-콜라')
  if (!coke) return null
  return getDrinkPrice(coke, orderChannel, getSetDrinkSizeId(coke, setSizeId))
}

function getSetDrinkExtraPrice(drink, drinks, orderChannel = 'delivery', setSizeId = 'regular') {
  const selectedPrice = getDrinkPrice(drink, orderChannel, getSetDrinkSizeId(drink, setSizeId))
  const cokeBasePrice = getCokeBasePrice(drinks, orderChannel, setSizeId)
  if (!Number.isFinite(selectedPrice) || !Number.isFinite(cokeBasePrice)) return 0
  return Math.max(selectedPrice - cokeBasePrice, 0)
}

function getSetDrinkOptions(drinks = [], orderChannel = 'delivery', setSizeId = 'regular') {
  return drinks
    .filter((drink) => drink.categoryId === 'mccafe-drink'
      && drink.availability?.[orderChannel] === true
      && drink.priceConfirmed?.[orderChannel] === true
      && Number.isFinite(getMenuPrice(drink, orderChannel)))
    .map((drink) => {
      const selectedSizeId = getSetDrinkSizeId(drink, setSizeId)
      const hasMultipleSizes = drink.sizes?.length > 1
      return {
        ...drink,
        name: `${drink.name}${hasMultipleSizes ? ` · ${selectedSizeId}` : ''}`,
        extraPrice: getSetDrinkExtraPrice(drink, drinks, orderChannel, setSizeId),
      }
    })
}

function getMenuCardCommerceInfo(menu, orderChannel = 'delivery') {
  const channelName = orderChannel === 'delivery' ? '배달' : '매장'
  const isAvailable = menu?.availability?.[orderChannel] === true
  const isUnavailable = menu?.availability?.[orderChannel] === false
  const channelPrice = getMenuPrice(menu, orderChannel)
  const hasChannelPrice = menu?.priceConfirmed?.[orderChannel] === true && Number.isFinite(channelPrice)

  if (isAvailable && hasChannelPrice) {
    return {
      priceLabel: `${channelName}가 ${formatPrice(channelPrice)}`,
      statusLabel: orderChannel === 'delivery' ? '배달 주문 가능' : '매장/포장 주문 가능',
      status: 'available',
      helperText: '',
    }
  }

  if (isUnavailable) {
    const fallbackChannel = orderChannel === 'delivery' ? 'store' : 'delivery'
    const fallbackPrice = getMenuPrice(menu, fallbackChannel)
    const hasFallbackPrice = menu?.priceConfirmed?.[fallbackChannel] === true && Number.isFinite(fallbackPrice)
    return {
      priceLabel: hasFallbackPrice
        ? `${fallbackChannel === 'delivery' ? '배달' : '매장'}가 ${formatPrice(fallbackPrice)}`
        : '가격 확인 필요',
      statusLabel: orderChannel === 'delivery' ? '배달 주문 불가' : '매장/포장 주문 불가',
      status: 'unavailable',
      helperText: orderChannel === 'delivery' && menu?.availability?.store === true
        ? '매장/포장 주문만 가능합니다.'
        : '',
    }
  }

  return {
    priceLabel: hasChannelPrice ? `${channelName}가 ${formatPrice(channelPrice)}` : '가격 확인 필요',
    statusLabel: '주문 가능 여부 확인 필요',
    status: 'unknown',
    helperText: '',
  }
}

export { formatPrice, getCokeBasePrice, getDrinkPrice, getMenuCardCommerceInfo, getMenuPrice, getMenuSetPrice, getSetDrinkExtraPrice, getSetDrinkOptions, getSetDrinkSizeId }
