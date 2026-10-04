import { MAX_QUANTITY, MIN_QUANTITY } from '../constants/shopRules.js'

function isNonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0
}

function hasUniqueIds(items) {
  return new Set(items.map((item) => item.id)).size === items.length
}

function validateMenuCatalog(categories, menus) {
  const errors = []
  const categoryIds = new Set(categories.map((category) => category.id))
  const subCategoryIdsByCategory = new Map(categories.map((category) => [
    category.id,
    new Set((category.subCategories || []).map((subCategory) => subCategory.id)),
  ]))
  if (!hasUniqueIds(categories)) errors.push('카테고리 ID가 중복되었습니다.')
  if (!hasUniqueIds(menus)) errors.push('메뉴 ID가 중복되었습니다.')

  menus.forEach((menu) => {
    const prefix = `[${menu.id || 'ID 없음'}]`
    if (!menu.id || !menu.name) errors.push(`${prefix} ID와 메뉴명은 필수입니다.`)
    if (typeof menu.nameEn !== 'string' || typeof menu.kcal !== 'string') errors.push(`${prefix} 영문명과 kcal은 문자열이어야 합니다.`)
    if (!categoryIds.has(menu.categoryId)) errors.push(`${prefix} 존재하지 않는 카테고리를 참조합니다.`)
    const knownSubCategories = subCategoryIdsByCategory.get(menu.categoryId)
    if (menu.subCategoryId && knownSubCategories?.size > 0 && !knownSubCategories.has(menu.subCategoryId)) errors.push(`${prefix} 존재하지 않는 세부 카테고리를 참조합니다.`)
    ;['delivery', 'store'].forEach((channel) => {
      if (typeof menu.priceConfirmed?.[channel] !== 'boolean') errors.push(`${prefix} ${channel} 가격 확인 여부가 올바르지 않습니다.`)
      if (menu.priceConfirmed?.[channel] && !isNonNegativeInteger(menu.prices?.[channel])) errors.push(`${prefix} 확인된 ${channel} 가격은 0 이상의 정수여야 합니다.`)
      if (!menu.priceConfirmed?.[channel] && menu.prices?.[channel] !== null) errors.push(`${prefix} 미확정 ${channel} 가격은 null이어야 합니다.`)
      if (![true, false, null].includes(menu.availability?.[channel])) errors.push(`${prefix} ${channel} 주문 가능 여부가 올바르지 않습니다.`)
    })
    if (menu.canMakeSet && Object.values(menu.priceConfirmed || {}).some(Boolean) && !isNonNegativeInteger(menu.setBaseExtraPrice)) errors.push(`${prefix} 확인된 세트 추가 가격은 0 이상의 정수여야 합니다.`)
    if (menu.canMakeSet) {
      ;['delivery', 'store'].forEach((channel) => {
        if (!isNonNegativeInteger(menu.setPrices?.[channel])) errors.push(`${prefix} ${channel} 세트 가격은 0 이상의 정수여야 합니다.`)
        if (!isNonNegativeInteger(menu.largeSetExtras?.[channel])) errors.push(`${prefix} ${channel} 라지세트 추가 금액은 0 이상의 정수여야 합니다.`)
      })
    }
    if (typeof menu.isNew !== 'boolean') errors.push(`${prefix} isNew는 boolean이어야 합니다.`)
    if (menu.canMakeSet && (!menu.setSizes.length || !menu.sides.length || !menu.drinks.length)) errors.push(`${prefix} 세트 상품의 필수 옵션이 없습니다.`)
    ;[menu.setSizes, menu.sides, menu.sizes].forEach((items) => {
      if (!hasUniqueIds(items)) errors.push(`${prefix} 옵션 ID가 중복되었습니다.`)
      if (items.some((item) => !isNonNegativeInteger(item.extraPrice))) errors.push(`${prefix} 옵션 추가 금액은 0 이상의 정수여야 합니다.`)
    })
    if (!hasUniqueIds(menu.drinks)) errors.push(`${prefix} 음료 옵션 ID가 중복되었습니다.`)
    if (!hasUniqueIds(menu.ingredients)) errors.push(`${prefix} 재료 ID가 중복되었습니다.`)
    menu.ingredients.forEach((ingredient) => {
      if (!ingredient.choices.some((choice) => choice.id === ingredient.defaultChoiceId)) errors.push(`${prefix} ${ingredient.name}의 기본 선택값이 없습니다.`)
    })
  })
  return errors
}

function isValidCartItem(item) {
  return Boolean(item && typeof item.cartItemId === 'string' && typeof item.menuId === 'string' && typeof item.name === 'string' && ['delivery', 'store'].includes(item.channel) && Number.isInteger(item.quantity) && item.quantity >= MIN_QUANTITY && item.quantity <= MAX_QUANTITY && isNonNegativeInteger(item.unitPrice))
}

function isValidOrder(order) {
  const isDisposableValueValid = order?.disposableNeeded === undefined || (order?.serviceType === 'dineIn' ? order.disposableNeeded === null : typeof order.disposableNeeded === 'boolean')
  return Boolean(order && typeof order.orderId === 'string' && typeof order.createdAt === 'string' && ['delivery', 'store'].includes(order.channel) && ['delivery', 'takeout', 'dineIn'].includes(order.serviceType) && isDisposableValueValid && Array.isArray(order.items) && order.items.every(isValidCartItem) && isNonNegativeInteger(order.totalPrice))
}

export { isValidCartItem, isValidOrder, validateMenuCatalog }
